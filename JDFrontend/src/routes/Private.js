import React from 'react'
import {Route , Redirect} from 'react-router-dom'

// component : Component（这里就是传进来的组件）这里也是解构赋值到另一个名字里面的方法，是吧compnent的值给了Component
export function AuthRoute({component : Component , ...rest}){
    console.log('...rest' , rest)
    // ...rest视频上说的是路由里面的path
    return (
        <Route {...rest} render ={props =>
            Boolean(localStorage['isLogin'])?(
                //这里这一步就是传给子组件一个props，这个props里面的内容就是{...props}
                <Component {...props}/>
            ):(
                <Redirect to={{
                    pathname : '/login',
                    state : {from : props.location}
                }}
                />
            )
        }/>
    )
} 
