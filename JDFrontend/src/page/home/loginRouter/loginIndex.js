import React from 'react'
import config from '../../../assets/js/conf/config'

const LoginIndex = (props) => {
    const pushPage =(url) => {
        props.history.push(config.path + url)
    }
    return (
        <div>
            会员登录页面<br/>
            <span onClick={pushPage.bind(null , 'reg/index')}>会员注册</span>
        </div>
    )
}

export default LoginIndex
