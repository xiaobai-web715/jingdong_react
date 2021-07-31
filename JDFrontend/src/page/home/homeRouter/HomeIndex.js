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

