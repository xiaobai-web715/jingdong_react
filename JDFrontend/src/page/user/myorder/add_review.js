import React , {useEffect} from 'react'
import {useSelector , useDispatch} from  'react-redux'
import { safeAuth } from '../../../assets/js/utils/utils'
import Subheader from '../../../components/header/subheader'
import '../../../assets/css/common/user/myorder/add_review.css'

const AddReview = (props) => {
    const dispatch = useDispatch(null)
    const {uid , authToken} = useSelector(state => state.loginRedux)
    useEffect(() => {
        safeAuth(uid , authToken , props , dispatch)
    } , [])// eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div className='addReview_page'>
            <Subheader title='评价'></Subheader>
            <div className='main'>
                <ul className='service'>
                    <li>整体</li>
                    <li>
                        <div className='stars active'></div>
                        <div className='stars'></div>
                        <div className='stars'></div>
                        <div className='stars'></div>
                        <div className='stars'></div>
                    </li>
                </ul>
                <ul className='service'>
                    <li>服务</li>
                    <li>
                        <div className='stars active'></div>
                        <div className='stars'></div>
                        <div className='stars'></div>
                        <div className='stars'></div>
                        <div className='stars'></div>
                    </li>
                </ul>
                <div className='content-wrap'>
                    <textarea placeholder='来分享你的消费感受吧！'></textarea>
                </div>
                <input type='submit' className='submit'></input>
            </div>
        </div>
    )
}

export default AddReview
