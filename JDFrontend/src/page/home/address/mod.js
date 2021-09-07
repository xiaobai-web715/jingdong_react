//这个页面与添加收货地址的页面类似，不过这里是先通过接口来获取对应的信息回显出来,然后进行相应的修改在提交给后台
//这里请求后台数据所需要的参数aid是通过url进行缓存的
import React , {useState , useEffect}from 'react'
import {useSelector} from 'react-redux'
import SubHeader from '../../../components/header/subheader'
import '../../../assets/css/common/address/add.css'
//使用蚂蚁金服的antd的picker组件实现地址选择器(不过蚂蚁金服的例子使用的是它们自己的数据包,所以并不全,这里使用的视频老师下载的数据包)
import { Picker , Toast} from 'antd-mobile'
//导入数据包
import { province } from '../../../assets/data/province'
import {request} from '../../../assets/js/libs/request'
import { localParam } from '../../../assets/js/utils/utils'
import config from '../../../assets/js/conf/config'
import _ from 'lodash'

const AddressMod = (props) => {
    const[defaultProvince , setDefaultProvince] = useState('');
    const[sProvince , setSProvince] = useState('');
    const[sCity , setSCity] = useState('');
    const[sArea , setSArea] = useState('');
    const[sName , setSName] = useState('');
    const[sCellphone , setSCellphone] = useState('');
    const[sAddress , setSAddress] = useState('');
    const[bChecked , setBChecked] = useState(false)
    const{uid} = useSelector(state => state.loginRedux)
    //获取url?后面的部分的方法
    const aid = localParam(props.location.search).search.aid;
    //获取收货地址信息
    const getAddress = async(isUnmounted) => {
        if(!isUnmounted){
            try{
                let url = config.baseUrl + '/api/user/address/info?uid=' + uid + '&aid=' + aid + '&token=' + config.token
                const res = await request(url);
                if(res.code === 200){
                   setSName(_.get(res , ['data' , 'name'] , ''))
                   setSCellphone(_.get(res , ['data' , 'cellphone'] , ''))
                   setSProvince(_.get(res , ['data' , 'province'] , ''))
                   setSCity(_.get(res , ['data' , 'city'] , ''))
                   setSArea(_.get(res , ['data' , 'area'] , ''))
                   setSAddress(_.get(res , ['data' , 'address'] , ''))
                   setBChecked(_.get(res , ['data' , 'isdefault']) === '1' ? true : false)
                   setDefaultProvince(`${_.get(res , ['data' , 'province'] , '')} ${_.get(res , ['data' , 'city'] , '')} ${_.get(res , ['data' , 'area'] , '')}`)
                }
            }catch(err){
                console.log('请求地址数据出错' , err)
            }
        }
    }
    useEffect(() => {
        let isUnmounted = false;
        getAddress(isUnmounted)
        return () => {
            isUnmounted = true;
        }
    } , [])// eslint-disable-line react-hooks/exhaustive-deps
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
        if(!sCellphone.match(/^1[0-9][0-9]{9}/)){
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
        //上面的逻辑判断与添加收货地址相差无几,就是接口和传参有可能会发生变化
        let url = config.baseUrl + '/api/user/address/mod?token=' + config.token
        let data ={
            aid,
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
                Toast.info('修改成功' , 2 , ()=>{
                    // 视频中讲解说是跳转的话容易出问题,所以就是返回上一级吗,就直接goBack就可以
                    // props.history.replace(config.path + 'address/index')
                    if(bChecked){
                        //当我添加的这个地址是默认地址的话,就会清掉点击选择地址所缓存在sessionStorage里面的数据,这样重新回到购物车页面挂载组件就行请求的默认地址,就是你新设置的这个（然后那里会存一个localStorage以便DOM的展示,当你点击选择的时候就会在sessionStorage里面存一个，这时sessionStorage['addressId']就不是undefined,所以请求的就是收货地址的函数）
                        sessionStorage.removeItem('addressId')
                    }else{
                        //这里之所以加上这行代码就是因为当我修改地址的默认与非默认属性时,结算界面的地址栏样式有问题(不信你把这个else去掉试试)
                        localStorage.removeItem('addressId')
                    }
                    props.history.goBack();
                })
            }
        }catch(err){
            console.log('提交地址请求出错' , err)
        }
    }
    return (
        <div className='add-page'>
            <SubHeader title='修改收货地址'></SubHeader>
            <div className='add-main'>
                <ul>
                    <li>收货人</li>
                    <li><input type='text' placeholder='收货人姓名' value={sName} onChange={e => setSName(e.target.value)}></input></li>
                </ul>
                <ul>
                    <li>联系方式</li>
                    <li><input type='text' placeholder='联系人手机号' value={sCellphone} onChange={e => setSCellphone(e.target.value)}></input></li>
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
                        <input className='area' type='text'  placeholder='请选择收货地址' readOnly value={defaultProvince}></input>
                    </Picker>
                    </li>
                </ul>
                <ul>
                    <li>详细地址</li>
                    <li><input type='text' placeholder='街道详细地址'  value={sAddress} onChange={e => setSAddress(e.target.value)}></input></li>
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

export default AddressMod
