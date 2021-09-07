import React , {useEffect , useState} from 'react'
import {useDispatch , useSelector} from 'react-redux'
import Subheader from '../../../components/header/subheader'
import config from '../../../assets/js/conf/config'
import { safeAuth } from '../../../assets/js/utils/utils'
import {request} from '../../../assets/js/libs/request'
import _ from 'lodash'
import '../../../assets/css/common/balance/end.css'

const EndIndex = (props) => {
    const {uid , authToken : auth_token} = useSelector(state => state.loginRedux)
    const dispatch = useDispatch()
    safeAuth(uid , auth_token , props , dispatch)
    const [orderNum , setOrderNum] = useState('')
    //获取订单编号
    const getOrderNum = async(obj) => {
        let sUrl = config.baseUrl  + '/api/order/lastordernum?uid=' + uid + '&token=' + config.token;
        let res = await request(sUrl)
        if(res.code === 200 && !obj.isUnmounted){
            setOrderNum(_.get(res , ['data' , 'ordernum'] , ''))
        }
    }
    useEffect(() => {
        let obj = {isUnmounted : false};
        getOrderNum(obj)
        return () => {
            obj.isUnmounted = true;
        }
    } , [])// eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div className='balance_end-page'>
            <Subheader title='订单结束'></Subheader>
            <div className='main'>
                <div className='list success'>订购成功！</div>
                <div className='list ordernum'>订单编号 : {orderNum}</div>
                <div className='list'>查看订单</div>
                <div className='pay-btn'>去付款</div>
            </div>
        </div>
    )
}

export default EndIndex;
