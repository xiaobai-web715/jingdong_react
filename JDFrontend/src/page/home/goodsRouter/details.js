import React , {lazy , useState , useEffect} from 'react'
import {Route , Switch , Redirect} from 'react-router-dom'
import { localParam } from '../../../assets/js/utils/utils'
import config from '../../../assets/js/conf/config'
import '../../../assets/css/common/goods/details.css'
import _ from 'lodash'

//路由懒加载
const DetailsItem = lazy(() => import('./details_item'))
const DetailsContent = lazy(() => import('./details_content'))
const DetailsReviews = lazy(() => import('./details_reviews'))

const Details = (props) => {
    //定义一个状态来接收id
    const [gid , setGid] = useState('');
    //定义一个状态来管理导航的样式
    const [tabStyle , setTabStyle] = useState({bItem : true , bContent : false , bReviews : false})
    useEffect(() => {
        if(props.location.search !== ''){
            let targetGId = localParam(props.location.search);
            setGid(_.get(targetGId , ['search' , 'gid'] , ''));
        }
        // console.log('props.location.pathname' , props.location.pathname)
        //设置路由切换样式(这就相当于在组件挂载和状态值props变化时都起作用了)
        switch(props.location.pathname){
            case config.path+'goods/details/item':
                setTabStyle({bContent : false , bReviews : false , bItem : true});
                break;
            case config.path+'goods/details/content':
                setTabStyle({bReviews : false , bItem : false , bContent : true});
                break;
            case config.path+'goods/details/reviews':
                setTabStyle({bItem : false , bContent : false , bReviews : true});
                break;
            default:
                setTabStyle({bContent : false , bReviews : false , bItem : true});
                break;
        }
    },[props])
    const goBack = () => {
        props.history.goBack();
    }
    //路由跳转
    const replacePage = (url) =>{
        props.history.replace(config.path + url);
    }
    //点击购物车跳转到购物车界面
    const pushPage = (url) =>{
        props.history.push(config.path + url);
    }
    return (
        <div>
            <div className='details-header'>
                <div className='details-back' onClick={goBack.bind(null)}></div>
                <div className='tab-wrap'>
                    <div className={tabStyle.bItem?'tab-name active':'tab-name'} onClick={replacePage.bind(null , 'goods/details/item?gid=' + gid)}>商品</div>
                    <div className={tabStyle.bContent?'tab-name active':'tab-name'} onClick={replacePage.bind(null , 'goods/details/content?gid=' + gid)}>详情</div>
                    <div className={tabStyle.bReviews?'tab-name active':'tab-name'} onClick={replacePage.bind(null , 'goods/details/reviews?gid=' + gid)}>评价</div>
                </div>
                {/* 这里不知道该如何通过route进行传值 */}
                <div className='cart-icon' id='cart-icon' onClick={pushPage.bind(null , 'jd/cart')}>
                    <div className='spot'></div>
                </div>
            </div>
            <div className='sub-page'>
                <Switch>
                    <Route path={config.path + 'goods/details/item' } component={DetailsItem}></Route>
                    <Route path={config.path + 'goods/details/content' } component={DetailsContent}></Route>
                    <Route path={config.path + 'goods/details/reviews' } component={DetailsReviews}></Route>
                    {/* 路由重定向 , 初始构建的时候用了一下 */}
                    <Redirect to={config.path + 'goods/details/item' }></Redirect>
                </Switch>
            </div>
        </div>
    )
}

export default Details
