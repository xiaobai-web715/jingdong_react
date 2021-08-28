import React from 'react'
import {Route , Redirect} from 'react-router-dom'
import config from '../assets/js/conf/config'

// component : Component(component就是父组件中传过来的props里面的值,然后这个值它是一个组件形式的,所以赋值给了以开头字母大写的变量)
export function AuthRoute({component : Component , ...rest}){
    return (
        // 这里用的是Route的另一种加载组件的方式,render方法,里面是一个箭头函数的形式,返回的就是一个组件,在这个函数里面如果我点击我的之后,匹配到localStorage里面是登录中,就会加载Component组件,否则路由重定向到//login/index这个路由
        //不过目前让我疑惑的是这个...rest是用来干嘛的,以及这个props从哪里传过来的
        <Route {...rest} render ={props =>
            Boolean(localStorage['isLogin'])?(
                <Component {...props}/>
            ):(
                <Redirect to={{
                    pathname : config.path + 'login/index',
                    state : {from : props.location}
                }}
                />
            )
        }/>
    )
} 
