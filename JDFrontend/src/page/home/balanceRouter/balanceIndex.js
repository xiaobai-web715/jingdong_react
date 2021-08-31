import React from 'react'
import {useSelector , useDispatch} from 'react-redux'
import Subheader from '../../../components/header/subheader'
import { safeAuth } from '../../../assets/js/utils/utils'
import config from '../../../assets/js/conf/config'
import '../../../assets/css/common/balance/index.css'
import _ from 'lodash'

const BalanceIndex = (props) => {
    const {aCartData , total , freight} = useSelector(state => state.cartRedux)
    const {uid , authToken : auth_token} = useSelector(state => state.loginRedux)
    const dispatch = useDispatch();
    //确认订单页面也是需要登录之后才可以看到
    //所以也需要会员安全认证(但是这里用户体验会有点差,因为会页面闪一下,所以这就要使用自己写的路由组件AuthRoute,可以通过判断来选择是否加载该组件,这样就不会产生闪抖的页面了,不够这是对路由进行操作,详情请看router.js文件)
    safeAuth(uid , auth_token , props , dispatch)
    const pushPage = (url) => {
        props.history.push(config.path + url)
    } 
    return (
        <div className='balance-page'>
            <Subheader title='确认订单'></Subheader>
            <div className='main'>
                {/* 地址区域 */}
                <div className='address-wrap' onClick={pushPage.bind(null , 'address/index')}>
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
                    {
                        aCartData.length > 0 ? 
                        aCartData.map((item , index) => {
                            return(
                            item.checked?
                                <div className='goods-list' key={index}>
                                    <div className='image'>
                                        <img src={item.img} alt={item.title}></img>
                                    </div>
                                    <div className='goods-param'>
                                        <div className='title'>{item.title}</div>
                                        <div className='attr'>
                                            {/* <span>颜色:蓝色</span><span>尺码:36</span> */}
                                            {
                                                item.attrs.length > 0?
                                                item.attrs.map((itmeAttr , indexAttr) => {
                                                    return(
                                                        <span key={indexAttr}>{itmeAttr.title}:{_.get(itmeAttr.param[0] , 'title')}</span>
                                                    )
                                                }):''
                                            }
                                        </div>
                                        <div className='amount'>X{item.amount}</div>
                                        <div className='price'>￥{item.price}</div>
                                    </div>
                                </div>:''
                            )
                        }):''
                    }
                </div>
                {/* 总价区域 */}
                <ul className='total-wrap'>
                    <li>商品总额</li>
                    <li>￥{total}</li>
                </ul>
                <ul className='total-wrap'>
                    <li>运费</li>
                    <li>￥{freight}</li>
                </ul>
            </div>
            {/* 固定定位一个结算DOM */}
            <div className='balance-wrap'>
                <div className='price-wrap'>
                    <span>实际金额:</span><span>￥{parseFloat(Math.round(total + freight).toFixed(2))}</span>
                </div>
                <div className='balance-btn'>提交订单</div>
            </div>
        </div>
    )
}

export default BalanceIndex
