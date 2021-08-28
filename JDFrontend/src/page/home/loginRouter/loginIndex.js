import React , {useState , useEffect}from 'react'
import { request } from '../../../assets/js/libs/request'
import {useDispatch} from 'react-redux'
import { setLogin } from '../../../actions/loginAction'
import config from '../../../assets/js/conf/config'
import {Switch , Toast} from 'antd-mobile'
import _ from 'lodash'
import Subheader from '../../../components/header/subheader'
//会员注册与会员登录界面类似,所以直接使用的会员注册界面的css样式
import '../../../assets/css/common/reg/reg.css'

const LoginIndex = (props) => {
    //点击快速注册跳转到注册页面
    const pushPage =(url) => {
        props.history.push(config.path + url)
    }

    const [checked , setChecked] = useState(false)
    //定义一个状态用来保存手机号
    const [sCellphone , setSCellphone] = useState('')
    //定义一个状态来存储密码
    const [sPassword , setSPassword] = useState('')
    //定义一个状态来切换明码暗码
    const [sType , setSType] = useState('password')
    const dispatch = useDispatch();
    useEffect(() => {
        //这行代码就是为了在切换页面时来改变title标题
        document.getElementById('title').innerText = '会员登录'
    },[])// eslint-disable-line react-hooks/exhaustive-deps
    //点击登录按钮
    const submitData = ()=>{
        // sCellphone.match(/^\s*$/)判断手机号是否为空
        if(sCellphone.match(/^\s*$/)){
            Toast.info('请输入您的手机号' , 2);
            return false;
        }
        if(!sCellphone.match(/^1[0-9][0-9]{9}/)){
            Toast.info('您输入的手机号格式不正确' , 2);
            return false;
        }
        if(sPassword.match(/^\s*$/)){
            Toast.info('请输入密码' , 2);
            return false;
        }
        //当手机号码格式正确以及密码输入之后,请求接口
        let sUrl = config.baseUrl + '/api/home/user/pwdlogin?token=' + config.token;
        request(sUrl , 'post' , {cellphone : sCellphone , password : sPassword}).then(res => {
            if(res.code === 200){
                //当手机号和密码正确的时候,会登录,当涉及到登录的时候就有权限的问题;当登录完成之后会将用户名和密码放到缓存(这里的这个缓存指的是redux与localStorage做配合使用,redux在不刷新页面的情况下,所有组件都可以使用,但是刷新之后数据会消失,所以还要结合一下localStorage来存储会员信息,就像购物车那部分)里面,好做权限
                //下面就是往localStorage里面存储会员的信息
                localStorage['uid'] = _.get(res , ['data' , 'uid'])
                localStorage['nickname'] = _.get(res , ['data' , 'nickname'])
                // auth_token这个数据也是接口请求到的,是用来解决安全性问题的,这就是所说的单点登录要用到的数据
                localStorage['authToken'] = _.get(res , ['data' , 'auth_token'])
                //这里还要添加一个来确定是否是登录状态(true为登录状态,false为不登录状态)
                localStorage['isLogin'] = true;
                //接下来就是向redux里面存数据
                dispatch(setLogin({uid : _.get(res , ['data' , 'uid']) , nickname : _.get(res , ['data' , 'nickname']) , authToken : _.get(res , ['data' , 'auth_token']) , isLogin : true}))
                //登录完成之后,返回登录之前的上一页
                props.history.goBack();
            }else{
                Toast.info(_.get(res , ['data']) , 2);
            }
        })
    }
    //显示密码是明码还是暗码
    const changePwd = (checked) => {
        setChecked(checked); 
        if(checked){
            setSType('text')
        }else{
            setSType('password')
        }
    }
    return (
        <div className='reg-page'>
            <Subheader title='会员登录'></Subheader>
            <div className='main'>
                <div className='code-wrap'>
                    <input type='text' placeholder='手机号' onChange={e => setSCellphone(e.target.value)}></input>
                </div>
                <div className='password-wrap'>
                    <div className='password'>
                        <input type={sType} placeholder='密码' onChange={e => setSPassword(e.target.value)}></input>
                    </div>
                    <div className='switch-wrap login'>
                        <Switch checked={checked} onClick={changePwd.bind(null , !checked)} color='#EB1625'></Switch>
                    </div>
                </div>
                <div className='sure-btn' onClick={submitData.bind(null)}>登录</div>
                <div className='fastreg-wrap'>
                    <div><img src={require('../../../assets/images/home/index/forget.png').default}  alt='忘记密码'></img> 忘记密码</div>
                    <div onClick={pushPage.bind(null , 'reg/index')}><img src={require('../../../assets/images/home/index/reg.png').default}  alt='忘记密码'></img> 快速注册</div>
                </div>
            </div>
        </div>
    )
}

export default LoginIndex
