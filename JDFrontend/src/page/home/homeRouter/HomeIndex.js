import React , {useEffect , useState}from 'react'
import {useSelector} from 'react-redux'
import _ from 'lodash'
//请求数据的方法
import {getSwiper , getNav , getGoodsLevel , getReco} from '../../../assets/js/libs/request'
//图片懒加载的方法
import { lazyImg , setScrollTop} from '../../../assets/js/utils/utils'
//config配置文件
import config from '../../../assets/js/conf/config'
import GOODS_TYPE from './mold.js'
import '../../../assets/css/common/home/home.css'

//这里用到的是swiper组件,究竟推不推荐企业级开发使用，之后再说
import '../../../assets/css/common/swiper/swiper.min.css'
import Swiper from '../../../assets/js/libs/swiper.min.js'

//搜索组件
import Search from '../../../components/search/search'

const HomeIndex = (props) => {
    const {isLogin} = useSelector(state => state.loginRedux)
    const[dataSwiper ,  setDataSwiper] = useState([]);
    const[dataNav ,  setDataNav] = useState([]);
    const[dataGoodsLevel , setDataGoodsLevel] = useState([]);
    const[dataReco , setDataReco] = useState([]);
    //这里设置一个状态用来触发顶部搜索在特定事件变红
    const[scrollBar , setScrollBar] = useState(false);
    // console.log('scrollBar' , scrollBar)
    // console.log('1')

    //添加一个点击改变搜索组件是否显示的状态
    const[pageStyle , setPageStyle] = useState('none');

    let swiperTarget = null ;
    useEffect(() =>{
        //这里就是挂载的时候触发这个解决单页面切换的滚动轴定位问题的函数,把值传进去
        // console.log('我是这个' , global.scrollTop.index)
        setScrollTop(global.scrollTop.index);
    } , [])
    //监听滚动条滚动事件
    useEffect(() => {
        let isUnmounted = false;
        let iScorllTop = 0;
        const eventScorll = () =>{
            // console.log('isUnmounted' , isUnmounted)
            //这里有个严重的问题目   前还不清楚到底是啥原因,不过在点击路由跳转的时候还是会触发一遍这个监听函数,然后导致执行获取到的iScorllTop是跳转的路由界面的值
            if(!isUnmounted){
                // console.log('document.documentElement.scrollTop' , document.documentElement.scrollTop)
                // console.log('document.body.scrollTop' , document.body.scrollTop)
                iScorllTop = document.documentElement.scrollTop || document.body.scrollTop;
                //获取导航的当前位置赋予到全局global的scrollTop的index里面     
                // console.log('iScorllTop' , iScorllTop)
                iScorllTop >= 80 ? setScrollBar(true):setScrollBar(false);
            }
            global.scrollTop.index = iScorllTop;
        }
        //这里在render加载完成后执行一次,给window挂上一个事件监听函数,这样就可以在滚动条改变位置时触发上面的函数了
        window.addEventListener('scroll' , eventScorll , false);
        //!!!如何在卸载的时候取消掉事件监听函数,这里在useEffect中也有解决方式,就是返回一个函数,当useEffect返回的是一个函数的时候,React将会在执行清除操作时调用它
        return()=>{
            isUnmounted = true;
            //什么时候卸载的可以打印一下用锚点去操作)
            window.removeEventListener('scroll' , eventScorll , false)
        }
    },[])
    // 获取接口数据
    useEffect(()=>{
        let isUnmounted = false;
        // 这里可以试着打印一下，输出的结果是1,4,3(2bu执行的原因是状态改变了);然后状态改变1,4,3,2,因为await会使得后面的执行必须等待前一个await执行完成才可以(所以最好加try-catch)
        const fetchData = async  () =>{
            // console.log('config' , config)
            try{
                // //!!!像这样直接fetch(url)的形式维护起来非常的麻烦,所以我们可以对齐进行封装,这样修改的时候统一去封装的地方修改(比如接口修改了,方法使用axios了之类的)
                // await fetch("http://vueshop.glbuys.com/api/home/index/slide?token=1ec949a15fb709370f").then(res => {
                // console.log('我不是json数据' , res);
                // // 这里要注意,我们需要的是json数据,千万要打印一下看看是不是自己要的数据
                // return res.json();
                // // 这里将数据转换成json数据,然后返回,作为下一个then函数的传入参数
                // }).then(res => {
                //     console.log('我是json数据' , res);
                //     // 这样才可以使用钩子函数将想要的数据保存在状态里面
                //     if(res.code === 200){
                //         setDataSwiper(_.get(res , ['data'] , []))
                //     }
                //     //用到的是lodash里面的get方法，返回一个对象里面指定路径的数据
                // });

                // //企业级开发也不是这样写url的,也是在组件里面写好使用的(然后传入指定参数)
                // const res = await requestHDP("http://vueshop.glbuys.com/api/home/index/slide?token=1ec949a15fb709370f");
                // if(res.code === 200){
                //     setDataSwiper(_.get(res , ['data'] , []))
                // }

                //封装http://vueshop.glbuys.com地址(正式地址和测试地址),在这里做一个代理
                //为什么要做代理(目的是防止跨域问题的出现)
                const res = await getSwiper(config.baseUrl + "/api/home/index/slide?token=" + config.token);
                if(res.code === 200 && !isUnmounted){
                    setDataSwiper(_.get(res , ['data'] , []))
                }
            }catch(err){
                console.log('请求轮播图数据出错' , err);
            }
            // console.log('2');
        }
        fetchData();
        return () => {
            isUnmounted = true;
        }
    },[])
    // 目前的理解,useEffect是在dom树加载完成之后，才会去执行
    useEffect(()=>{
        new Swiper(swiperTarget , {
            autoplay : 5000,
            pagination : '.swiper-pagination',
            autoplayDisableOnInteraction : false,
        })
        // console.log('3')
    } , [dataSwiper]) // eslint-disable-line react-hooks/exhaustive-deps
    //获取导航数据
    useEffect(()=>{
        let isUnmounted = false;
        const fetchNav = async()=>{
            try{
                const res = await getNav(config.baseUrl + '/api/home/index/nav?token=' + config.token);
                // console.log('res' , res);
                if(!isUnmounted){
                    setDataNav(_.get(res , ['data'] , []));
                }
            }catch(err){
                console.log('请求中间导航数据出错了' , err);
            }
        }
        fetchNav()
        return () => {
            isUnmounted = true;
        }
    },[])
    //请求产品分类数据
    useEffect(()=>{
        let isUnmounted = false;
        const fetchGoodsLevel = async()=>{
            try{
                const res = await getGoodsLevel(config.baseUrl + '/api/home/index/goodsLevel?token=' + config.token);
                // console.log('res' , res);
                if(!isUnmounted){
                    setDataGoodsLevel(_.get(res , ['data'] , []));   
                }
            }catch(err){
                console.log('请求产品分类数据出错了' , err);
            }
        }
        fetchGoodsLevel()
        return () => {
            isUnmounted = true;
        }
    },[])

    //获取为你推荐数据
    useEffect(() => {
        let isUnmounted = false;
        const fetchReco = async() =>{
           try{
               const res = await getReco(config.baseUrl + '/api/home/index/recom?token=' + config.token);
            //    console.log('res' , res);
            if(!isUnmounted){
                setDataReco(_.get(res , ['data'] , []));
            }
           }catch(err){
               console.log('请求为你推荐数据出错' , err)
           } 
        }
        fetchReco();
        return () => {
            isUnmounted = true;
        }
    },[])
    //函数组件实现图片懒加载
    useEffect(()=>{
        lazyImg();
    } , [dataReco , dataGoodsLevel])
    //这里加一个状态刷新的情况,要不然初始挂载只有一张幻灯片
    // console.log('4')


    //顶部点击3条杠跳转到产品分类页面
    const pushPage = (pUrl) => {
        props.history.push(config.path +  pUrl);
    }

    //点击搜索框实现搜索组件显示
    const changeSearch = () => {
        setPageStyle('block');
    }

    //父组件写一个函数,传进子组件当中,使得子组件触发一些状态的时候可以改变父组件当中的状态
    const getStyle = () => {
        setPageStyle('none');
    }
    return (
        <div className='page'>
            {/* 顶部搜索 */}
            <div>
                <div className={'search-header ' + (scrollBar?'red-bg':'')}>
                    <div className='classify-icon' onClick = {pushPage.bind(null , 'goods/classify/items')}></div>
                    <div  className = 'search-wrap' onClick={changeSearch.bind(null)}>
                        <div className = 'search-icon'></div>
                        <div className = 'search-text'>请输入宝贝名称</div>
                    </div>
                    <div className = 'login-wrap'>
                        {
                            isLogin ? 
                            /* 这里添加一个DOM元素,用来显示登录小图标,来区分是否登录上了,然后点击这个图标之后跳转到我的页面下*/
                            <div className= 'my' onClick={pushPage.bind(null , 'jd/user')}></div>:
                            <div className='login-text' onClick={pushPage.bind(null , 'login/index')}>登录</div>
                        }
                    </div>
                </div>
            </div>
            {/* 幻灯片 */}
            <div className='swiper-wrap' ref={(swiper) => swiperTarget = swiper}>
                <div className='swiper-wrapper'>
                    {/* 这里就可以使用请求到的数据进行替代了 */}
                    {
                        dataSwiper?
                        dataSwiper.map((item , index) =>{
                            return (
                                <div className='swiper-slide'  key={index}>
                                    <a href={item.webs} target="_blank" rel="noreferrer">
                                        <img className='image1' src={item.image} alt={item.title}></img>
                                    </a>
                                </div>
                            )
                        }):''
                    }
                </div>
                <div className='swiper-pagination'></div>
            </div>
            {/* 中间部分导航 */}
            <div className='quick-nav'>
                {/* 修改成通过请求数据来生成DOM */}
                {
                    dataNav?
                    dataNav.map((item , index) => {
                        return(
                            <ul className='item' key={index}>
                                <li className='item-img'><img src={item.image} alt={item.title} onClick={pushPage.bind(null , 'goods/classify/items?cid=' + item.cid)}></img></li>
                                <li className='item-text'>{item.title}</li>
                            </ul>
                        )
                    }):''
                }
            </div>
            {/* 产品分类 */}
            <div className='goods-level-wrap'>
                {
                    dataGoodsLevel?
                    dataGoodsLevel.map((item , index) => {
                        return(
                            <div key={index}>
                                <div className={'classify-title color' + (index + 1)}>—— {item.title} ——</div>
                                {/* 因为格式不同,下面的这里是进行判断该使用哪个样式的 */}
                                <div className='goods-level1-wrap'>
                                    {
                                        (item.title === GOODS_TYPE.SUIT_DRESS || item.title === GOODS_TYPE.COMPUTER_OFFICE)?
                                        (
                                            <>
                                                <div className='goods-level1-item0' onClick={pushPage.bind(null , 'goods/details/item?gid=' + (item.items[0].gid !== null?item.items[0].gid:''))}>
                                                    <div className={'goods-title'+ (index + 1)}>{item.items[0].title}</div>
                                                    <div className={'goods-text'+ (index + 1)}>精品打折</div>
                                                    <div className={'goods-price'+ (index + 1)}>{item.items[0].price}</div>
                                                    <div className={'goods-img'+ (index + 1)}><img src={require('../../../assets/images/common/lazyImg.jpg').default} alt={item.items[0].title} data-echo={item.items[0].image}></img></div>
                                                </div>
                                                <div className='goods-level1-item1'>
                                                    <div className='goods-row' onClick={pushPage.bind(null , 'goods/details/item?gid=' + (item.items[1].gid !== null?item.items[1].gid:''))}>
                                                        <div className={'goods-row-title'}>{item.items[1].title}</div>
                                                        <div className={'goods-row-text'}>品质精挑</div>
                                                        <div className={'goods-row-img'}><img src={require('../../../assets/images/common/lazyImg.jpg').default} alt={item.items[1].title} data-echo={item.items[1].image}></img></div>
                                                    </div>
                                                    <div className='goods-row' onClick={pushPage.bind(null , 'goods/details/item?gid=' + (item.items[2].gid !== null?item.items[2].gid:''))}>
                                                        <div className='goods-row-title'>{item.items[2].title}</div>
                                                        <div className='goods-row-text'>品质精挑4折起</div>
                                                        <div className='goods-row-img'><img src={require('../../../assets/images/common/lazyImg.jpg').default} alt={item.items[2].title} data-echo={item.items[2].image}></img></div>
                                                    </div>
                                                </div>
                                            </>

                                        ):(
                                            <>
                                                <div className='goods-level1-item0' onClick={pushPage.bind(null , 'goods/details/item?gid=' + (item.items[0].gid !== null?item.items[0].gid:''))}>
                                                    <div className={'goods-title' + (index + 1)}>{item.items[0].title}</div>
                                                    <div className={'goods-text' + (index + 1)}>火爆开售</div>
                                                    <div className={'goods-img' + (index + 1)}><img src={require('../../../assets/images/common/lazyImg.jpg').default} alt={item.items[0].title} data-echo={item.items[0].image}></img></div>
                                                </div>
                                                <div className='goods-level1-item0' onClick={pushPage.bind(null , 'goods/details/item?gid=' + (item.items[1].gid !== null?item.items[1].gid:''))}>
                                                    <div className={'goods-title' + (index + 1)}>{item.items[1].title}</div>
                                                    <div className={'goods-text' + (index + 1)}>火爆开售</div>
                                                    <div className={'goods-img' + (index + 1)}><img src={require('../../../assets/images/common/lazyImg.jpg').default} alt={item.items[1].title} data-echo={item.items[1].image}></img></div>
                                                </div>
                                            </> 
                                        )
                                    }
                                </div>
                                <div className='goods-list-wrap'>
                                    {/* 下面这部分的产品展示是相同的,所以并不需要进行判断*/}
                                    {item.items?
                                        (item.items.slice(-4).map((item_slice) => {
                                            return(
                                                <div className='goods-list' key={item_slice.title} onClick={pushPage.bind(null , 'goods/details/item?gid=' + (item_slice.gid !== null?item_slice.gid:''))}>
                                                    <div className='title'>{item_slice.title}</div>
                                                    <div className='image'><img src={require('../../../assets/images/common/lazyImg.jpg').default} alt={item_slice.title} data-echo={item_slice.image}></img></div>
                                                    <div className='price'>￥{item_slice.price}</div>
                                                    <div className='unprice'>￥388</div>
                                                </div> 
                                            )
                                        })):''
                                    }
                                </div>
                            </div>
                        )
                    }):''
                }
            </div>
            {/* 为你推荐 */}
            <div className='rec-title-wrap'>
                <div className='line'></div>
                <div className='reco-text-wrap'>
                    <div className='reco-icon'></div>
                    <div className='reco-text'>为你推荐</div>
                </div>
                <div className='line'></div>
            </div>
            <div className='reco-item-wrap'>
                {dataReco.map((item , index)=>{
                    // 这个return是必须的
                    return(
                        <div className='reco-item' key={index} onClick={pushPage.bind(null , 'goods/details/item?gid=' + (item.gid !== null?item.gid:''))}>
                            <div className='image'><img src={require('../../../assets/images/common/lazyImg.jpg').default} alt={item.title} data-echo={item.image}></img></div>
                            <div className='title'>{item.title}</div>
                            <div className='price'>￥{item.price}</div>
                        </div>
                    )
                })}
            </div>
            <Search pageStyle={pageStyle} childStyle = {getStyle.bind(null)}></Search>
        </div>
    )
}

export default HomeIndex
