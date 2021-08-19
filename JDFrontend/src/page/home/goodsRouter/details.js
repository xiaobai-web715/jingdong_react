import React , {lazy} from 'react'
import {Route , Switch , Redirect} from 'react-router-dom'
import config from '../../../assets/js/conf/config'
import '../../../assets/css/common/goods/details.css'

//路由懒加载
const DetailsItem = lazy(() => import('./details_item'))
const DetailsContent = lazy(() => import('./details_content'))
const DetailsReviews = lazy(() => import('./details_reviews'))

const Details = (props) => {
    const goBack = () => {
        props.history.goBack();
    }
    return (
        <div>
            <div className='details-header'>
                <div className='details-back' onClick={goBack.bind(null)}></div>
                <div className='tab-wrap'>
                    <div className='tab-name active'>商品</div>
                    <div className='tab-name'>详情</div>
                    <div className='tab-name'>评价</div>
                </div>
                <div className='cart-icon'>
                    <div className='spot'></div>
                </div>
            </div>
            <div className='sub-page'>
                <Switch>
                    <Route path={config.path + 'goods/details/item' } component={DetailsItem}></Route>
                    <Route path={config.path + 'goods/details/content' } component={DetailsContent}></Route>
                    <Route path={config.path + 'goods/details/reviews' } component={DetailsReviews}></Route>
                    {/* 路由重定向 */}
                    <Redirect to={config.path + 'goods/details/item' }></Redirect>
                </Switch>
            </div>
        </div>
    )
}

export default Details
