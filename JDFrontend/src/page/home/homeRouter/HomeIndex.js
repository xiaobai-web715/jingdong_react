import React , {useEffect , useState}from 'react'
import _ from 'lodash'
import requestHDP from '../../../assets/js/libs/request'
import config from '../../../assets/js/conf/config'
import '../../../assets/css/common/home/home.css'

//这里用到的是swiper组件,究竟推不推荐企业级开发使用，之后再说
import '../../../assets/css/common/swiper/swiper.min.css'
import Swiper from '../../../assets/js/libs/swiper.min.js'

const HomeIndex = () => {
    const[dataContent ,  setDataContent] = useState([])
    console.log('dataContent' , dataContent)
    console.log('1')
    // 获取接口数据
    useEffect(()=>{
        // 这里可以试着打印一下，输出的结果是1,4,3(2bu执行的原因是状态改变了);然后状态改变1,4,3,2,因为await会使得后面的执行必须等待前一个await执行完成才可以(所以最好加try-catch)
        const fetchData = async  () =>{
            console.log('config' , config)
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
                //         setDataContent(_.get(res , ['data'] , []))
                //     }
                //     //用到的是lodash里面的get方法，返回一个对象里面指定路径的数据
                // });

                // //企业级开发也不是这样写url的,也是在组件里面写好使用的(然后传入指定参数)
                // const res = await requestHDP("http://vueshop.glbuys.com/api/home/index/slide?token=1ec949a15fb709370f");
                // if(res.code === 200){
                //     setDataContent(_.get(res , ['data'] , []))
                // }

                //封装http://vueshop.glbuys.com地址(正式地址和测试地址),在这里做一个代理
                //为什么要做代理(目的是防止跨域问题的出现)
                const res = await requestHDP(config.baseUrl + "/api/home/index/slide?token=" + config.token);
                if(res.code === 200){
                    setDataContent(_.get(res , ['data'] , []))
                }
            }catch(err){
                console.log('请求数据出错' , err);
            }
            console.log('2');
        }
        fetchData();
    },[])
    // 目前的理解,useEffect是在dom树加载完成之后，才会去执行
    useEffect(()=>{
        new Swiper('.swiper-wrap' , {
            autoplay : 3000,
            pagination : '.swiper-pagination',
            autoplayDisableOnInteraction : false,
        })
        console.log('3')
    } , [dataContent])
    //这里加一个状态刷新的情况,要不然初始挂载只有一张幻灯片
    console.log('4')
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
                        dataContent.map((item , index) =>{
                            return (
                                <div className='swiper-slide'  key={index}>
                                    <a href={item.webs} target="_blank" rel="noreferrer">
                                        <img className='image1' src={item.image} alt={item.title}></img>
                                    </a>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='swiper-pagination'></div>
            </div>
            {/* 中间部分导航 */}
            <div className='quick-nav'>
                <ul className='item'>
                    <li className='item-img'><img src='' alt=''></img></li>
                    <li className='item-text'>潮流女装</li>
                </ul>
                <ul className='item'>
                    <li className='item-img'><img src='' alt=''></img></li>
                    <li className='item-text'>潮流女装</li>
                </ul>
                <ul className='item'>
                    <li className='item-img'><img src='' alt=''></img></li>
                    <li className='item-text'>潮流女装</li>
                </ul>
                <ul className='item'>
                    <li className='item-img'><img src='' alt=''></img></li>
                    <li className='item-text'>潮流女装</li>
                </ul>
            </div>
            {/* 产品分类 */}
            <div className='goods-level-wrap'>
                <div className='classify-title color1'>—— 潮流女装 ——</div>
                <div className='goods-level1-wrap'>
                    <div className='goods-level1-item0'>
                        <div className='goods-title'>高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带</div>
                        <div className='goods-text'>精品打折</div>
                        <div className='goods-price1'>128元</div>
                        <div className='goods-img'><img alt=''></img></div>
                    </div>
                    <div className='goods-level1-item1'>
                        <div className='goods-row'>
                            <div className='goods-row-title'>欧美尖头蝴蝶结拖鞋女夏外穿2018新款绸缎面细跟凉拖半拖鞋穆勒鞋</div>
                            <div className='goods-row-text'>品质精挑</div>
                            <div className='goods-row-img'><img alt=''></img></div>
                        </div>
                        <div className='goods-row'>
                            <div className='goods-row-title'>欧美尖头蝴蝶结拖鞋女夏外穿2018新款绸缎面细跟凉拖半拖鞋穆勒鞋</div>
                            <div className='goods-row-text'>品质精挑4折起</div>
                            <div className='goods-row-img'><img alt=''></img></div>
                        </div>
                    </div>
                </div>
                <div className='goods-list-wrap'>
                    <div className='goods-list'>
                        <div className='title'>小白鞋女2018春夏季新款韩版百搭平底学生原宿ulzzang帆布鞋板鞋</div>
                        <div className='image'><img alt=''></img></div>
                        <div className='price'>￥288</div>
                        <div className='unprice'>￥388</div>
                    </div>
                    <div className='goods-list'>
                        <div className='title'>小白鞋女2018春夏季新款韩版百搭平底学生原宿ulzzang帆布鞋板鞋</div>
                        <div className='image'><img alt=''></img></div>
                        <div className='price'>￥288</div>
                        <div className='unprice'>￥388</div>
                    </div>
                    <div className='goods-list'>
                        <div className='title'>小白鞋女2018春夏季新款韩版百搭平底学生原宿ulzzang帆布鞋板鞋</div>
                        <div className='image'><img alt=''></img></div>
                        <div className='price'>￥288</div>
                        <div className='unprice'>￥388</div>
                    </div>
                    <div className='goods-list'>
                        <div className='title'>小白鞋女2018春夏季新款韩版百搭平底学生原宿ulzzang帆布鞋板鞋</div>
                        <div className='image'><img alt=''></img></div>
                        <div className='price'>￥288</div>
                        <div className='unprice'>￥388</div>
                    </div>
                </div>
            </div>
            <div className='goods-level-wrap'>
                <div className='classify-title color2'>—— 品牌男装 ——</div>
                <div className='goods-level1-wrap'>
                    <div className='goods-level1-item0'>
                        <div className='goods-title2'>高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带</div>
                        <div className='goods-text2'>火爆开售</div>
                        <div className='goods-img2'><img alt=''></img></div>
                    </div>
                    <div className='goods-level1-item0'>
                        <div className='goods-title2'>高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带</div>
                        <div className='goods-text2'>火爆开售</div>
                        <div className='goods-img2'><img alt=''></img></div>
                    </div>
                </div>
                <div className='goods-list-wrap'>
                    <div className='goods-list'>
                        <div className='title'>小白鞋女2018春夏季新款韩版百搭平底学生原宿ulzzang帆布鞋板鞋</div>
                        <div className='image'><img alt=''></img></div>
                        <div className='price'>￥288</div>
                        <div className='unprice'>￥388</div>
                    </div>
                    <div className='goods-list'>
                        <div className='title'>小白鞋女2018春夏季新款韩版百搭平底学生原宿ulzzang帆布鞋板鞋</div>
                        <div className='image'><img alt=''></img></div>
                        <div className='price'>￥288</div>
                        <div className='unprice'>￥388</div>
                    </div>
                    <div className='goods-list'>
                        <div className='title'>小白鞋女2018春夏季新款韩版百搭平底学生原宿ulzzang帆布鞋板鞋</div>
                        <div className='image'><img alt=''></img></div>
                        <div className='price'>￥288</div>
                        <div className='unprice'>￥388</div>
                    </div>
                    <div className='goods-list'>
                        <div className='title'>小白鞋女2018春夏季新款韩版百搭平底学生原宿ulzzang帆布鞋板鞋</div>
                        <div className='image'><img alt=''></img></div>
                        <div className='price'>￥288</div>
                        <div className='unprice'>￥388</div>
                    </div>
                </div>
            </div>
            <div className='goods-level-wrap'>
                <div className='classify-title color3'>—— 电脑办公 ——</div>
                <div className='goods-level1-wrap'>
                    <div className='goods-level1-item0'>
                        <div className='goods-title'>高跟鞋女2018新款春季单鞋仙女甜美链子尖头防水台细跟女鞋一字带</div>
                        <div className='goods-text'>精品打折</div>
                        <div className='goods-price1'>128元</div>
                        <div className='goods-img'><img alt=''></img></div>
                    </div>
                    <div className='goods-level1-item1'>
                        <div className='goods-row'>
                            <div className='goods-row-title'>欧美尖头蝴蝶结拖鞋女夏外穿2018新款绸缎面细跟凉拖半拖鞋穆勒鞋</div>
                            <div className='goods-row-text'>品质精挑</div>
                            <div className='goods-row-img'><img alt=''></img></div>
                        </div>
                        <div className='goods-row'>
                            <div className='goods-row-title'>欧美尖头蝴蝶结拖鞋女夏外穿2018新款绸缎面细跟凉拖半拖鞋穆勒鞋</div>
                            <div className='goods-row-text'>品质精挑4折起</div>
                            <div className='goods-row-img'><img alt=''></img></div>
                        </div>
                    </div>
                </div>
                <div className='goods-list-wrap'>
                    <div className='goods-list'>
                        <div className='title'>小白鞋女2018春夏季新款韩版百搭平底学生原宿ulzzang帆布鞋板鞋</div>
                        <div className='image'><img alt=''></img></div>
                        <div className='price'>￥288</div>
                        <div className='unprice'>￥388</div>
                    </div>
                    <div className='goods-list'>
                        <div className='title'>小白鞋女2018春夏季新款韩版百搭平底学生原宿ulzzang帆布鞋板鞋</div>
                        <div className='image'><img alt=''></img></div>
                        <div className='price'>￥288</div>
                        <div className='unprice'>￥388</div>
                    </div>
                    <div className='goods-list'>
                        <div className='title'>小白鞋女2018春夏季新款韩版百搭平底学生原宿ulzzang帆布鞋板鞋</div>
                        <div className='image'><img alt=''></img></div>
                        <div className='price'>￥288</div>
                        <div className='unprice'>￥388</div>
                    </div>
                    <div className='goods-list'>
                        <div className='title'>小白鞋女2018春夏季新款韩版百搭平底学生原宿ulzzang帆布鞋板鞋</div>
                        <div className='image'><img alt=''></img></div>
                        <div className='price'>￥288</div>
                        <div className='unprice'>￥388</div>
                    </div>
                </div>
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

