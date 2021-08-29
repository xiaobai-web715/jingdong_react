import React from 'react'
import Subheader from '../../../components/header/subheader'
import '../../../assets/css/common/balance/index.css'

const BalanceIndex = () => {
    return (
        <div className='balance-page'>
            <Subheader title='确认订单'></Subheader>
            <div className='main'>
                {/* 地址区域 */}
                <div className='address-wrap'>
                    <div className='persion-info'>
                        <span>收货人:刘兴华</span><span>手机号:18315963987</span>
                    </div>
                    <div className='address'>
                        <img src={require('../../../assets/images/home/cart/map.png').default} alt='收货地址'></img>
                        <span>中国石油大学(北京)</span>
                    </div>
                    <div className='arrow'></div>
                    <div className='address-border-wrap'>
                        <div className='trapezoid style1'></div>
                        <div className='trapezoid style2'></div>
                        <div className='trapezoid style1'></div>
                        <div className='trapezoid style2'></div>
                        <div className='trapezoid style1'></div>
                        <div className='trapezoid style2'></div>
                        <div className='trapezoid style1'></div>
                        <div className='trapezoid style2'></div>
                        <div className='trapezoid style1'></div>
                        <div className='trapezoid style2'></div>
                    </div>
                </div>
                {/* 产品区域 */}
                <div className='goods-wrap'>
                    <div className='goods-list'>
                        <div className='image'>
                            <img src='' alt=''></img>
                        </div>
                        <div className='goods-param'>
                            <div className='title'>你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢</div>
                            <div className='attr'><span>颜色:蓝色</span><span>尺码:36</span></div>
                            <div className='amount'>X1</div>
                            <div className='price'>￥255</div>
                        </div>
                    </div>
                    <div className='goods-list'>
                        <div className='image'>
                            <img src='' alt=''></img>
                        </div>
                        <div className='goods-param'>
                            <div className='title'>你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢</div>
                            <div className='attr'><span>颜色:蓝色</span><span>尺码:36</span></div>
                            <div className='amount'>X1</div>
                            <div className='price'>￥255</div>
                        </div>
                    </div>
                    <div className='goods-list'>
                        <div className='image'>
                            <img src='' alt=''></img>
                        </div>
                        <div className='goods-param'>
                            <div className='title'>你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢</div>
                            <div className='attr'><span>颜色:蓝色</span><span>尺码:36</span></div>
                            <div className='amount'>X1</div>
                            <div className='price'>￥255</div>
                        </div>
                    </div>
                    <div className='goods-list'>
                        <div className='image'>
                            <img src='' alt=''></img>
                        </div>
                        <div className='goods-param'>
                            <div className='title'>你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢</div>
                            <div className='attr'><span>颜色:蓝色</span><span>尺码:36</span></div>
                            <div className='amount'>X1</div>
                            <div className='price'>￥255</div>
                        </div>
                    </div>
                    <div className='goods-list'>
                        <div className='image'>
                            <img src='' alt=''></img>
                        </div>
                        <div className='goods-param'>
                            <div className='title'>你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢</div>
                            <div className='attr'><span>颜色:蓝色</span><span>尺码:36</span></div>
                            <div className='amount'>X1</div>
                            <div className='price'>￥255</div>
                        </div>
                    </div>
                    <div className='goods-list'>
                        <div className='image'>
                            <img src='' alt=''></img>
                        </div>
                        <div className='goods-param'>
                            <div className='title'>你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢</div>
                            <div className='attr'><span>颜色:蓝色</span><span>尺码:36</span></div>
                            <div className='amount'>X1</div>
                            <div className='price'>￥255</div>
                        </div>
                    </div>
                </div>
                {/* 总价区域 */}
                <ul className='total-wrap'>
                    <li>商品总额</li>
                    <li>￥255</li>
                </ul>
                <ul className='total-wrap'>
                    <li>运费</li>
                    <li>￥25</li>
                </ul>
            </div>
            {/* 固定定位一个结算DOM */}
            <div className='balance-wrap'>
                <div className='price-wrap'>
                    <span>实际金额:</span><span>￥255555</span>
                </div>
                <div className='balance-btn'>提交订单</div>
            </div>
        </div>
    )
}

export default BalanceIndex
