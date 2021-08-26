import React , {useState}from 'react'
import {Switch} from 'antd-mobile'
import Subheader from '../../../components/header/subheader'
import '../../../assets/css/common/reg/reg.css'

const RegIndex = () => {
    const [checked , setChecked] = useState(false)
    return (
        <div className='reg-page'>
            会员注册页面
            <Subheader title='会员注册'></Subheader>
            <div className='main'>
                <div className='cellphone-wrap'>
                    <div className='cellphone'>
                        <input type='tel' placeholder='请输入手机号'></input>
                    </div>
                    <div className='code-btn active'>获取短信验证码</div>
                </div>
                <div className='code-wrap'>
                    <input type='text' placeholder='请输入短信验证码'></input>
                </div>
                <div className='password-wrap'>
                    <div className='password'>
                        <input type='password' placeholder='请输入密码'></input>
                    </div>
                    <div className='switch-wrap'>
                        <Switch checked={checked} onClick={()=>setChecked(!checked)}></Switch>
                    </div>
                </div>
                <div className='sure-btn'>注册</div>
            </div>
        </div>
    )
}

export default RegIndex