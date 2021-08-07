import React , {lazy} from 'react'
import {Route , Switch} from 'react-router-dom'
import '../../../assets/css/common/goods/classify.css'
import config from '../../../assets/js/conf/config'

const ItemIndex = lazy(()=>import('./Item'))

const ClassfiyIndex = (props) => {
    const GoBack = () => {
        console.log(props.history)
        props.history.goBack();
    }
    return (
        <div>
           <div className = 'classify-search-header'>
               <div className = 'back' onClick={GoBack.bind(null)}></div>
               <div className = 'search'>请输入宝贝名称</div>
            </div> 
            <div className = 'goods-main'>
                <div className='classify-wrap'>
                    <div className='classify-item active'>潮流女装</div>
                    <div className='classify-item'>潮流女装</div>
                    <div className='classify-item'>潮流女装</div>
                    <div className='classify-item'>潮流女装</div>
                    <div className='classify-item'>潮流女装</div>
                    <div className='classify-item'>潮流女装</div>
                    <div className='classify-item'>潮流女装</div>
                    <div className='classify-item'>潮流女装</div>
                    <div className='classify-item'>潮流女装</div>
                    <div className='classify-item'>潮流女装</div>
                    <div className='classify-item'>潮流女装</div>
                    <div className='classify-item'>潮流女装</div>
                    <div className='classify-item'>潮流女装</div>
                    <div className='classify-item'>潮流女装</div>
                    <div className='classify-item'>潮流女装</div>
                    <div className='classify-item'>潮流女装</div>
                    <div className='classify-item'>潮流女装</div>
                    <div className='classify-item'>潮流女装</div>
                    <div className='classify-item'>潮流女装</div>
                    <div className='classify-item'>潮流女装</div>
                    <div className='classify-item'>潮流女装</div>
                    <div className='classify-item'>潮流女装</div>
                    <div className='classify-item'>潮流女装</div>
                    <div className='classify-item'>潮流女装</div>
                    <div className='classify-item'>潮流女装</div>
                    <div className='classify-item'>潮流女装</div>
                    <div className='classify-item'>潮流女装</div>
                </div>
                <div className='goods-content'>
                    {/* 但凡涉及到路由加载组件的都要用路由懒加载 */}
                    <Switch>
                        <Route path ={config.path + 'goods/classify/items'} component={ItemIndex}></Route>
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default ClassfiyIndex
