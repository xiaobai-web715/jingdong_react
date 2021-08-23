import React , {useEffect , useState} from 'react'
import {findDOMNode} from 'react-dom'
import {getGoodsSwiper , getGoodsAttr , getGoodsReviews} from '../../../assets/js/libs/request.js'
import { localParam , setScrollTop  , lazyImg} from '../../../assets/js/utils/utils.js'
import Swiper from '../../../assets/js/libs/swiper.min.js'
import config from '../../../assets/js/conf/config.js'
import TweenMax from '../../../assets/js/libs/TweenMax.js'
import {Toast} from 'antd-mobile'
import _ from 'lodash'
import '../../../assets/css/common/goods/details_item.css'
const DetailsItem = (props) => {
    let swiperTarget = null,
        mask2 = null,
        targetImg = null,
        targetGoodsInfo = null,
        targetCartPanel = null,
        bChoose = false,
        targetPag = null;
    //不需要双向绑定的变量可以不用useState来创建,因为这个变量改变并不会立马刷新组件(通俗一点就是我的这个变量是在点击事件这样的函数里面执行的)
    const [gid , setGid] = useState('');
    const [bMask , setBMask] = useState(false);
    const [sCartPanel , setSCartPanel] = useState('down');
    //添加一个状态用来存储获取的后台分类数据
    const [aAttr , setAAttr] = useState([])
    //添加一个状态用来存储评论数据
    const [aReviews , setAReviews] = useState([])
    //添加一个状态用来保存评论总数
    const [iReviewsTotal , setIReviewsTotal] = useState(0);
    //定义保存轮播图数据的状态
    const [aSlide , setASlide] = useState([]);
    //定义title状态
    const [sGoodsTitle , setSGoodsTitle] = useState('');
    //定义价格状态
    const [fPrice , setFPrice] = useState(0);
    //运费状态
    const [fFreight , setFFreight] = useState(0);
    //销量状态
    const [iSales , setISales] = useState(0);
    //将请求的url封装起来
    const targetUrl = (gid) => {
        let url = config.baseUrl + '/api/home/goods/info?gid='+gid+'&type=details&token=' + config.token;
        return url;
    }
    useEffect(() => {
        // 解决单页面应用连续两个页面都有滚动条而导致的滚动条定位问题
        // console.log('我是路由跳转document.documentElement.scrollTop' , document.documentElement.scrollTop)
        // console.log('我是路由跳转document.body.scrollTop' , document.body.scrollTop)
        setScrollTop(0);
    },[])
    //获取轮播图数据和商品信息数据
    useEffect(() => {
        let isUnmounted = false;
        let url = targetUrl(gid);
        const getSwiperDatas = async() => {
            try{
                const res = await getGoodsSwiper(url);
                if(res.code === 200 && !isUnmounted){
                    // console.log('res' , res)
                    setASlide(_.get(res , ['data' , 'images'] , []));
                    setSGoodsTitle(_.get(res , ['data' , 'title'] , []));
                    setFPrice(_.get(res , ['data' , 'price'] , []));
                    setFFreight(_.get(res , ['data' , 'freight'] , []));
                    setISales(_.get(res , ['data' , 'sales'] , []));
                }
            }catch(err){
                console.log('请求轮播图数据出错' , err)
            }
        }
        getSwiperDatas();
        return () => {
            isUnmounted = true;
        }
    } , [gid])
    //获取商品规格属性
    useEffect(()=>{
        let isUnmounted = false,
            url = config.baseUrl + '/api/home/goods/info?gid='+gid+'&type=spec&token=' + config.token;
        const getAttrDatas = async() => {
            try{
                const res = await getGoodsAttr(url);
                if(res.code === 200 && !isUnmounted){
                    setAAttr(_.get(res , ['data'] , []));
                }
            }catch(err){
                console.log('请求商品规格属性数据出错' , err)
            }
        }
        getAttrDatas();
        return ()=>{
            isUnmounted =true;
        }
    },[gid])
    //获取商品评价数据
    useEffect(() => {
        let isUnmounted = false,
            url = config.baseUrl + '/api/home/reviews/index?gid=' + gid + '&token=' + config.token + '&page=1';
        const getReviewsDatas = async() => {
            try{
                const res = await getGoodsReviews(url);
                if(res.code === 200 && !isUnmounted){
                    setAReviews(_.get(res , ['data'] , []));
                    setIReviewsTotal(_.get(res , ['pageinfo','total'] , 0));
                }
            }catch(err){
                console.log('请求商品规格属性数据出错' , err)
            }
        }
        getReviewsDatas();
        return() => {
            isUnmounted = true;
        }
    } , [gid])
    //实现商品评价数据的图片懒加载
    useEffect(() => {
        lazyImg();
    },[aReviews])
    //定义一个状态来存储加入购物车中的数量
    const [iAmount , setIAmount] = useState(1);
    useEffect(() => {
        let isUnmounted = false;
        // console.log('props' , props)
        if(props.location.search !== ''){
            let targetGId = localParam(props.location.search);
            if(!isUnmounted){
                setGid(_.get(targetGId , ['search' , 'gid'] , ''));
            }
        }
        //这个会在组件销毁的时候去执行里面的操作
        return () => {
            isUnmounted = true;
        }
    },[])// eslint-disable-line react-hooks/exhaustive-deps
    //轮播图效果,受aSlide状态的影响
    useEffect(() => {
        new Swiper(swiperTarget , {
            autoplay : 3000,
            pagination : targetPag,
            autoplayDisableOnInteraction : false,
        });
    } , [aSlide])// eslint-disable-line react-hooks/exhaustive-deps
    //显示购物控制面板
    const showCartPanel = () =>{
        setBMask(true);
        setSCartPanel('up');
        mask2.addEventListener('touchmove' , function(e){
            e.preventDefault();
        } , false)
    }
    //隐藏购物控制面板
    const hideCartPanel = () =>{
        if(!bChoose){
            setBMask(false);
            setSCartPanel('down');
        }
    }
    //加入收藏
    const addFav = () =>{
        Toast.info('收藏成功' , 2)
    }
    //点击获取更多评论跳转到评论界面
    const replacePage = (url) => {
        props.history.replace(config.path + url)
    }
    //点击将选择相应的选项,改变选项的样式
    // 要修改正确的样式一共有两层索引父层索引颜色还是尺码,内层索引,颜色的种类和尺码的种类
    const selectAttrVal = (attrIndex , valIndex) => {
        let copyAAttr = aAttr;
        for(let key in copyAAttr[attrIndex].values){
            copyAAttr[attrIndex].values[key].checked = false;
        }
        copyAAttr[attrIndex].values[valIndex].checked = true;
        setAAttr([...copyAAttr]);
    }
    //点击+增加数量
    const incAmount = () =>{
        let copyIAmount = iAmount;
        copyIAmount += 1;
        setIAmount(copyIAmount);
    }
    //点击-减少数量
    const decAmount = () => {
        let copyIAmount = iAmount;
        if(copyIAmount > 1){
            copyIAmount -= 1;
        }
        setIAmount(copyIAmount);
    }
    //检测是否选中属性值
    const checkAttrVal = (callback) => {
        let copyAAttr = aAttr,
            copyAAttrLen = copyAAttr.length,
            title = '';
        for(let i = 0 ; i < copyAAttrLen ; i++){
            let target = copyAAttr[i].values;
            //检测数组里面的每一项item中的checked值是不是都是false;如果都是false就执行提示功能,并且不会触发css动画旋转加入购物车的效果,并且直接return跳出
            if(target.every(item => _.get(item , 'checked') === false)){
                bChoose = true;
                title = copyAAttr[i].title;
                break;
            }
        }
        //这里是若bChoose是true则说明是有没有选中的属性,然后我们就给它显示一个Toast
        if(bChoose){
            Toast.info('请选择'+ title , 1);
            //这里显示之后给它变成false就是为了还能够去触发关闭筛选面板的功能
            bChoose = false;
        }else{
            //这里也就是都选中之后才会执行的,应该执行的就是我们的css动画效果,所以这里写入一个回调函数是最好的
            callback();
        }
    }
    //加入购物车
    const addCart = () =>{
        //触发动画效果前先进行属性是否都选中的判断
        checkAttrVal(() => {
            if(!bChoose){
                //这里修改成true(动画完成之前)禁止再次点击确定触发动画效果
                bChoose = true;
                let copyTargetImg = targetImg,
                copyTargetGoodsInfo = targetGoodsInfo,
                copyTargetCartPanel = targetCartPanel;
                //cloneNode(true)拷贝节点里面的内容
                let oCloneImg = copyTargetImg.cloneNode(true);
                //将拷贝出来的节点加入到父节点里面作为子节点(定位用绝对定位和相对定位这样复制的部分就会和原来的部分重叠,这样用TweenMax就不会导致原来的节点消失)(不过前面使得是flex弹性盒模型布局,这里就直接给拷贝的节点加样式了)
                //cssText说是可以给性能做优化
                oCloneImg.style.cssText = 'width:0.8rem;height:0.8rem;position:absolute;z-index:1;left:0.4rem;top:0.4rem;'
                copyTargetGoodsInfo.appendChild(oCloneImg);
                // console.log('oCloneImg' , oCloneImg)
                //接下来就要获取出发地和目的地的坐标轴了
                //出发地的坐标点
                // console.log('copyTargetImg' , copyTargetImg)
                let srcImgX = copyTargetImg.offsetLeft;
                //目前还不知道到如何通过Route组件进行传值(目前还是暂时用的document加findDOMNode获取虚拟DOM)
                let targetDOM = findDOMNode(document.getElementById('cart-icon'));
                //获取要移动的y距离
                //1首先获取整个页面的y
                let windowY = window.innerHeight;
                //2获取cart-panel这个DOM元素的高
                let cartPanelY = copyTargetCartPanel.offsetHeight;
                //3获取图片距离父DOM元素的高
                let srcImgY = copyTargetImg.offsetTop;
                // console.log('windowY' , windowY)
                // console.log('cartPanelY' , cartPanelY)
                // console.log('srcImgY' , srcImgY)
                //4所以咱们的目标值就是
                let cloneY = parseInt(windowY - cartPanelY + srcImgY - targetDOM.offsetTop);
                // onComplete是到达目的地之后也就是动画完成之后所触发的事件
                TweenMax.to(oCloneImg , 2 , {bezier : [{x:srcImgX , y:-100} ,{x:srcImgX+30 , y:-130}, {x : targetDOM.offsetLeft , y:-cloneY}] , onComplete : () => {
                    //动画完成之后知直接销毁这个拷贝的元素,并且bChoose = true实现可以点击触发动画效果
                    oCloneImg.remove();
                    bChoose = false;
                }});
                //这里还是使用的TweenMax来做的动画特效
                TweenMax.to(oCloneImg , 0.2 , {rotation : 360 , repeat: -1});  
            }
        }) 
    }
    return (
        <div>
            <div className='swiper-wrap2' ref={div => swiperTarget = div}>
                {/* 使用swiper要出现分页点的话这里必须叫swiper-wrapper */}
                <div className='swiper-wrapper'>
                        {
                            aSlide.length > 0 ?
                            aSlide.map((item , index) => {
                                return(
                                    /* 使用swiper要出现分页点的话这里必须叫swiper-slide */
                                    <div className='swiper-slide'  key={index}>
                                        <img src={require('../../../assets/images/common/lazyImg.jpg').default} alt='' data-echo={item}></img>
                                    </div>
                                )
                            }):''
                        }
                </div>
                {/* 使用swiper要出现分页点的话这里必须叫swiper-pagination */}
                <div className='swiper-pagination' ref={div => targetPag = div}></div>
            </div>
            <div className='goods-ele-main'>
                <div className='goods-ele-title'>{sGoodsTitle}</div>
                <div className='goods-ele-price'>￥{fPrice}</div>
                <ul className='goods-ele-sales-wrap'>
                    <li>快递: {fFreight}元</li>
                    <li>月销量{iSales}件</li>
                </ul>
            </div>
            <div className='reviews-main2'>
                <div className='reviews-title2'>商品评价({iReviewsTotal})</div>
                <div className='reviews-wrap2'>
                    {
                        aReviews.length > 0?
                        aReviews.map((item , index) => {
                            return(
                                <div className='reviews-list' key={index}>
                                    <div className='uinfo'>
                                        <div className='head'><img src={require('../../../assets/images/common/lazyImg.jpg').default} alt={item.nickname} data-echo={item.head}></img></div>
                                        <div className='nickname'>{item.nickname}</div>
                                    </div>
                                    <div className='reviews-content'>{item.content}</div>
                                    <div className='reviews-date'>{item.times}</div>
                                </div>
                            )
                        }):<div className='null-item'>没有相关评价</div>
                    }
                </div>
                <div className={aReviews.length>0?'reviews-more':'reviews-more hide'} onClick={replacePage.bind(null , 'goods/details/reviews?gid=' + gid)}>更多评价</div>
            </div>
            <div className='bottom-btn-wrap'>
                <div className='btn fav' onClick={addFav.bind(null)}>收藏</div>
                <div className='btn cart'  onClick={showCartPanel.bind(null)}>加入购物车</div>
            </div>
            {/* 点击加入购物车产生的背景 */}
            <div className={bMask? 'mask2':'mask2 hide'} ref={div => mask2 = div}></div>
            {/* 控制面板 */}
            <div className={'cart-panel ' + sCartPanel} ref={div => targetCartPanel = div}>
                <div className='goods-info' ref={div => targetGoodsInfo = div}>
                    {/* 一个小心开关的定位 */}
                    <div className='close-panel-wrap'>
                        <div className='spot'></div>
                        <div className='line'></div>
                        <div className='close' onClick={hideCartPanel.bind(null)}></div>
                    </div>
                    <div ref={div => targetImg = div} className='goods-img'><img src={aSlide.lenght!==0?aSlide[0]:''} alt=''></img></div>
                    <div className='goods-wrap2'>
                        <div className='goods-wrap2-title'>{sGoodsTitle}</div>
                        <div className='price'>￥{fPrice}</div>
                        <div className='goods-code'>商品编码:{gid}</div>
                    </div>
                </div>
                <div className='attr-wrap2'>
                    {
                        aAttr.length > 0 ? 
                        aAttr.map((item , index1) => {
                            return(
                                <div className='attr-list' key={index1}>
                                    <div className='attr-name'>{item.title}</div>
                                    <div className='val-wrap'>
                                    {
                                        item.values.length > 0 ?
                                        item.values.map((item , index2)=> {
                                            return(
                                                <div className={item.checked?'val active':'val'} key={index2} onClick={selectAttrVal.bind(null ,index1 , index2)}>{item.value}</div>
                                            )
                                        }):''
                                    }
                                    </div>
                                </div>  
                            )
                        }):''
                    }
                </div>
                <div className='amount-wrap'>
                    <div className='amount-name'>购买数量</div>
                    <div className='amount-input-wrap'>
                        <div className={iAmount > 1 ? 'dec' : 'dec active'} onClick={decAmount.bind(null)}>-</div>
                        <div className='amount-input'><input type='tel' value={iAmount} onChange={e => setIAmount(e.target.value.replace(/[a-zA-Z]|[\u4e00-\u9fa5]|[#|*|,|+|;|.]/g , ''))}></input></div>
                        <div className='inc' onClick={incAmount.bind(null)}>+</div>
                    </div>
                </div>
                <div className='sure-btn' onClick={addCart.bind(null)}>确定</div>
            </div>
        </div>
    )
}

export default DetailsItem
