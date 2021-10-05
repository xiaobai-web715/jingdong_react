import React from 'react'
import Subheader from '../../../components/header/subheader'
import '../../../assets/css/common/user/myorder/details.css'

const OrderDatail = () => {
    return (
        <div className='detail-page'>
            <Subheader title='订单详情'></Subheader>
            <div className='detail-main'>
                <div className='ordernum'>订单编号:123456</div>
                <div className='address-wrap'>
                    <div className='skew-wrap'>
                        <div className='skew'></div>
                        <div className='skew'></div>
                        <div className='skew'></div>
                        <div className='skew'></div>
                        <div className='skew'></div>
                        <div className='skew'></div>
                        <div className='skew'></div>
                        <div className='skew'></div>
                        <div className='skew'></div>
                        <div className='skew'></div>
                        <div className='skew'></div>
                        <div className='skew'></div>
                    </div>
                    <div className='address-info'>
                        <div className='name'><img src={require('../../../assets/images/common/my2.png').default} alt=''></img>张三</div>
                        <div className='cellphone'><img src={require('../../../assets/images/common/cellphone.png').default} alt=''></img>18315966987</div>
                        <div className='address'>北京昌平区</div>
                    </div>
                    <div className='skew-wrap'>
                        <div className='skew'></div>
                        <div className='skew'></div>
                        <div className='skew'></div>
                        <div className='skew'></div>
                        <div className='skew'></div>
                        <div className='skew'></div>
                        <div className='skew'></div>
                        <div className='skew'></div>
                        <div className='skew'></div>
                        <div className='skew'></div>
                        <div className='skew'></div>
                        <div className='skew'></div>
                    </div>
                </div>
                <div className='buy-title'>购买的宝贝</div>
                <div className='goods-list'>
                    <div className='image'><img src='' alt=''></img></div>
                    <div className='goods-info'>
                        <div className='title'>你说啥名字好呢</div>
                        <div className='attr'>
                            <span className='amount'>x 1</span>
                            <span>颜色：黑色</span><span>尺码：37</span>
                        </div>
                    </div>
                    <div className='price'>￥255</div>
                </div>
                <div className='goods-list'>
                    <div className='image'><img src='' alt=''></img></div>
                    <div className='goods-info'>
                        <div className='title'>你说啥名字好呢</div>
                        <div className='attr'>
                            <span className='amount'>x 1</span>
                            <span>颜色：黑色</span><span>尺码：37</span>
                        </div>
                    </div>
                    <div className='price'>￥255</div>
                </div>
                <div className='goods-list'>
                    <div className='image'><img src='' alt=''></img></div>
                    <div className='goods-info'>
                        <div className='title'>你说啥名字好呢</div>
                        <div className='attr'>
                            <span className='amount'>x 1</span>
                            <span>颜色：黑色</span><span>尺码：37</span>
                        </div>
                    </div>
                    <div className='price'>￥255</div>
                </div>
                <div className='goods-list'>
                    <div className='image'><img src='' alt=''></img></div>
                    <div className='goods-info'>
                        <div className='title'>你说啥名字好呢</div>
                        <div className='attr'>
                            <span className='amount'>x 1</span>
                            <span>颜色：黑色</span><span>尺码：37</span>
                        </div>
                    </div>
                    <div className='price'>￥255</div>
                </div>
                <ul className='order-status'>
                    <li>支付状态</li>
                    <li>代付款</li>
                </ul>
                <div className='total-wrap'>
                    <ul className='total'>
                        <li>商品总额</li>
                        <li>￥473</li>
                    </ul>
                    <ul className='total'>
                        <li>+运费</li>
                        <li>￥20</li>
                    </ul>
                </div>
                <div className='true-total'>
                    <div className='total'>实付金额：<span>11111</span></div>
                    <div className='order-time'>下单时间：xxxx-xx-xx</div>
                </div>
            </div>
        </div>
    )
}

export default OrderDatail
