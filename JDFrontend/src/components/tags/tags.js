import React , {useEffect , useState} from 'react'
import { withRouter } from 'react-router'
import config from '../../assets/js/conf/config'
import {localParam} from '../../assets/js/utils/utils'
import './tags.css'

const Tags = (props) => {
    const [status , setStatus] = useState('')
    useEffect(() => {
        let isUnmounted = false;
        if(!isUnmounted){
            setStatus(localParam(props.location.search).search.status)
        }
        return () => {
            isUnmounted = true;
        }
    } , [props]) // eslint-disable-line react-hooks/exhaustive-deps
    const replacePage = url => {
        props.history.replace(config.path + url)
    }
    return (
        <div className='tags-wrap'>
           <div className={status === 'all' ? 'tags active' : 'tags'} onClick={replacePage.bind(null , 'myorder/order?status=all')}>全部订单</div>
           <div className={status === '0' ? 'tags active' : 'tags'} onClick={replacePage.bind(null ,  'myorder/order?status=0')}>代付款</div>
           <div className={status === '1' ? 'tags active' : 'tags'} onClick={replacePage.bind(null ,  'myorder/order?status=1')}>代收货</div>
           <div className={status === '2' ? 'tags active' : 'tags'} onClick={replacePage.bind(null ,  'myorder/review?status=2')}>代评价</div>
        </div>
    )
}

export default withRouter(Tags)
