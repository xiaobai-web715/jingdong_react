import React from 'react'
import { safeAuth } from '../../../assets/js/utils/utils';
import { request } from '../../../assets/js/libs/request';
import {useSelector , useDispatch} from 'react-redux'
import config from '../../../assets/js/conf/config'
import { setOutLogin } from '../../../actions/outLoginAction';
import { setClearCart } from '../../../actions/clearCartAction';

const UserRouter = (props) => {
    //在这里我们要实现一个需求只有在登录的时候才能看到我的这个界面,不登录的时候点击我的直接跳转到登录页面(这个是对路由那里进行操作,可以转到jdIndex文件看一下)
    const {nickname , uid , authToken : auth_token} = useSelector(state => state.loginRedux)
    const dispatch = useDispatch();
    // 接下来就是实现单点登录的相关操作(下面视频中的讲解是要在虚拟DOM加载之前来实现这个请求来判断是否有权限访问)这里就用到了auth_token,这个只允许一个地方进行登录操作,也就是只有一个页面能有权限访问,后登录的会把前面登录的给挤掉
    //目前我感觉这个单点登录(就是实现了安全验证的要求,只要是localStorage里面存储的auth_token这个值不满足你最新的auth_token的值,请求后端的接口返回来的就不是200状态),你在新的浏览器登录时肯定会产生一个新的auth_token,原来的那个页面刷新之后就会导致auth_token不匹配而导致下面的if语句的里面的操作会执行(不过前提是刷新一下,因为做到实时退出的话就是另一个操作技术了)
    //这里的安全验证问题会在很多地方用到,所以这里可以做一个公用的封装函数
    safeAuth(uid , auth_token , props , dispatch)
    // let sUrl = config.baseUrl + '/api/home/user/safe?token=' + config.token;
    // try{
    //     request(sUrl , 'post' , {uid , auth_token}).then(res => {
    //         console.log('res' , res)
    //         if(res.code !== 200){
    //             //这里只要没访问权限,就会触发这个redux将localStorage里面的数据状态清空
    //             dispatch(setOutLogin())
    //             //直接将页面跳转到登录页面
    //             props.history.replace(config.path + 'login/index')
    //         }
    //     })
    // }catch(err){
    //     console.log('err' , err)
    // }
    //视频上所讲,登录之后会存在安全性问题(这个安全性问题就是,在登陆的时候会将一些信息存储到localStora里面,当其他人获取到这部分信息的时候,通过直接在网页上的localSorage添加对应的信息,不用用户名和密码就可以直接登陆),解决这问题的方法就是点击安全退出,调用接口,去清掉auth_token的值,这个在每次登录的时候都是不一样,这样就没办法通过复制粘贴密钥的值来达到实现的能力,不过没点击安全退出的话,还是会在短时间内带来安全问题,因为这个auth_token在后端是在一定时间内才会自动清掉
    //点击实现安全退出功能
    const outLogin = () => {
        //实现安全退出操作
        let sUrl = config.baseUrl + 'api/home/user/safeout?token='+config.token;
        request(sUrl , 'post' , {uid}).then(res =>{
            if(res.code === 200){
                //安全退出的时候,除了要触发清空用户登录信息的localStorage的数据之外,还要去清空用户购物车里面的数据(不过目前是我们的数据还没有存入后端中,还不清楚怎样去解决)
                dispatch(setOutLogin())
                dispatch(setClearCart())
                props.history.replace(config.path + 'login/index')
            }
        })
    }
    return (
        <div>
           昵称: {nickname}<br/>
           {/* 这里要实现的是我一点击退出,然后就退出 */}
           <button type='button' onClick={outLogin.bind(null)}>安全退出</button>
        </div>
    )
}

export default UserRouter
