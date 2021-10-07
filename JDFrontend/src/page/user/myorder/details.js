import React , {useState , useEffect} from 'react'
import {useDispatch , useSelector} from 'react-redux'
import Subheader from '../../../components/header/subheader'
import {safeAuth , setScrollTop , localParam , lazyImg} from '../../../assets/js/utils/utils'
import config from '../../../assets/js/conf/config'
import {request} from '../../../assets/js/libs/request'
import _ from 'lodash'
import '../../../assets/css/common/user/myorder/details.css'

const OrderDatail = (props) => {
    let ordernum = localParam(props.location.search).search.ordernum
    const [name ,setName] = useState('')
    const [cellphone , setCellphone] = useState('')
    const [status , setStatus] = useState('')
    const [province , setProvince] = useState('')
    const [city , setCity] = useState('')
    const [area , setArea] = useState('')
    const [address , setAddress] = useState('')
    const [freight , setFreight] = useState(0)
    const [total , setTotal] = useState(0)
    const [trueTotal , setTrueTotal] = useState(0)
    const [orderTime , setOrderTime] = useState('')
    const [goods , setGoods] = useState([])
    const {uid ,  authToken} = useSelector(state => state.loginRedux)
    const dispatch = useDispatch(null)
    useEffect(() => {
        let isUnmounted = false;
        safeAuth(uid , authToken , props , dispatch)
        setScrollTop(0)
        const getData = async() => {
            let url = config.baseUrl + '/api/user/myorder/desc?uid=' + uid + '&ordernum=' + ordernum + '&token=' + config.token
            const res = await request(url)
            if(res.code === 200 && !isUnmounted){
                setName(_.get(res , ['data' , 'name'] , ''))
                setCellphone(_.get(res , ['data' , 'cellphone'] , ''))
                setStatus(_.get(res , ['data' , 'status'] , ''))
                setProvince(_.get(res , ['data' , 'province'] , ''))
                setCity(_.get(res , ['data' , 'city'] , ''))
                setArea(_.get(res , ['data' , 'area'] , ''))
                setAddress(_.get(res , ['data' , 'address'] , ''))
                setFreight(_.get(res , ['data' , 'freight'] , 0))
                setTotal(_.get(res , ['data' , 'total'] , 0))
                setTrueTotal(_.get(res , ['data' , 'truetotal'] , 0))
                setOrderTime(_.get(res , ['data' , 'ordertime'] , ''))
                setGoods(_.get(res , ['data' , 'goods'] , []))
            }
        }
        getData();
        return () => {
            isUnmounted = true;
        }
    } , [])// eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        lazyImg();
    } , [goods])
    //点击商品跳转到商品详情页
    const pushPage = (url) => {
        props.history.push(config.path + url)
    }
    return (
        <div className='detail-page'>
            <Subheader title='订单详情'></Subheader>
            <div className='detail-main'>
                <div className='ordernum'>订单编号:{ordernum}</div>
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
                        <div className='name'><img src={require('../../../assets/images/common/my2.png').default} alt=''></img>{name}</div>
                        <div className='cellphone'><img src={require('../../../assets/images/common/cellphone.png').default} alt=''></img>{cellphone}</div>
                        <div className='address'>{`${province}${city}${area}${address}`}</div>
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
                {
                    goods.length > 0 ? 
                    goods.map((item , index) => {
                        return (
                            <div className='goods-list' key={index} onClick={pushPage.bind(null , 'goods/details/item?gid='+item.gid)}>
                                <div className='image'><img data-echo={item.image} alt={item.title} src={require('../../../assets/images/common/lazyImg.jpg').default}></img></div>
                                <div className='goods-info'>
                                    <div className='title'>{item.title}</div>
                                    <div className='attr'>
                                        <span className='amount'>x {item.amount}</span>
                                        {
                                            item.param.length > 0 ?
                                            item.param.map((_item , _index) => {
                                                return(
                                                    <span key={_index}>{_item.title}：{
                                                        _item.param.length > 0 ? 
                                                        _item.param.map((__item , __index) => {
                                                            return(
                                                                <React.Fragment key={__index}>
                                                                    {__item.title}
                                                                </React.Fragment>
                                                            )
                                                        }):''
                                                    }</span>
                                                )
                                            }) : ''
                                        }
                                    </div>
                                </div>
                                <div className='price'>￥{item.price}</div>
                            </div>
                        )
                    }) : ''
                }
                <ul className='order-status'>
                    <li>支付状态</li>
                    <li>{status === '0' ? '代付款' : (status === '1' ? '待收货' : (status === '2' ? '已收货' : 0))}</li>
                </ul>
                <div className='total-wrap'>
                    <ul className='total'>
                        <li>商品总额</li>
                        <li>￥{total}</li>
                    </ul>
                    <ul className='total'>
                        <li>+运费</li>
                        <li>￥{freight}</li>
                    </ul>
                </div>
                <div className='true-total'>
                    <div className='total'>实付金额：<span>{trueTotal}</span></div>
                    <div className='order-time'>下单时间：{orderTime}</div>
                </div>
            </div>
        </div>
    )
}

export default OrderDatail
