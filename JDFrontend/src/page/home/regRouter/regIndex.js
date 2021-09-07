import React , {useState , useEffect}from 'react'
import { request } from '../../../assets/js/libs/request'
import config from '../../../assets/js/conf/config'
import {Switch , Toast} from 'antd-mobile'
import Subheader from '../../../components/header/subheader'
import '../../../assets/css/common/reg/reg.css'

const RegIndex = (props) => {
    //定义一个变量,目的是为了清除定时函数
    let timer = null;
    //定义一个变量用来组织当点击请求短信验证码之后再次点击仍会触发的效果
    // let bSendCode = true;这样不行,好像是状态改变会使得这些变量被重新再次赋值,这样写它一直就是true,不能变成false达到阻止再次点击触发定时函数的效果
    const [bSendCode , setBSendCode] = useState(true)
    const [checked , setChecked] = useState(false)
    //定义一个状态用来保存手机号
    const [sCellphone , setSCellphone] = useState('')
    //定义一个状态用来保存手机号输入的对与错
    const [bCodeSuccess , setBCodeSuccess] = useState(false)
    //因为点击获取验证码之后input标签的底纹会发生变化,所以这里修改成一个状态来满足动态的效果
    const [sCodeText , setSCodeText] = useState('获取短信验证码')
    //定义一个状态来存储短信验证吗
    const [sCode , setSCode] = useState('')
    //定义一个状态来存储密码
    const [sPassword , setSPassword] = useState('')
    //定义一个状态来切换明码暗码
    const [sType , setSType] = useState('password')
    //输入改变时修改保存手机号的状态
    const checkCellphoe = (e) => {
        setSCellphone(e.target.value)
    }
    useEffect(() => {
        if(bSendCode){
            if(sCellphone.match(/^1[0-9][0-9]{9}/)){
                setBCodeSuccess(true);
            }else{
                setBCodeSuccess(false);
            }
        }
    } , [sCellphone])// eslint-disable-line react-hooks/exhaustive-deps
    //点击获取短信验证码
    const getCode =async() =>{
        if(bSendCode && bCodeSuccess){
            let resData = await isSameCellphone()
            if(resData.code === 200){
                if(resData.data.isreg === '1'){
                    Toast.info('您输入的手机号已存在' , 2)
                    return false;
                }
            }
            setBCodeSuccess(false)
            setBSendCode(false);
            let iTime = 10;
            setSCodeText('重新发送('+iTime+'s)')
            timer = setInterval(() =>{
                if(iTime > 0){
                    iTime--;
                    setSCodeText('重新发送('+iTime+'s)')
                }else{
                    clearInterval(timer);
                    setBSendCode(true);
                    setSCodeText('获取短信验证码')
                    setBCodeSuccess(true)
                }
            } , 1000)
        }
    }
    //防止切换页面所导致的内存泄露的问题,清除一下这个setInterval定时函数
    useEffect(() => {
        //这行代码就是为了在切换页面时来改变title标题
        document.getElementById('title').innerText = '会员注册'
        return () =>{
            clearInterval(timer);
        }
    },[])// eslint-disable-line react-hooks/exhaustive-deps
    //点击注册按钮提交数据
    let bSubmit = true;
    const submitData =async ()=>{
        // sCellphone.match(/^\s*$/)判断手机号是否为空
        if(sCellphone.match(/^\s*$/)){
            Toast.info('请输入您的手机号' , 2);
            return false;
        }
        if(!sCellphone.match(/^1[0-9][0-9]{9}/)){
            Toast.info('您输入的手机号格式不正确' , 2);
            return false;
        }
        // isSameCellphone((data) => {
        //     console.log(data)
        //     // 然后这里面做判断
        //     if(data.data.isreg === 0){
        //         if(sCode.match(/^\s*$/)){
        //             Toast.info('请输入短信验证码' , 2);
        //             return false;
        //         }
        //         if(sPassword.match(/^\s*$/)){
        //             Toast.info('请输入密码' , 2);
        //             return false;
        //         }
        //     }
        // })
        //逻辑上是上面的代码执行完成，判断出手机号码是否被注册过之后,再去执行下面的操作,但是这里的ajax是异步请求(es5解决的方法时写回调函数,然后将下面的代码全部写进回调函数里面,但这也是产生回调地狱这个问题的原因)
        // 按同步的方式来写(通过async与await配合将异步变成同步)
        let resData = await isSameCellphone()
        if(resData.code === 200){
            if(resData.data.isreg === '1'){
                Toast.info('您输入的手机号已存在' , 2)
                return false;
            }
        }
        if(sCode.match(/^\s*$/)){
            Toast.info('请输入短信验证码' , 2);
            return false;
        }
        if(sPassword.match(/^\s*$/)){
            Toast.info('请输入密码' , 2);
            return false;
        }
        //当上面的所有判断都满足要求之后,就请求接口添加到数据库之中
        let sUrl = config.baseUrl + '/api/home/user/reg?token=' + config.token;
        if(bSubmit){
            bSubmit = false;
            //对于密码来说,如果后台没有做加密的话,前端就要做md加密
            let res = await request(sUrl , 'post' , {vcode : sCode , cellphone:sCellphone , password : sPassword})
            if(res.code === 200){
                //注册成功直接跳转到登录页面
                props.history.goBack();
            }
        }
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
    //检测手机号是否注册过(本课程的第一个post请求,post请求有别于get请求)
    const isSameCellphone = () =>{
        let sUrl = config.baseUrl + '/api/home/user/isreg?token=' + config.token
        // 13717628483
        let res = request(sUrl , 'post' , {username :sCellphone}).then(res => res);
        return res
    } 
    return (
        <div className='reg-page'>
            <Subheader title='会员注册'></Subheader>
            <div className='main'>
                <div className='cellphone-wrap'>
                    <div className='cellphone'>
                        <input type='tel' placeholder='请输入手机号' onChange={e => checkCellphoe(e)}></input>
                    </div>
                    <div className={bCodeSuccess?'code-btn active' : 'code-btn'} onClick={getCode.bind(null)}>{sCodeText}</div>
                </div>
                <div className='code-wrap'>
                    <input type='text' placeholder='请输入短信验证码' onChange={e => setSCode(e.target.value)}></input>
                </div>
                <div className='password-wrap'>
                    <div className='password'>
                        <input type={sType} placeholder='请输入密码' onChange={e => setSPassword(e.target.value)}></input>
                    </div>
                    <div className='switch-wrap'>
                        <Switch checked={checked} color='#EB1625' onClick={changePwd.bind(null , !checked)}></Switch>
                    </div>
                </div>
                <div className='sure-btn' onClick={submitData.bind(null)}>注册</div>
            </div>
        </div>
    )
}

export default RegIndex