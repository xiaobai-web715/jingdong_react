import React , {useEffect , useState}from 'react'
import _ from 'lodash'
import {getSwiper , getNav , getGoodsLevel} from '../../../assets/js/libs/request'
import config from '../../../assets/js/conf/config'
import GOODS_TYPE from './mold.js'
import '../../../assets/css/common/home/home.css'

//这里用到的是swiper组件,究竟推不推荐企业级开发使用，之后再说
import '../../../assets/css/common/swiper/swiper.min.css'
import Swiper from '../../../assets/js/libs/swiper.min.js'

const HomeIndex = () => {
    const[dataSwiper ,  setDataSwiper] = useState([]);
    const[dataNav ,  setDataNav] = useState([]);
    const[dataGoodsLevel , setDataGoodsLevel] = useState();
    // console.log('dataSwiper' , dataSwiper)
    // console.log('1')

    // 获取接口数据
    useEffect(()=>{
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
                if(res.code === 200){
                    setDataSwiper(_.get(res , ['data'] , []))
                }
            }catch(err){
                console.log('请求轮播图数据出错' , err);
            }
            // console.log('2');
        }
        fetchData();
    },[])
    // 目前的理解,useEffect是在dom树加载完成之后，才会去执行
    useEffect(()=>{
        new Swiper('.swiper-wrap' , {
            autoplay : 5000,
            pagination : '.swiper-pagination',
            autoplayDisableOnInteraction : false,
        })
        // console.log('3')
    } , [dataSwiper]) 
    //获取导航数据
    useEffect(()=>{
        const fetchNav = async()=>{
            try{
                const res = await getNav(config.baseUrl + '/api/home/index/nav?token=' + config.token);
                // console.log('res' , res);
                setDataNav(_.get(res , ['data'] , []));
            }catch(err){
                console.log('请求中间导航数据出错了' , err);
            }
        }
        fetchNav()
    },[])
    //请求产品分类数据
    useEffect(()=>{
        const fetchGoodsLevel = async()=>{
            try{
                const res = await getGoodsLevel(config.baseUrl + '/api/home/index/goodsLevel?token=' + config.token);
                console.log('res' , res);
                setDataGoodsLevel(_.get(res , ['data'] , []))
            }catch(err){
                console.log('请求产品分类数据出错了' , err);
            }
        }
        fetchGoodsLevel()
    },[])

    //这里加一个状态刷新的情况,要不然初始挂载只有一张幻灯片
    // console.log('4')
    return (
        <div className='page'>
            {/* 顶部搜索 */}
            <div>
                <div className='search-header red-bg'>
                    <div className='classify-icon'></div>
                    <div className = 'search-wrap'>
                        <div className = 'search-icon'></div>
                        <div className = 'search-text'>请输入宝贝名称</div>
                    </div>
                    <div className = 'login-wrap'>
                        <div className='login-text'>登录</div>
                    </div>
                </div>
            </div>
            {/* 幻灯片 */}
            <div className='swiper-wrap'>
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
                                <li className='item-img'><img src={item.image} alt={item.title}></img></li>
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
                                                <div className='goods-level1-item0'>
                                                    <div className={'goods-title'+ (index + 1)}>{item.items[0].title}</div>
                                                    <div className={'goods-text'+ (index + 1)}>精品打折</div>
                                                    <div className={'goods-price'+ (index + 1)}>{item.items[0].price}</div>
                                                    <div className={'goods-img'+ (index + 1)}><img src={item.items[0].image} alt=''></img></div>
                                                </div>
                                                <div className='goods-level1-item1'>
                                                    <div className='goods-row'>
                                                        <div className={'goods-row-title'}>{item.items[1].title}</div>
                                                        <div className={'goods-row-text'}>品质精挑</div>
                                                        <div className={'goods-row-img'}><img src={item.items[1].image} alt={item.items[1].title}></img></div>
                                                    </div>
                                                    <div className='goods-row'>
                                                        <div className='goods-row-title'>{item.items[2].title}</div>
                                                        <div className='goods-row-text'>品质精挑4折起</div>
                                                        <div className='goods-row-img'><img src={item.items[2].image} alt={item.items[2].title}></img></div>
                                                    </div>
                                                </div>
                                            </>

                                        ):(
                                            <>
                                                <div className='goods-level1-item0'>
                                                    <div className={'goods-title' + (index + 1)}>{item.items[0].title}</div>
                                                    <div className={'goods-text' + (index + 1)}>火爆开售</div>
                                                    <div className={'goods-img' + (index + 1)}><img src={item.items[0].image} alt={item.items[0].title}></img></div>
                                                </div>
                                                <div className='goods-level1-item0'>
                                                    <div className={'goods-title' + (index + 1)}>{item.items[1].title}</div>
                                                    <div className={'goods-text' + (index + 1)}>火爆开售</div>
                                                    <div className={'goods-img' + (index + 1)}><img src={item.items[1].image} alt={item.items[1].title}></img></div>
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
                                                <div className='goods-list' key={item_slice.title}>
                                                    <div className='title'>{item_slice.title}</div>
                                                    <div className='image'><img src={item_slice.image} alt={item_slice.title}></img></div>
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
            <div className='rec-title-wrap'>
                <div className='line'></div>
                <div className='reco-text-wrap'>
                    <div className='reco-icon'></div>
                    <div className='reco-text'>为你推荐</div>
                </div>
                <div className='line'></div>
            </div>
            <div className='reco-item-wrap'>
                <div className='reco-item'>
                    <div className='image'><img alt=''></img></div>
                    <div className='title'>ONLY冬装新品雪纺拼接流苏腰带长宽连衣裙女</div>
                    <div className='price'>￥399</div>
                </div>
                <div className='reco-item'>
                    <div className='image'><img alt=''></img></div>
                    <div className='title'>ONLY冬装新品雪纺拼接流苏腰带长宽连衣裙女</div>
                    <div className='price'>￥399</div>
                </div>
                <div className='reco-item'>
                    <div className='image'><img alt=''></img></div>
                    <div className='title'>ONLY冬装新品雪纺拼接流苏腰带长宽连衣裙女</div>
                    <div className='price'>￥399</div>
                </div>
                <div className='reco-item'>
                    <div className='image'><img alt=''></img></div>
                    <div className='title'>ONLY冬装新品雪纺拼接流苏腰带长宽连衣裙女</div>
                    <div className='price'>￥399</div>
                </div>
            </div>
        </div>
    )
}

export default HomeIndex
