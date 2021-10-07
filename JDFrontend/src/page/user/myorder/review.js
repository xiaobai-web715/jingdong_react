import React , {useEffect , useState} from 'react'
import {useSelector} from 'react-redux'
import _ from 'lodash'
import config from '../../../assets/js/conf/config';
import UpRefresh from '../../../assets/js/libs/uprefresh';
import { lazyImg } from '../../../assets/js/utils/utils';
import {request} from '../../../assets/js/libs/request'
import '../../../assets/css/common/user/myorder/review.css'

const ReviewPage = (props) => {
    const [data , setData] = useState([])
    const {uid} = useSelector(state => state.loginRedux)
    useEffect(() => {
        let obj = {
            isUnmounted : false
        }
        const getData = async() => {
            let sUrl = config.baseUrl + '/api/user/myorder/reviewOrder?uid='+uid+'&page=1&token='+config.token
            let res = await request(sUrl)
            if(!obj.isUnmounted && res.code === 200){
                setData(_.get(res , ['data'] , []))
                let maxPage = _.get(res , ['pageinfo','pagenum'],0);
                getReviews(maxPage , obj)
            }else{
                setData([])
            }
        }
        getData()
        return () => {
            obj.isUnmounted = true
        }
    } , [])// eslint-disable-line react-hooks/exhaustive-deps
    //分页方法
    let curPage = 1,
        offsetBottom = 100;
    const getReviews = (maxPage , choose) =>{
        new UpRefresh({"curPage" : curPage , 'maxPage' : maxPage  , 'offsetBottom' : offsetBottom} , curPage => {
            const dataScorllPage = async() =>{
                try{
                    //这里用字面量模板``好像不能请求,只能写成''加引号好的字符串形式
                    const res = await request(config.baseUrl + '/api/user/myorder/reviewOrder'+ uid +'&token='+config.token+'&page=' + curPage);
                    //用扩展运算符进行浅拷贝来修改状态(写成这样的箭头函数形式的,并且返回一个我们需要的值,不会触发React Hook useEffect has missing dependencies:data这个警告,这里如果添加一个data依赖的话,会出现问题)
                    if(!choose.isUnmounted){
                        if(res.code === 200){
                            console.log(res.data)
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
    //图片懒加载
    useEffect(() => {
        lazyImg()
    } , [data])
    //点击商品跳转到商品详情页
    const pushPage = (url) => {
        props.history.push(config.path + url)
    }
    return (
        <>
            {
                data.length > 0 ? 
                data.map((item , index) => {
                    return(
                        <div className='order-list' key={index}>
                            <div className='ordernum-wrap'>
                                <div className='ordernum'>订单编号:{item.ordernum}</div>
                                <div className='status'>{item.status === '0' ? '待付款' : (item.status === '1' ? '待收货' : '已收货')}</div>
                            </div>
                            {
                                item.goods.length > 0 ?
                                item.goods.map((_item , _index) => {
                                    return(
                                        <div className='item-list2' key={_index}  onClick={pushPage.bind(null , 'goods/details/item?gid='+_item.gid)}>
                                            <div className='image'><img src = {require('../../../assets/images/common/lazyImg.jpg').default} alt ={_item.title} data-echo={_item.image}></img></div>
                                            <div className='title'>{_item.title}</div>
                                            <div className='amount'>x{_item.amount}</div>
                                            {/* 这里需要注意冒泡事件的影响 */}
                                            <div className='status-btn' onClick={(e) => {pushPage('order/add_review?gid=' + _item.gid + '&ordernum=' + item.ordernum) ; e.stopPropagation()}}>{_item.isreview === '0' ? '评价' : '追加评价'}</div>
                                        </div>
                                    )
                                }):''
                            }
                            <div className='total-wrap'>
                                <div className='total'>实付金额:￥{item.total}</div>
                            </div>
                        </div>
                    )
                }):''
            }
            <button  onClick={(e) => {pushPage('order/add_review') ; e.stopPropagation()}}>评价</button>
        </>
    )
}

export default ReviewPage
