import React , {useEffect , useState}from 'react'
import {useDispatch , useSelector} from 'react-redux'
import {safeAuth} from '../../../assets/js/utils/utils'
import {request} from '../../../assets/js/libs/request'
import Subheader from '../../../components/header/subheader'
import { Switch , Toast} from 'antd-mobile'
import config from '../../../assets/js/conf/config'
import '../../../assets/css/common/user/modpwd/index.css'

const ModpwdIndex = (props) => {
    const [checked , setChecked] = useState(false)
    const [sType , setSType] = useState('password')
    const [sPassword , setSPassword] = useState('')
    const dispatch = useDispatch(null)
    const {uid , authToken} = useSelector(state => state.loginRedux)
    useEffect(() => {
        safeAuth(uid , authToken , props , dispatch)
    } , [])// eslint-disable-line react-hooks/exhaustive-deps
    //点击注册按钮提交数据
    let bSubmit = true;
    const submitData = async()=>{
        if(sPassword.match(/^\s*$/)){
            Toast.info('请输入您的密码' , 2);
            return false;
        }
        if(sPassword.length < 6){
            Toast.info('请输入不小于6位的密码' , 2);
            return false;
        }
        //当上面的所有判断都满足要求之后,就请求接口添加到数据库之中
        let sUrl = config.baseUrl + '/api/user/myinfo/modpwd?token=' + config.token;
        if(bSubmit){
            bSubmit = false;
            //对于密码来说,如果后台没有做加密的话,前端就要做md加密
            let res = await request(sUrl , 'post' , {password : sPassword , uid})
            if(res.code === 200){
                //注册成功直接跳转到登录页面
                Toast.info('修改密码成功' , 2 , ()=>{
                    props.history.goBack();
                })
            }else{
                Toast.info(res.data , 2)
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
    return (
        <div className='modpwd-page'>
            <Subheader title='修改密码'></Subheader>
            <div className='main'>
                <div className='input-wrap' style={{marginTop : '0.6rem'}}>
                    <input type={sType} placeholder='请输入不小于6位的密码'  onChange={e => setSPassword(e.target.value)}></input>
                    <div className='switch-wrap'>
                        <Switch checked={checked} color='#EB1625' onClick={changePwd.bind(null , !checked)}></Switch>
                    </div>
                </div>
                <div className='save-btn' onClick={submitData}>提交</div>
            </div>
        </div>
    )
}

export default ModpwdIndex
