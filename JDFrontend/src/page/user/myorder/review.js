import React from 'react'
import '../../../assets/css/common/user/myorder/review.css'

const ReviewPage = () => {
    return (
        <>
            <div className='order-list'>
                <div className='ordernum-wrap'>
                    <div className='ordernum'>订单编号:123123</div>
                    <div className='status'>代付款</div>
                </div>
                <div className='item-list2'>
                    <div className='image'><img src = '' alt =''></img></div>
                    <div className='title'>你说啥名字好呢</div>
                    <div className='amount'>x2</div>
                    <div className='status-btn'>评价</div>
                </div>
                <div className='item-list2'>
                    <div className='image'><img src = '' alt =''></img></div>
                    <div className='title'>你说啥名字好呢</div>
                    <div className='amount'>x2</div>
                    <div className='status-btn'>追加评价</div>
                </div>
                <div className='total-wrap'>
                    <div className='total'>实付金额:￥11</div>
                </div>
            </div>
            <div className='order-list'>
                <div className='ordernum-wrap'>
                    <div className='ordernum'>订单编号:123123</div>
                    <div className='status'>代付款</div>
                </div>
                <div className='item-list2'>
                    <div className='image'><img src = '' alt =''></img></div>
                    <div className='title'>你说啥名字好呢</div>
                    <div className='amount'>x2</div>
                    <div className='status-btn'>评价</div>
                </div>
                <div className='item-list2'>
                    <div className='image'><img src = '' alt =''></img></div>
                    <div className='title'>你说啥名字好呢</div>
                    <div className='amount'>x2</div>
                    <div className='status-btn'>追加评价</div>
                </div>
                <div className='total-wrap'>
                    <div className='total'>实付金额:￥11</div>
                </div>
            </div>
        </>
    )
}

export default ReviewPage
