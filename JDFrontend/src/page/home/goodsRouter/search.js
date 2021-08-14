//这个是搜索加载的页面
//这个页面也是要加载到路由里面的
import React , {useState , useEffect} from 'react'
import '../../../assets/css/common/goods/search.css'
import IScroll from '../../../assets/js/libs/iscroll'
import config from '../../../assets/js/conf/config'
import { getData } from '../../../assets/js/libs/request'
//导入写的搜索公共组件
import SearchIndex from '../../../components/search/search'
//导入图片懒加载的方法
import { lazyImg } from '../../../assets/js/utils/utils'
//导入滑动加载数据的组件
import UpRefresh from '../../../assets/js/libs/uprefresh'
//导入写好的获取url?后面的组件(这个组件会把每一部分转换成对应的键值)
import { localParam } from '../../../assets/js/utils/utils'
import _ from 'lodash'

const Search = (props) => {
    //老是对下面这个状态出现警告提示
    const [screenMove , setScreenMove] = useState('');
    const [bMask , setBMask] = useState(false);
    const [bPriceMenu , setBPriceMenu] = useState(false)
    const [bSalesMenu , setBSalesMenu] = useState(false)
    const [pageStyle , setPageStyle] = useState('none')
    const [data , setData] = useState([])
    //滑动获取数据所需要的状态
    const [maxPage , setMaxPage] = useState(0)
    //获取不同商品所需要的数据状态
    // keywords : decodeURIComponent(localParam(props.location.search).search.keywords)}这里折磨写是无奈之举,如果初始值设置成空的
    // const [params , setParams] = useState({otopye:'all' , keywords : decodeURIComponent(localParam(props.location.search).search.keywords)})
    const [params , setParams] = useState({otopye:'all' , keywords : ''})
    //这里添加一个状态来管理综合、价格从高到低和价格从低到高3个状态(视频中讲解这是数据驱动模式)
    const [aPriceOrder , setAPriceOrder] = useState([
        {title : '综合' , type : 'all' , checked : true},
        {title : '价格从高到低' , type : 'down' , checked : false},
        {title : '价格从低到高' , type : 'up' , checked : false},
    ])


    //当点击筛选出现操作面板时,禁止滚动条的滑动效果
    //当点击筛选的时候触发操作面板动画效果
    const showScreen = () => {
        //这是目前我所能想到的绑定监听事件的方式,不知道函数组件有没有和类组件一样的ref可以使用
        // touchmove是滑动事件,当这俩个DOM元素出现时会触发禁止效果
        document.getElementById('mask').addEventListener('touchmove' , function(e){
            e.preventDefault();
        } , false)
        document.getElementById('screen').addEventListener('touchmove' , function(e){
            e.preventDefault();
        } , false)
        setBMask(true);
        setScreenMove('move');
    }
    //点击触发控制面板退出效果
    const hideScreen = () => {
        setBMask(false);
        setScreenMove('unmove')
    }
    //IScroll使用
    useEffect(() => {
        new IScroll('#screen' ,{
            scrollX : false,
            scrollY : true,
            preventDefault : false,
        });
    } , [])
    //点击返回按钮触发返回
    const goBack = () => {
        props.history.goBack();
    }
    //显示隐藏价格排序
    const handlePriceOrder = () => {
        if(!bPriceMenu){
            setBPriceMenu(true);
            setBSalesMenu(false);
        }else{
            setBPriceMenu(false);
            // setBSalesMenu(true);
        }
    }
    //显示隐藏销量排序
    const handleSalesOrder =() => {
        if(!bSalesMenu){
            setBSalesMenu(true);
            setBPriceMenu(false);
        }else{
            setBSalesMenu(false);
            // setBPriceMenu(true); 
        }
        //点击销量的时候修改params
        let copyParams = params;
        copyParams.otopye = 'sales';
        setParams({...copyParams}) 
    }
    //点击搜索框显示搜索组件
    const changeSearch = () => {
        setPageStyle('block');
    }
    //该方法传入搜索子组件当中,触发后修改搜索状态为none
    const getStyle = () =>{
        setPageStyle('none');
    }
    //选中价格排序里面的值的时候修改请求参数对应的值
    const checkedPriceOrder = (index) => {
        let copyAPriceOrder = aPriceOrder;
        for(let i = 0 ; i < aPriceOrder.length ; i++){
            copyAPriceOrder[i].checked = false;
        }
        copyAPriceOrder[index].checked = true;
        //这里用一下浅拷贝,要不copyAPriceOrder与aPriceOrder指向同一个地址，setAPriceOrder(copyAPriceOrder)这样并不能刷新状态
        setAPriceOrder([...copyAPriceOrder]);
        let copyParams = params;
        copyParams.otopye = copyAPriceOrder[index].type;
        setParams({...copyParams});
    }
    //获取搜索产生的url上面的keywords
    useEffect(() => {
        //好像是下面的这个写法出现了那个bug(这下面这个地方是肯定有问题的)
        // const keywords = decodeURIComponent(localParam(props.location.search).search.keywords);
        // setParams(params => {return {...params , keywords}});

        //下面是第一种成功的办法,但是会有一个警告就是useEffect依赖于params
        // let copyParams_copy = () => {
        //     params.keywords = decodeURIComponent(localParam(props.location.search).search.keywords);
        //     return params;
        // };
        // setParams(copyParams_copy())
        
        // 下面这个解决了依赖问题,并且也是成功的
        setParams((params) => {
            params.keywords = decodeURIComponent(localParam(props.location.search).search.keywords);
            return params;
        })
    } , [props])
    //对url进行分装目的就是为了能够去修改传入参数
    const getParams = (params)=>{
        const sParams = 'kwords='+params.keywords+'&param=&price1=&price2=&otype='+params.otopye+'&cid=&';
        return sParams;
    }
    //获取商品数据的方法
    useEffect(()=> {
        // console.log('params' , params)
        const param = getParams(params);
        const dataPage = async() => {
            try{
                //第一部分是直接请求第一页的商品数据,并获取后面所需要的的最大页数
                const res = await getData(config.baseUrl + '/api/home/goods/search?'+param+'page=1&token=' + config.token);
                // console.log('res',res)
                if(res.code === 200){
                    setData(_.get(res , ['data'] , []));
                    setMaxPage(_.get(res , ['pageinfo' , 'pagenum'] , 0));
                }
            }catch(err){
                console.log('请求商品数据出错' , err);
            } 
        }
        dataPage();
    },[params])
    //滑动请求商品的方法
    useEffect(() => {
        // console.log('maxPage' , maxPage)
        //滑动请求商品所需要传的3个参数
        let curPage = 1,
            offsetBottom = 300;
        const param = getParams(params);
        //这里在最开始是不会触发的,因为这个请求写在回调函数里面了
        new UpRefresh({"curPage" : curPage , 'maxPage' : maxPage  , 'offsetBottom' : offsetBottom} , curPage => {
            const dataScorllPage = async() =>{
                try{
                    //这里用字面量模板``好像不能请求,只能写成''加引号好的字符串形式
                    const res = await getData(config.baseUrl +'/api/home/goods/search?'+ param + 'page='+curPage+'&token=' + config.token);
                    // console.log('res',res)
                    //用扩展运算符进行浅拷贝来修改状态(写成这样的箭头函数形式的,并且返回一个我们需要的值,不会触发React Hook useEffect has missing dependencies:data这个警告,这里如果添加一个data依赖的话,会出现问题)
                    if(res.code === 200){
                        setData(data => [...data ,  ...(_.get(res , ['data'] , []))]);
                    }
                }catch(err){
                    console.log('请求商品数据出错' , err);
                }
            }
            dataScorllPage();
        })
    },[params , maxPage])
    //实现图片懒加载
    useEffect(() =>{
        // console.log('data' , data)
        lazyImg();
    } , [data])
    return (
        <div className='search-page'>
            <div className='search-top'>
                <div className='search-header2'>
                    <div className='search-back' onClick={goBack.bind(null)}></div>
                    <div className='search-wrap2'>
                        <div className='search-icon2'></div>
                        <div className='search-text2'  onClick = {changeSearch.bind(null)}>{params.keywords}</div>
                    </div>
                    <div className='screen-btn2' onClick={showScreen.bind(null)}>筛选</div>
                </div>
                <div className='order-main'>
                    <div className={bPriceMenu?'order-item active' : 'order-item'}  onClick={handlePriceOrder.bind(null)}>
                        <div className='order-text'>综合</div>
                        <div className= 'order-icon'></div>
                        <ul className={bPriceMenu?'order-menu' : 'order-menu hide'}>
                            {
                                aPriceOrder.map((item , index) => {
                                    return(
                                        <li className={item.checked?'active' : ''} onClick={checkedPriceOrder.bind(null , index)} key={index}>{item.title}</li>
                                    )
                                })
                            }
                            {/* <li className='active' onClick={checkedPriceOrder.bind(null)}>综合</li> */}
                            {/* 我们这里有一个需求就是我们点击那个，那个添加一个active属性，这里必须通过数据驱动来操作 */}
                            {/* <li>价格从低到高</li>
                            <li>价格从高到低</li> */}
                        </ul>
                    </div>
                    <div className={bSalesMenu?'order-item active' : 'order-item'} onClick={handleSalesOrder.bind(null)}>
                        <div className='order-text'>销量</div>
                    </div>
                </div>
            </div>
            {/* 产品列表 */}
            <div className='goods-main2'>
                {
                    data.map((item , index) => {
                        return(
                            <div className='goods-list2' key={index}>
                                <div className='image'><img src={require('../../../assets/images/common/lazyImg.jpg').default} data-echo={item.image} alt={item.title}></img></div>
                                <div className='goods-content2'>
                                    <div className='goods-title2'>{item.title}</div>
                                    <div className='goods-price'>￥{item.price}</div>
                                    <div className='goods-sales'>销量<span>{item.sales}</span>件</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {/* 点击筛选产生的背景色,并通过事件监听禁用滑动效果 */}
            <div id='mask' className={bMask?'mask':'mask hide'} onClick={hideScreen.bind(null)}></div>
            {/* 点击筛选产生的控制面板 */}
            <div id='screen' className={'screen ' + screenMove}>
                <div>
                    <div className='attr-wrap'>
                        <div className='attr-title-wrap'>
                            <div className='attr-name'>分类</div>
                            <div className='attr-icon up'></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='item active'>潮流女装</div>
                            <div className='item'>潮流女装</div>
                            <div className='item'>潮流女装</div>
                            <div className='item'>潮流女装</div>
                            <div className='item'>潮流女装</div>
                        </div>
                    </div>
                    <div style={{width:'100%' , height:'1px' , backgroundColor:'#EFEFEF'}}></div>
                    <div className='attr-wrap'>
                        <div className='attr-title-wrap'>
                            <div className='attr-name'>价格区间</div>
                            <div className='price-wrap'>
                                <div className='price-input'><input type='tel' placeholder='最低价'></input></div>
                                <div className='price-line'></div>
                                <div className='price-input'><input type='tel' placeholder='最高价'></input></div>
                            </div>
                            <div className='attr-icon up'></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='item'>1-50</div>
                            <div className='item'>51-99</div>
                            <div className='item'>100-300</div>
                            <div className='item'>301-1000</div>
                            <div className='item'>1001-4000</div>
                            <div className='item'>4001-9999</div>
                        </div>
                    </div>
                    <div style={{width:'100%' , height:'0.6rem' , backgroundColor:'#EFEFEF'}}></div>
                    <div className='attr-wrap'>
                        <div className='attr-title-wrap'>
                            <div className='attr-name'>品牌</div>
                            <div className='attr-icon up'></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='item active'>李宁</div>
                            <div className='item'>阿迪达斯</div>
                            <div className='item'>耐克</div>
                        </div>
                    </div>
                    <div style={{width:'100%' , height:'1px' , backgroundColor:'#EFEFEF'}}></div>
                    <div className='attr-wrap'>
                        <div className='attr-title-wrap'>
                            <div className='attr-name'>衣长</div>
                            <div className='attr-icon up'></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='item active'>长款</div>
                            <div className='item'>中长款</div>
                            <div className='item'>短款</div>
                        </div>
                    </div>
                    <div style={{width:'100%' , height:'1px' , backgroundColor:'#EFEFEF'}}></div>
                    <div className='attr-wrap'>
                        <div className='attr-title-wrap'>
                            <div className='attr-name'>衣长</div>
                            <div className='attr-icon up'></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='item active'>长款</div>
                            <div className='item'>中长款</div>
                            <div className='item'>短款</div>
                        </div>
                    </div>
                    <div style={{width:'100%' , height:'1px' , backgroundColor:'#EFEFEF'}}></div>
                    <div className='attr-wrap'>
                        <div className='attr-title-wrap'>
                            <div className='attr-name'>衣长</div>
                            <div className='attr-icon up'></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='item active'>长款</div>
                            <div className='item'>中长款</div>
                            <div className='item'>短款</div>
                        </div>
                    </div>
                    <div style={{width:'100%' , height:'1px' , backgroundColor:'#EFEFEF'}}></div>
                    <div className='attr-wrap'>
                        <div className='attr-title-wrap'>
                            <div className='attr-name'>衣长</div>
                            <div className='attr-icon up'></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='item active'>长款</div>
                            <div className='item'>中长款</div>
                            <div className='item'>短款</div>
                        </div>
                    </div>
                    <div style={{width:'100%' , height:'1px' , backgroundColor:'#EFEFEF'}}></div>
                    <div className='attr-wrap'>
                        <div className='attr-title-wrap'>
                            <div className='attr-name'>衣长</div>
                            <div className='attr-icon up'></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='item active'>长款</div>
                            <div className='item'>中长款</div>
                            <div className='item'>短款</div>
                        </div>
                    </div>
                    <div style={{width:'100%' , height:'1px' , backgroundColor:'#EFEFEF'}}></div>
                    <div className='attr-wrap'>
                        <div className='attr-title-wrap'>
                            <div className='attr-name'>衣长</div>
                            <div className='attr-icon up'></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='item active'>长款</div>
                            <div className='item'>中长款</div>
                            <div className='item'>短款</div>
                        </div>
                    </div>
                    <div style={{width:'100%' , height:'1px' , backgroundColor:'#EFEFEF'}}></div>
                    <div className='attr-wrap'>
                        <div className='attr-title-wrap'>
                            <div className='attr-name'>衣长</div>
                            <div className='attr-icon up'></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='item active'>长款</div>
                            <div className='item'>中长款</div>
                            <div className='item'>短款</div>
                        </div>
                    </div>
                    <div style={{width:'100%' , height:'1px' , backgroundColor:'#EFEFEF'}}></div>
                    <div className='attr-wrap'>
                        <div className='attr-title-wrap'>
                            <div className='attr-name'>衣长</div>
                            <div className='attr-icon up'></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='item active'>长款</div>
                            <div className='item'>中长款</div>
                            <div className='item'>短款</div>
                        </div>
                    </div>
                    <div style={{width:'100%' , height:'1px' , backgroundColor:'#EFEFEF'}}></div>
                    {/* 这里添加一个DOM元素给界面撑起来,让最下面的可以成功显示 */}
                    <div style={{width:'100%' , height:'2rem'}}></div>
                </div>
                {/* 底部信息栏 */}
                <div className='handel-wrap'>
                    <div className='item'>共<span>16</span>件</div>
                    <div className='item reset'>全部重置</div>
                    <div className='item sure'>确定</div>
                </div>
            </div>
            <SearchIndex pageStyle={pageStyle} childStyle = {getStyle.bind(null)}></SearchIndex>
        </div>
    )
}

export default Search
