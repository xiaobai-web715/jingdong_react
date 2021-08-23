import React from 'react'
import {withRouter} from 'react-router'
import './subheader.css'

const Subheader = (props) => {
    //子组件的路由不支持,指的到底是啥?是不是通过路由跳转之类的组件吗
    const GoBack = () => {
        console.log(props)
        props.history.goBack();
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
