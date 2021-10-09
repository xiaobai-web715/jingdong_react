import React , {useState , useEffect} from 'react'
import { request } from '../../../assets/js/libs/request';
import {useSelector , useDispatch} from 'react-redux'
import Subheader from '../../../components/header/subheader'
// import { safeAuth } from '../../../assets/js/utils/utils';
import config from '../../../assets/js/conf/config'
import {Modal} from 'antd-mobile'
import _ from 'lodash'
import { setOutLogin } from '../../../actions/outLoginAction';
import { setClearCart } from '../../../actions/clearCartAction';
import '../../../assets/css/common/user/my/index.css'

const UserRouter = (props) => {
    const [sHead , setSHead] = useState(require('../../../assets/images/user/my/default-head.png').default)
    const [sNickname , setSNickname] = useState('昵称')
    const [iPoints , setIPoints] = useState(0) 
    //在这里我们要实现一个需求只有在登录的时候才能看到我的这个界面,不登录的时候点击我的直接跳转到登录页面(这个是对路由那里进行操作,可以转到jdIndex文件看一下)
    const {uid , isLogin} = useSelector(state => state.loginRedux)
    // const {authToken : auth_token} =  useSelector(state => state.loginRedux)
    const dispatch = useDispatch();
    // 接下来就是实现单点登录的相关操作(下面视频中的讲解是要在虚拟DOM加载之前来实现这个请求来判断是否有权限访问)这里就用到了auth_token,这个只允许一个地方进行登录操作,也就是只有一个页面能有权限访问,后登录的会把前面登录的给挤掉
    //目前我感觉这个单点登录(就是实现了安全验证的要求,只要是localStorage里面存储的auth_token这个值不满足你最新的auth_token的值,请求后端的接口返回来的就不是200状态),你在新的浏览器登录时肯定会产生一个新的auth_token,原来的那个页面刷新之后就会导致auth_token不匹配而导致下面的if语句的里面的操作会执行(不过前提是刷新一下,因为做到实时退出的话就是另一个操作技术了)
    //这里的安全验证问题会在很多地方用到,所以这里可以做一个公用的封装函数
    // useEffect(() => {
    //     safeAuth(uid , auth_token , props , dispatch)//因为这里要将权限进行开放,所以这部分就可以注释掉了
    // } , [])
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
        if(isLogin){
            Modal.alert('', '确认要退出吗?', [
                { text: '取消', onPress: () => {}, style: 'default' },
                { text: '确认', onPress: () => {
                    //实现安全退出操作
                    let sUrl = config.baseUrl + 'api/home/user/safeout?token='+config.token;
                    request(sUrl , 'post' , {uid}).then(res =>{
                        if(res.code === 200){
                            //安全退出的时候,除了要触发清空用户登录信息的localStorage的数据之外,还要去清空用户购物车里面的数据(不过目前是我们的数据还没有存入后端中,还不清楚怎样去解决)
                            dispatch(setOutLogin())
                            dispatch(setClearCart())
                            props.history.push(config.path + 'login/index')
                        }
                    })
                }},
            ]);
        }else{
            props.history.push(config.path + 'login/index')
        }
    }
    //获取登录用户的信息
    const getUserInfo = async(obj) => {
        if(isLogin){
            let sUrl = config.baseUrl + '/api/user/myinfo/userinfo/uid/'+ uid + '?token=' + config.token;
            try{
                const res = await request(sUrl);
                if(res.code === 200 && !obj.isUnmounted){
                    if(_.get(res , ['data' , 'head'])){
                        setSHead(_.get(res , ['data' , 'head']))
                    }
                    setSNickname(_.get(res , ['data' , 'nickname']))
                    setIPoints(_.get(res , ['data' , 'points'] , 0))
                }
            }catch(err){
                console.log('获取用户信息出错' , err)
            }
        }
    }
    useEffect(() => {
        let obj = {isUnmounted : false}
        getUserInfo(obj)
        return () => {
            obj.isUnmounted = true
        }
    } , [])// eslint-disable-line react-hooks/exhaustive-deps
    //通过点击事件跳转页面
    const pushPage = (url) => {
        props.history.push(config.path + url);
    }
    return (
        <div className='user-page'>
            <Subheader title='会员中心'></Subheader>
            <div className='user-info-wrap'>
                <div className='head'>
                    <img src={sHead} alt={sNickname}></img>
                </div>
                <div className='nickname'>{sNickname}</div>
                <div className='points'>我的积分：{iPoints}</div>
            </div>
            <div className='order-name-wrap'>
                <div className='order-name'>全部订单</div>
                <div className='show-order' onClick = {pushPage.bind(null , 'myorder/order?status=all')}>查看全部订单 &gt;</div>
            </div>
            <div className='order-status-wrap'>
                <div className='item'>
                    <div className='icon wait'></div>
                    <div className='text' onClick = {pushPage.bind(null , 'myorder/order?status=0')}>待支付</div>
                </div>
                <div className='item'>
                    <div className='icon take'></div>
                    <div className='text' onClick = {pushPage.bind(null , 'myorder/order?status=1')}>待收货</div>
                </div>
                <div className='item'>
                    <div className='icon comment'></div>
                    <div className='text' onClick = {pushPage.bind(null , 'myorder/review?status=2')}>待评价</div>
                </div>
            </div>
            <div className='menu-list-wrap'>
                <ul onClick={pushPage.bind(null , 'profile/index')}>
                    <li>个人资料</li>
                    <li></li>
                </ul>
                <ul onClick={pushPage.bind(null , 'user/address/index')}>
                    <li>收货地址</li>
                    <li></li>
                </ul>
                <ul onClick={pushPage.bind(null , 'user/mobile/index')}>
                    <li>绑定手机</li>
                    <li></li>
                </ul>
                <ul>
                    <li>修改密码</li>
                    <li></li>
                </ul>
                <ul>
                    <li>我的收藏</li>
                    <li></li>
                </ul>
                <div className='btn' onClick={outLogin}>{isLogin?'安全退出' : '登录/注册'}</div>
            </div>
        </div>
    )
}

export default UserRouter
