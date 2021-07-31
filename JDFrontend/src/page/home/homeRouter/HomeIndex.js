import React , {useEffect}from 'react'
import '../../../assets/css/common/home/home.css'

//这里用到的是swiper组件,究竟推不推荐企业级开发使用，之后再说
import '../../../assets/css/common/swiper/swiper.min.css'
import Swiper from '../../../assets/js/libs/swiper.min.js'

const HomeIndex = () => {
    console.log('1')
    // 目前的理解,useEffect是在dom树加载完成之后，才会去执行
    useEffect(()=>{
        console.log('2')
        new Swiper('.swiper-wrap' , {
            autoplay : 3000,
            pagination : '.swiper-pagination',
            autoplayDisableOnInteraction : false,
        })
    } , [])
    console.log('3')
    return (
        <>
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
                    <div className='swiper-slide'><img className='image1' alt=''></img></div>
                    <div className='swiper-slide'><img className='image2' alt=''></img></div>
                    <div className='swiper-slide'><img className='image3' alt=''></img></div>
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
                        <div className='goods-price'>128元</div>
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
                    </div>
                    <div className='goods-list'></div>
                    <div className='goods-list'></div>
                    <div className='goods-list'></div>
                </div>
            </div>
        </>
    )
}

export default HomeIndex

