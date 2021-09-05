//请注意这里面存在一个冒泡哦
import React , {useState , useEffect} from 'react'
import {useSelector} from 'react-redux'
import SubHeader from '../../../components/header/subheader'
import {request} from '../../../assets/js/libs/request'
import config from '../../../assets/js/conf/config'
import _ from 'lodash'
import {Modal , Toast} from 'antd-mobile'
import '../../../assets/css/common/address/address.css'

const AddressIndex = (props) => {
    const [aAddress , setAAddress] = useState([]);
    const pushPage = (url) => {
        props.history.push(config.path + url)
    }
    //这样我们也可以直接拿到uid,state.loginRedux就是一个数据对象,是reducer文件return的state要传给store的对象数据
    const uid = useSelector(state => state.loginRedux.uid)
    const delAddress = (index , aid , e) => {
        Modal.alert('', '确认要删除吗?', [
            { text: '取消', onPress: () => {}, style: 'default' },
            { text: '确认', onPress: () => {
                let copyAAddress = aAddress;
                copyAAddress.splice(index , 1);
                setAAddress([...copyAAddress])
                let sUrl = config.baseUrl + '/api/user/address/del?uid=' + uid + '&aid=' + aid + '&token=' + config.token;
                request(sUrl).then(res => {
                    Toast.info('删除成功' , 2)
                    if(aid === sessionStorage['addressId']){
                        sessionStorage.removeItem('addressId')
                    }
                    if(aid === localStorage['addressId']){
                        localStorage.removeItem('addressId')
                    }
                });
            }},
        ]);
        //这个方法就阻止冒泡事件了
        e.stopPropagation();
    }
    //获取收货地址列表
    const getAddress = async() => {
        let sUrl = config.baseUrl + '/api/user/address/index?uid='+uid + '&token=' + config.token;
        let res = await request(sUrl)
        if(res.code === 200){
            setAAddress(_.get(res , ['data'] , []));
        }
    }
    useEffect(() => {
        getAddress();
    } , []) // eslint-disable-line react-hooks/exhaustive-deps
    //点击选择收货地址
    const selectAddress = (aid) => {
        // sessionStorage是一个长期的临时存储,当我退出的时候相应的也要去清空这里面的缓存
        sessionStorage['addressId'] = aid;
        props.history.replace(config.path + 'balance/index')
    }
    return (
        <div className='address-page'>
            <SubHeader title='选择收货地址'></SubHeader>
            <div className='main'>
                <div className='address-nav'>
                    <div className='address-nav-name-1'>配送地址</div>
                    <div className='address-nav-name-2' onClick={pushPage.bind(null , 'address/add')}>添加收货地址</div>
                </div>
                {
                    aAddress.length > 0 ? 
                    aAddress.map((item , index) => {
                        return(
                            <div className='address-list' key={index} onClick={selectAddress.bind(null , item.aid)}>
                                <div className='address-info-wrap'>
                                    {
                                        item.isdefault === '1'?
                                        <div className='check-mark'></div> : ''
                                    }
                                    <div className={item.isdefault === '1'?'address-info default' : 'address-info'}>
                                        <div className='person'><span>{item.name}</span><span>{item.cellphone}</span></div>
                                        <div className='address'>
                                            {
                                                item.isdefault === '1'?
                                                <span className='default'>默认</span> : ''
                                            }
                                            <span className='text'>{item.province}{item.city}{item.area}{item.address}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='handle-wrap'>
                                    <div className='edit'></div>
                                    {/* 学到这里的总结如果点击事件里面不用传参的话就可以直接写函数名,如果需要传参的话,必须加个.bind(null)因为这样即达到了传参的要求,又不会立即执行 */}
                                    <div className='del' onClick={e => {delAddress(index , item.aid , e)}}></div>
                                </div>
                            </div>
                        )
                    }):<div className='null-item'>您还没有添加收货地址!</div>
                }
            </div>
        </div>
    )
}

export default AddressIndex
