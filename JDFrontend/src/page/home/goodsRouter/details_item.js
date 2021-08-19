import React , {useEffect} from 'react'
import Swiper from '../../../assets/js/libs/swiper.min.js'
import '../../../assets/css/common/goods/details_item.css'
const DetailsItem = () => {
    let swiperTarget = null;
    useEffect(() => {
        new Swiper(swiperTarget , {
            autoplay : 5000,
            pagination : '.swiper-pagination2',
            autoplayDisableOnInteraction : false,
        })
    },[])// eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div>
            <div className='swiper-wrap2' ref={div => swiperTarget = div}>
                <div className='swiper-wrapper2'>
                    <div className='swiper-slide2'>
                        <img src='' alt=''></img>
                        <img src='' alt=''></img>
                        <img src='' alt=''></img>
                    </div>
                    <div className='swiper-pagination2'></div>
                </div>
            </div>
            <div className='goods-ele-main'>
                <div className='goods-ele-title'>你说啥名字好呢</div>
                <div className='goods-ele-price'>￥128</div>
                <ul className='goods-ele-sales-wrap'>
                    <li>快递: 20元</li>
                    <li>月销量10件</li>
                </ul>
            </div>
            <div className='reviews-main2'>
                <div className='reviews-title2'>商品评价(22)</div>
                <div className='reviews-wrap2'>
                    <div className='reviews-list'>
                        <div className='uinfo'>
                            <div className='head'><img src='' alt=''></img></div>
                            <div className='nickname'>昵称</div>
                        </div>
                        <div className='reviews-content'>评价内容</div>
                        <div className='reviews-date'>评价时间</div>
                    </div>
                    <div className='reviews-list'>
                        <div className='uinfo'>
                            <div className='head'><img src='' alt=''></img></div>
                            <div className='nickname'>昵称</div>
                        </div>
                        <div className='reviews-content'>评价内容</div>
                        <div className='reviews-date'>评价时间</div>
                    </div>
                    <div className='reviews-list'>
                        <div className='uinfo'>
                            <div className='head'><img src='' alt=''></img></div>
                            <div className='nickname'>昵称</div>
                        </div>
                        <div className='reviews-content'>评价内容</div>
                        <div className='reviews-date'>评价时间</div>
                    </div>
                </div>
                <div className='reviews-more'>更多评价</div>
            </div>
            <div className='bottom-btn-wrap'>
                <div className='btn fav'>收藏</div>
                <div className='btn cart'>加入购物车</div>
            </div>
            {/* 点击加入购物车产生的背景 */}
            <div className='mask2'></div>
            {/* 控制面板 */}
            <div className='cart-panel'>
                <div className='goods-info'>
                    {/* 一个小心开关的定位 */}
                    <div className='close-panel-wrap'>
                        <div className='spot'></div>
                        <div className='line'></div>
                        <div className='close'></div>
                    </div>
                    <div className='goods-img'><img src='' alt=''></img></div>
                    <div className='goods-wrap2'>
                        <div className='goods-wrap2-title'>你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢</div>
                        <div className='price'>￥128</div>
                        <div className='goods-code'>商品编码:15354894</div>
                    </div>
                </div>
                <div className='attr-wrap2'>
                    <div className='attr-list'>
                        <div className='attr-name'>颜色</div>
                        <div className='val-wrap'>
                            <div className='val active'>灰色</div>
                            <div className='val'>灰色</div>
                            <div className='val'>灰色</div>
                            <div className='val'>灰色</div>
                            <div className='val'>灰色</div>
                            <div className='val'>灰色</div>
                            <div className='val'>灰色</div>
                            <div className='val'>灰色</div>
                        </div>
                    </div>
                    <div className='attr-list'>
                        <div className='attr-name'>颜色</div>
                        <div className='val-wrap'>
                            <div className='val'>灰色</div>
                            <div className='val'>灰色</div>
                            <div className='val'>灰色</div>
                            <div className='val'>灰色</div>
                            <div className='val'>灰色</div>
                            <div className='val'>灰色</div>
                            <div className='val'>灰色</div>
                            <div className='val'>灰色</div>
                        </div>
                    </div>
                </div>
                <div className='amount-wrap'>
                    <div className='amount-name'>购买数量</div>
                    <div className='amount-input-wrap'>
                        <div className='dec active'>-</div>
                        <div className='amount-input'><input type='tel' defaultValue='1'></input></div>
                        <div className='inc'>+</div>
                    </div>
                </div>
                <div className='sure-btn'>确定</div>
            </div>
        </div>
    )
}

export default DetailsItem
