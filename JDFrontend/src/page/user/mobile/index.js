import React , {useEffect , useState ,useRef}from 'react'
import {useDispatch , useSelector} from 'react-redux'
import { safeAuth } from '../../../assets/js/utils/utils'
import Subheader from '../../../components/header/subheader'
import { Toast } from 'antd-mobile'
import config from '../../../assets/js/conf/config'
import {request} from '../../../assets/js/libs/request'
import '../../../assets/css/common/user/mobile/index.css'

const MobildIndex = (props) => {
    let timer = useRef(null),
        bSendCode = true,
        obj = {isUnmounted : false}
    const [sCellphone , setSCellphone] = useState('')
    const [bCodeSuccess , setBCodeSuccess] = useState(false)
    const [sCodeText , setSCodeText] = useState('获取验证码')
    const [sCode , setSCode] = useState('')
    const dispatch = useDispatch(null)
    const {uid , authToken} = useSelector(state => state.loginRedux)
    useEffect(() => {
        safeAuth(uid , authToken , props , dispatch)
    } , [])// eslint-disable-line react-hooks/exhaustive-deps
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
    //检测手机号是否注册过(本课程的第一个post请求,post请求有别于get请求)
    const isSameCellphone = () =>{
        let sUrl = config.baseUrl + '/api/home/user/isreg?token=' + config.token
        // 13717628483
        let res = request(sUrl , 'post' , {username :sCellphone}).then(res => res);
        return res
    } 
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
            if(!obj.isUnmounted){
                setBCodeSuccess(false)
            }
            bSendCode = false;
            let iTime = 10;
            if(!obj.isUnmounted){
                setSCodeText('重新发送('+iTime+'s)')
            }
            timer.current = setInterval(() =>{
                if(iTime > 0){
                    iTime--;
                    if(!obj.isUnmounted){
                        setSCodeText('重新发送('+iTime+'s)')
                    }
                }else{
                    clearInterval(timer.current);
                    bSendCode = true;
                    setSCodeText('获取验证码')
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
            //这里清除浮动是将定时器的标识放置在useRef创建出来的对象的current属性里面，这样就可以通过清除定时器任务了
            clearInterval(timer.current);
            obj.isUnmounted = true;
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
        let resData = await isSameCellphone()
        if(resData.code === 200){
            if(resData.data.isreg === '1'){
                Toast.info('您输入的手机号已存在' , 2)
                return false;
            }
        }
        if(sCode.match(/^\s*$/)){
            Toast.info('请输入验证码' , 2);
            return false;
        }
        //当上面的所有判断都满足要求之后,就请求接口添加到数据库之中
        let sUrl = config.baseUrl + '/api/user/myinfo/updatecellphone?token=' + config.token;
        if(bSubmit){
            bSubmit = false;
            //对于密码来说,如果后台没有做加密的话,前端就要做md加密
            let res = await request(sUrl , 'post' , {vcode : sCode , cellphone:sCellphone , uid})
            if(res.code === 200){
                //注册成功直接跳转到登录页面
                Toast.info('绑定手机成功' , 2 , ()=>{
                    props.history.goBack();
                })
            }else{
                Toast.info(res.data , 2)
            }
        }
    }
    return (
        <div className='mobile-page'>
            <Subheader title='绑定手机'></Subheader>
            <div className='main'>
                <div className='tip'>
                    <div className='icon'></div>
                    <div className='text'>新手机号验证后，即可绑定成功！</div>
                </div>
                <div className='input-wrap' style={{marginTop : '1rem'}}>
                    <input type='tel' className='cellphone' placeholder='绑定手机号码' onChange={e => checkCellphoe(e)}></input>
                </div>
                <div className='input-wrap' style={{marginTop : '0.4rem'}}>
                    <input type='text' className='code' placeholder='请输入短信验证码' onChange={e => setSCode(e.target.value)}></input>
                    <div className={bCodeSuccess?'code-btn sucess' : 'code-btn'} onClick={getCode}>{sCodeText}</div>
                </div>
                <div className='save-btn' onClick={submitData}>下一步</div>
            </div>
        </div>
    )
}

export default MobildIndex
