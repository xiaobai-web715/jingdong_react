import React , {lazy , Suspense , useEffect , useState} from 'react'
import {Route , Switch} from 'react-router-dom'
import Subheader from '../../../components/header/subheader'
import Tags from '../../../components/tags/tags'
import config from '../../../assets/js/conf/config'
import {localParam} from '../../../assets/js/utils/utils'
import '../../../assets/css/common/user/myorder/index.css'
const OrderPage = lazy(() => import('./order'))
const ReviewPage = lazy(() => import('./review'))

const MyOrderIndex = (props) => {
    const [status , setStatus] = useState('')
    const [title , setTitle] = useState('')
    useEffect(() => {
        let isUnmounted = false;
        if(!isUnmounted){
            setStatus(localParam(props.location.search).search.status)
        }
        return () => {
            isUnmounted = true;
        }
    } , [props])// eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        let isUnmounted = false;
        if(!isUnmounted){
            getTitle(localParam(props.location.search).search.status)
        }
        return () => {
            isUnmounted = true;
        }
    } , [status])// eslint-disable-line react-hooks/exhaustive-deps
    const getTitle = target =>{
        if(target === 'all'){
            setTitle('全部订单')
        }else if(target === '0'){
            setTitle('待付款')
        }else if(target === '1'){
            setTitle('待收货')
        }
        else if(target === '2'){
            setTitle('待评价')
        }
    }
    return (
        <div className='order-page'>
           <Subheader title={title}></Subheader> 
           <Tags></Tags>
           <div className='order-main'>
               <Suspense fallback={<></>}>
                    <Switch>
                        <Route path={config.path + 'myorder/order'} component={OrderPage}></Route>
                        <Route path={config.path + 'myorder/review'} component={ReviewPage}></Route>
                    </Switch>
               </Suspense>
           </div>
        </div>
    )
}

export default MyOrderIndex
