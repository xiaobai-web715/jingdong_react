import React from 'react'
import {withRouter} from 'react-router'
import './subheader.css'

const Subheader = (props) => {
    //子组件的路由不支持,指的到底是啥?是不是通过路由跳转之类的组件吗
    const GoBack = () => {
        //这里所做的修改要解决的问题是:因为我的balanceIndex文件里面点击收货地址跳转路由用的是replace方法,导致我从地址界面(address/index)点击返回回到的是(购物车界面,也就是balance/index没有当历史记录存起来,所以这样就会非常的奇怪)
        // 所以这里添加一个判断条件就是,我从地址界面(address/index)点击返回跳转到到的就是(balance/index)这个路由,其余的组件使用的时候还是正常返回就可以
        if(props.location.pathname === '/address/index'){
            props.history.replace('/balance/index')
        }else{
            props.history.goBack();
        }
    }
    return (
        <div className='sub-header'>
            <div className='back' onClick={GoBack.bind(null)}></div>
            <div className='title'>{props.title}</div>
            <div className={props['right-text'] !== ''?'right-btn':'right-btn hide'}>{props['right-text']}</div>
        </div>
    )
}

export default withRouter(Subheader)
