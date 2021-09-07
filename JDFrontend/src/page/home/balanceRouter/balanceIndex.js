import React , {useState , useEffect} from 'react'
import {useSelector , useDispatch} from 'react-redux'
import Subheader from '../../../components/header/subheader'
import { safeAuth } from '../../../assets/js/utils/utils'
import config from '../../../assets/js/conf/config'
import { request } from '../../../assets/js/libs/request'
import { Toast } from 'antd-mobile'
import '../../../assets/css/common/balance/index.css'
import _ from 'lodash'

const BalanceIndex = (props) => {
    //定义几个状态来存储收货人、手机号等信息
    const [sName , setSName] = useState('')
    const [sCellphone , setSCellphone] = useState('')
    const [sProvince , setSProvince] = useState('')
    const [sCity , setSCity] = useState('')
    const [sArea , setSArea] = useState('')
    const [sAddress , setSAddress] = useState('')
    const {aCartData , total , freight} = useSelector(state => state.cartRedux)
    const {uid , authToken : auth_token} = useSelector(state => state.loginRedux)
    const dispatch = useDispatch();
    //确认订单页面也是需要登录之后才可以看到
    //所以也需要会员安全认证(但是这里用户体验会有点差,因为会页面闪一下,所以这就要使用自己写的路由组件AuthRoute,可以通过判断来选择是否加载该组件,这样就不会产生闪抖的页面了,不够这是对路由进行操作,详情请看router.js文件)
    safeAuth(uid , auth_token , props , dispatch)
    const replacePage = (url) => {
        //这样上一个历史url就一直是购物车界面的url,这里用作push的话就是你再次点击选择收货地址,还是会push进去一个历史url,这样就会导致重复的url被当做历史,表现出来的情况就是我点击返回还是在这个页面待着
        props.history.replace(config.path + url)
    } 
    useEffect(() => {
        let obj = {isUnmounted : false};
        if(sessionStorage['addressId'] !== undefined){
            getAddress(obj);
        }else{
            getDefaultAddress(obj);
        }
        return () => {
            obj.isUnmounted = true;
        }
    } , [])// eslint-disable-line react-hooks/exhaustive-deps
    //获取收货地址
    const getAddress = async(obj) => {
            let sUrl = config.baseUrl + '/api/user/address/info?uid=' + uid + '&aid=' + sessionStorage['addressId'] + '&token='+config.token
            let res = await request(sUrl);
            if(res.code === 200 && !obj.isUnmounted){
                setSName(_.get(res , ['data' , 'name']))
                setSAddress(_.get(res , ['data' , 'address']))
                setSCellphone(_.get(res , ['data' , 'cellphone']))
                setSProvince(_.get(res , ['data' , 'province']))
                setSCity(_.get(res , ['data' , 'city']))
                setSArea(_.get(res , ['data' , 'area']))
            }
    }
    //获取默认收货地址
    const getDefaultAddress = async(obj) => {
        let sUrl = config.baseUrl + '/api/user/address/defaultAddress?uid=' + uid + '&token=' + config.token;
        let res = await request(sUrl);
        if(res.code === 200&&!obj.isUnmounted){
            //这里加了localStorage所以就要在退出登录的时候去掉这个缓存
            localStorage['addressId'] = res.data.aid;
            setSName(_.get(res , ['data' , 'name']))
            setSAddress(_.get(res , ['data' , 'address']))
            setSCellphone(_.get(res , ['data' , 'cellphone']))
            setSProvince(_.get(res , ['data' , 'province']))
            setSCity(_.get(res , ['data' , 'city']))
            setSArea(_.get(res , ['data' , 'area']))
        }
    }
    //定义一个变量用来防止多次提交的操作
    let bSubmit = true;
    //提交收货地址
    const submitOrder = async() => {
        let sAddressId = sessionStorage['addressId'] || localStorage['addressId']
        if(sAddressId !== undefined){
            if(total > 0){
                if(bSubmit){
                    bSubmit = false;
                    let sUrl = config.baseUrl + '/api/order/add?token=' + config.token;
                    let jData = {
                        uid,
                        freight,
                        addsid : sAddressId,
                        goodsData : JSON.stringify(aCartData)
                    }
                    let res = await request(sUrl , 'post' , jData)
                    if(res.code === 200){
                        Toast.info('提交成功' , 2 , () => {
                            props.history.push(config.path + 'balance/end')
                        })
                        // setTimeout(props.history.push.bind(null , config.path + 'balance/end') , 2100)
                    }
                }
            }else{
                Toast.info('您还没有选择商品' , 2)
            }
        }else{
            Toast.info('请选择收货地址' , 2)
        }
    }
    return (
        <div className='balance-page'>
            <Subheader title='确认订单'></Subheader>
            <div className='main'>
                {/* 地址区域 */}
                <div className='address-wrap' onClick={replacePage.bind(null , 'address/index')}>
                    {
                        sessionStorage['addressId'] !== undefined || localStorage['addressId'] !== undefined ? 
                        <>
                            <div className='persion-info'>
                            <span>收货人:{sName}</span><span>手机号:{sCellphone}</span>
                            </div>
                            <div className='address'>
                                <img src={require('../../../assets/images/home/cart/map.png').default} alt='收货地址'></img>
                                <span>{sProvince}{sCity}{sArea}{sAddress}</span>
                            </div>
                        </>:<div className='address-null'>您的收货地址为空,请选择收货地址</div>
                        // 上面这行添加的代码是每次我安全退出之后,会清掉sessionStorage里面的缓存,这就导致我在初始挂载的时候请求收货地址的操作无法返回数据,所以下面这行DOM就是用来提示,但我个人觉得每次进来的数据就是应该是你的默认收货地址
                    }
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
                <div className='balance-btn' onClick={submitOrder}>提交订单</div>
            </div>
        </div>
    )
}

export default BalanceIndex
