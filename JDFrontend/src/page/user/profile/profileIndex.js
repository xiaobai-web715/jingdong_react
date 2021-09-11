import React , {useState , useEffect , useRef} from 'react'
import {useSelector} from 'react-redux'
import config from '../../../assets/js/conf/config'
import {request} from '../../../assets/js/libs/request'
import Subheader from '../../../components/header/subheader'
import { ActionSheet , Toast } from 'antd-mobile'
import _ from 'lodash'
import '../../../assets/css/common/user/profile/index.css'

const ProfileIndex = (props) => {
    //这里的这个状态⑩在组件里面加载有的状态
    const [sHead , setSHead] = useState(require('../../../assets/images/user/my/default-head.png').default)
    //还需要一个状态来存储要提交给后台的图片地址数据
    const [sHeadName , setSHeadName] = useState('')
    //两个状态。一个用来保存性别，一个用来保存性别所对应的后端所需要的接口
    const [sGender , setSGender] = useState('')
    const [iGender , setIGender] = useState(0)
    //定义一个状态用来保存昵称
    const [sNickname , setSNickname] = useState('')
    //如果用户是登录状态,则redux里面会有isLogin为true的数据
    const {uid , isLogin} = useSelector(state => state.loginRedux)
    //获取用户登录信息
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
                    setIGender(Number(_.get(res , ['data' , 'gender'])))
                    setSGender(_.get(res , ['data' , 'gender']) === '1' ? '男' :(_.get(res , ['data' , 'gender']) === '2'?'女' : ''))
                }
            }catch(err){
                console.log('获取用户信息出错' , err)
            }
        }
    }
    //初始挂载的时候会获取数据
    useEffect(() => {
        let obj = {isUnmounted : false}
        getUserInfo(obj)
        return () => {
            obj.isUnmounted = true
        }
    } , [])// eslint-disable-line react-hooks/exhaustive-deps
    //选择性别
    const selectGender = () => {
        const BUTTONS = ['男', '女', '取消'];
        ActionSheet.showActionSheetWithOptions({
          options: BUTTONS,
          cancelButtonIndex: BUTTONS.length - 1,
        //   destructiveButtonIndex: BUTTONS.length - 2, //这里是默认红色的那个属性
          title: '选择性别',
          maskClosable: true,
          'data-seed': 'logId',
          wrapProps : e => e.preventDefault(), //这里是把默认事件给禁掉
        },
        (buttonIndex) => {
            if(buttonIndex !== 2){
                setSGender(buttonIndex === 0 ? '男' : '女' );
                setIGender(buttonIndex === 0 ? 1 : 2 );
            }
        });
    }
    //点击保存,将信息提交到后台数据库
    const submitSave = async() => {
        if(sNickname.match(/^\s*$/)){
            Toast.info('请输入昵称' , 2)
            return ;
        }
        if(iGender === 0){
            Toast.info('请选择性别' , 2)
            return;
        }  
        let sUrl = config.baseUrl + '/api/user/myinfo/updateuser?token=' + config.token;
        let jData = {
            uid,
            nickname : sNickname,
            gender : iGender,
            head : sHeadName,
        }
        const res = await request(sUrl , 'post' , jData)
        if(res.code === 200){
            Toast.info(res.data , 2 , () =>{
                props.history.goBack();
            })
        }
    }
    //图片上传
    const inputFile = useRef(null);
    const uploadHead = async() => {
        let sUrl = config.baseUrl + '/api/user/myinfo/formdatahead?token=' + config.token
        //获得type是file类型的输入框的文件信息(首次尝试使用useRef)
        // console.log(inputFile.current.files[0])
        const res = await request(sUrl , 'file' , {headfile : inputFile.current.files[0]})
        if(res.code === 200){
            setSHead('http://vueshop.glbuys.com/userfiles/head/' + _.get(res , ['data' , 'msbox'] , ''))
            setSHeadName(_.get(res , ['data' , 'msbox'] , ''))
        }
    }
    return (
        <header className='profile-page'>
            <Subheader title='个人资料' right-text='保存' rightBtn={submitSave}></Subheader>
            <div className='profile-main'>
                <ul className='head'>
                    <li>头像</li>
                    <li><img src={sHead} alt=''/><input ref={inputFile} type='file' onChange={uploadHead.bind(null)}></input></li>
                </ul>
                <ul className='list'>
                    <li>昵称</li>
                    <li><input type='text' placeholder='请设置昵称' value={sNickname} onChange={e => setSNickname(e.target.value)}></input></li>
                    <li className='arrow'></li>
                </ul>
                <ul className='list'>
                    <li>性别</li>
                    <li><input type='text' placeholder='请选择性别' readOnly onClick={selectGender} value={sGender}></input></li>
                    <li className='arrow'></li>
                </ul>
            </div>
        </header>
    )
}

export default ProfileIndex
