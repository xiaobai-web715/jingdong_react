import React , {useEffect , useState} from 'react'
import {useDispatch , useSelector} from 'react-redux'
import config from '../../../assets/js/conf/config'
import {safeAuth , localParam , lazyImg} from '../../../assets/js/utils/utils'
import UpRefresh from '../../../assets/js/libs/uprefresh'
import {request} from '../../../assets/js/libs/request'
import { Modal , Toast} from 'antd-mobile'
import _ from 'lodash'
import '../../../assets/css/common/user/myorder/order.css'

const OrderPage = (props) => {
    const [data , setData] = useState([])
    const dispatch = useDispatch(null)
    const {uid} = useSelector(state => state.loginRedux)
    const getData = async(choose , status) => {
        let url = config.baseUrl + '/api/user/myorder/index?uid='+ uid +'&status='+ status +'&token='+config.token+'&page=1'
        let res = await request(url)
        if(!choose.isUnmounted){
            if(res.code === 200){
                setData(_.get(res , ['data'] , []))
                let maxPage = _.get(res , ['pageinfo','pagenum'],0);
                getReviews(maxPage , status , choose);
            }else{
                setData([])
            }
        }
    }
    useEffect(() => {
        safeAuth(localStorage.getItem('uid') , localStorage.getItem('authToken') , props , dispatch)
        let obj = {
            isUnmounted : false
        },
        statu = localParam(props.location.search).search.status;
        getData(obj , statu)
        return () => {
            obj.isUnmounted = true
        }
        //下面的这个数组里面不写props，也就是不监听props刷新组件,这样会请求很多次的接口,导致性能问题。但是我要实现点击导航实现组件变化，这里可以添加一个路由中转站，这样这里的这个页面点击导航之后相当于先加载别的页面之后再加载该页面，这样就只会做一次请求，性能更好。
    } , [])// eslint-disable-line react-hooks/exhaustive-deps
    //分页方法
    let curPage = 1,
        offsetBottom = 100;
    const getReviews = (maxPage , status , choose) =>{
        new UpRefresh({"curPage" : curPage , 'maxPage' : maxPage  , 'offsetBottom' : offsetBottom} , curPage => {
            const dataScorllPage = async() =>{
                try{
                    //这里用字面量模板``好像不能请求,只能写成''加引号好的字符串形式
                    const res = await request(config.baseUrl + '/api/user/myorder/index?uid='+ uid +'&status='+ status +'&token='+config.token+'&page=' + curPage);
                    //用扩展运算符进行浅拷贝来修改状态(写成这样的箭头函数形式的,并且返回一个我们需要的值,不会触发React Hook useEffect has missing dependencies:data这个警告,这里如果添加一个data依赖的话,会出现问题)
                    if(!choose.isUnmounted){
                        if(res.code === 200){
                            setData(aReviews => [...aReviews ,  ...(_.get(res , ['data'] , []))]);
                        }else{
                            setData([]); 
                        }
                    }
                }catch(err){
                    console.log('请求更多订单数据出错' , err);
                }
            }
            dataScorllPage();
        })
    }
    useEffect(() => {
        lazyImg()
    } , [data])
    //取消订单
    const cancelOrder = (orderNum , index) => {
        Modal.alert('', '确认要取消订单吗?', [
            { text: '取消', onPress: () => {}, style: 'default' },
            { text: '确认', onPress: () => {
                //取消订单操作
                let sUrl = config.baseUrl + '/api/user/myorder/clearorder?uid='+uid+'&ordernum='+orderNum+'&token='+config.token;
                request(sUrl).then(res =>{
                    if(res.code === 200){
                        let copyData = data;
                        copyData.splice(index , 1);
                        setData([...copyData])
                    }
                    Toast.info(res.data , 2)
                })
            }},
        ]);
    }
    //确认收货
    const firmOrder = (orderNum , index) => {
        let sUrl = config.baseUrl + '/api/user/myorder/finalorder?uid='+uid+'&ordernum='+orderNum+'&token='+config.token;
        request(sUrl).then(res =>{
            if(res.code === 200){
                let copyData = data;
                copyData[index].status = '2'
                setData([...copyData])
            }
            Toast.info(res.data , 2)
        })
    }
    //点击跳转页面
    const pushPage = url => {
        props.history.push(config.path + url)
    }
    return (
        <>
        {
            data.length > 0 ? 
            data.map((item , index) => {
                return(
                    <div className='order-list' key={index} onClick={pushPage.bind(null , 'order/detail?ordernum=' + item.ordernum)}>
                        <div className='ordernum-wrap'>
                            <div className='ordernum'>订单编号:{item.ordernum}</div>
                            <div className='status'>{item.status === '0' ? '待付款' : (item.status === '1' ? '待收货' : '已收货')}</div>
                        </div>
                        {
                            item.goods.length > 0 ?
                            item.goods.map((_item , _index) => {
                                return(
                                    <div className='item-list' key={_index}>
                                        <div className='image'><img src = {require('../../../assets/images/common/lazyImg.jpg').default} alt ={_item.title} data-echo={_item.image}></img></div>
                                        <div className='title'>{_item.title}</div>
                                        <div className='amount'>x{_item.amount}</div>
                                    </div>
                                )
                            }):''
                        }
                        <div className='total-wrap'>
                            <div className='total'>实付金额:￥{item.total}</div>
                            {
                                item.status !== '2'?(
                                    <div className='status-btn' onClick={item.status === '0' ? (e)=>{cancelOrder(item.ordernum , index) ; e.stopPropagation()} : (e)=>{firmOrder(item.ordernum , index) ; e.stopPropagation()}}>{item.status === '0' ? '取消订单' : '确认收货'}</div>
                                ):''
                            }
                        </div>
                    </div>
                )
            }) : ''
        }
        </>
    )
}

export default OrderPage
