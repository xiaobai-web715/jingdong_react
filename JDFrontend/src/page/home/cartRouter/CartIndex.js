import React from 'react'
import Subheader from '../../../components/header/subheader'
import '../../../assets/css/common/cart/cartIndex.css'

const CartIndex = () => {
    return (
        <div>
            <Subheader title='购物车' right-text=''></Subheader>
            <div className='cart-main'>
                <div className='cart-list'>
                    <div className='select-btn active'></div>
                    <div className='image-wrap'>
                        <div className='image'><img src='' alt=''></img></div>
                        <div className='del'>删除</div>
                    </div>
                    <div className='goods-wrap'>
                        <div className='goods-title'>你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢</div>
                        <div className='goods-attr'>
                            <span>颜色:黑色</span>
                            <span>屏幕尺寸:15.6</span>
                        </div>
                        <div className='buy-wrap'>
                            <div className='price'>￥2799</div>

                                <div className='amount-input-wrap'>
                                    <div className='dec active'>-</div>
                                    <div className='amount-input'><input type='tel' defaultValue='1'></input></div>
                                    <div className='inc'>+</div>
                                </div>
                        </div>
                    </div>
                </div>
                <div className='cart-list'>
                    <div className='select-btn'></div>
                    <div className='image-wrap'>
                        <div className='image'><img src='' alt=''></img></div>
                        <div className='del'>删除</div>
                    </div>
                    <div className='goods-wrap'>
                        <div className='goods-title'>你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢</div>
                        <div className='goods-attr'>
                            <span>颜色:黑色</span>
                            <span>屏幕尺寸:15.6</span>
                        </div>
                        <div className='buy-wrap'>
                            <div className='price'>￥2799</div>
                            <div className='amount-input-wrap'>
                                <div className='dec active'>-</div>
                                <div className='amount-input'><input type='tel' defaultValue='1'></input></div>
                                <div className='inc'>+</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='orderend-wrap'>
                <div className='select-area'>
                    <div className='select-wrap'>
                        <div className='select-btn active'></div>
                        <div className='select-text'>全选</div>
                    </div>
                    <div className='total'>合计:<span>￥3950.00</span></div>
                </div>
                <div className='orderend-btn'>去结算</div>
            </div>
        </div>
    )
}

export default CartIndex
