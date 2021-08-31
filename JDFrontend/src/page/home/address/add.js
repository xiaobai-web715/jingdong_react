import React , {useState}from 'react'
import {useSelector} from 'react-redux'
import SubHeader from '../../../components/header/subheader'
import '../../../assets/css/common/address/add.css'
//使用蚂蚁金服的antd的picker组件实现地址选择器(不过蚂蚁金服的例子使用的是它们自己的数据包,所以并不全,这里使用的视频老师下载的数据包)
import { Picker , Toast} from 'antd-mobile'
//导入数据包
import { province } from '../../../assets/data/province'
import {request} from '../../../assets/js/libs/request'
import config from '../../../assets/js/conf/config'

const AddressAdd = (props) => {
    const[defaultProvince , setDefaultProvince] = useState('');
    const[sProvince , setSProvince] = useState('');
    const[sCity , setSCity] = useState('');
    const[sArea , setSArea] = useState('');
    const[sName , setSName] = useState('');
    const[sCellphone , setSCellphone] = useState('');
    const[sAddress , setSAddress] = useState('');
    const[bChecked , setBChecked] = useState(false)
    const{uid} = useSelector(state => state.loginRedux)
    // 提交数据到后台
    const submitData = async() => {
        if(sName.match(/^\s*$/)){
            Toast.info('请输入收货人姓名' , 2);
            return;
        }
        if(sCellphone.match(/^\s*$/)){
            Toast.info('请输入联系人手机号' , 2);
            return;
        }
        //验证手机号格式是否正确
        if(!sCellphone .match(/^1[0-9][0-9]{9}/)){
            Toast.info('你输入的手机号格式不正确' , 2);
            return;
        }
        if(defaultProvince.match(/^\s*$/)){
            Toast.info('请选择所在地区' , 2);
            return;
        }
        if(sAddress.match(/^\s*$/)){
            Toast.info('请输入详细地址' , 2);
            return;
        }
        let url = config.baseUrl + '/api/user/address/add?token=' + config.token
        let data ={
            uid,
            name : sName,
            cellphone : sCellphone,
            province : sProvince,
            city : sCity,
            area : sArea,
            address : sAddress,
            isdefault : bChecked?'1' : '0'
        }
        //这里不能直接这样写,否则返回的就是一个promise对象
        // let res = request(url , 'post' , data)
        // 两种方式
        // request(url , 'post' , data).then(res => console.log(res))
        // 另一种方式就是用async和await
        try{
            let res = await request(url , 'post' , data)
            if(res.code === 200){
                Toast.info('添加成功' , 2 , ()=>{
                    props.history.replace(config.path + 'address/index')
                })
            }
        }catch(err){
            console.log('提交地址请求出错' , err)
        }
    }
    return (
        <div className='add-page'>
            <SubHeader title='添加收货地址'></SubHeader>
            <div className='add-main'>
                <ul>
                    <li>收货人</li>
                    <li><input type='text' placeholder='收货人姓名' onChange={e => setSName(e.target.value)}></input></li>
                </ul>
                <ul>
                    <li>联系方式</li>
                    <li><input type='text' placeholder='联系人手机号' onChange={e => setSCellphone(e.target.value)}></input></li>
                </ul>
                <ul>
                    <li>所在地区</li>
                    <li>
                    <Picker 
                        data={province}
                        title="选择地区"
                        onOk={e => {
                            setDefaultProvince(e.join(' '))
                            setSProvince(e[0])
                            setSCity(e[1])
                            if(e[2] !== undefined){
                                setSArea(e[2])
                            }else{
                                setSArea('')
                            }
                        }}
                    >
                        <input className='area' type='text' placeholder='请选择收货地址' readOnly value={defaultProvince}></input>
                    </Picker>
                    </li>
                </ul>
                <ul>
                    <li>详细地址</li>
                    <li><input type='text' placeholder='街道详细地址' onChange={e => setSAddress(e.target.value)}></input></li>
                </ul>
                <ul>
                    <li>设置为默认地址</li>
                    <li><input type='checkbox' checked={bChecked} onChange={() => {
                        setBChecked(!bChecked)
                    }}></input></li>
                </ul>
                <button type='button' className='submit-save' onClick={submitData.bind(null)}>保存</button>
            </div>
        </div>
    )
}

export default AddressAdd
