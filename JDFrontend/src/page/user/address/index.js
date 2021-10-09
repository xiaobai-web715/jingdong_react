import React , {useEffect , useState}from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { safeAuth } from '../../../assets/js/utils/utils'
import {request} from '../../../assets/js/libs/request'
import config from '../../../assets/js/conf/config'
import Subheader from '../../../components/header/subheader'
import _ from 'lodash'
import '../../../assets/css/common/user/address/index.css'

const UserAddressIndex = (props) => {
    const [data , setData] = useState([])
    const {uid , authToken} = useSelector(state => state.loginRedux)
    const dispatch = useDispatch(null)
    useEffect(() => {
        let isUnmounted = false;
        safeAuth(uid , authToken , props , dispatch)
        const getData = async() => {
            let url = config.baseUrl + 'api/user/address/index?uid=' + uid + '&token=' + config.token
            const res = await request(url)
            if(res.code === 200 && !isUnmounted){
                setData(_.get(res , ['data'] , []))
            }
        }
        getData()
        return () => {
            isUnmounted = true
        }
    },[])// eslint-disable-line react-hooks/exhaustive-deps
    //点击跳转到添加新地址页面
    const pushPage = url => {
        props.history.push(config.path + url)
    }
    return (
        <div className='address-page_1'>
            <Subheader title='收货地址管理'></Subheader>
            <div className='info'>
                {
                    data.length > 0 ?
                    data.map((item , index) => {
                        return (
                            <div className='list' key={index} onClick={pushPage.bind(null , 'user/address/mod?aid=' + item.aid)}>
                                <div className='name-wrap'>
                                    <span>{item.name}</span><span>{item.cellphone}</span>
                                </div>
                                <div className='address'>
                                    <span>{item.isdefault === '1' ? '[默认]' : ''}</span>{item.province}{item.city}{item.area}{item.address}
                                </div>
                                <div className='right-arrow'></div>
                            </div> 
                        )
                    }):''
                }
            </div>
            <div style={{width:'100%',height:'2.6rem'}}></div>
            <div className='add-btn' onClick={pushPage.bind(null , 'address/add')}>+添加新地址</div>
        </div>
    )
}

export default UserAddressIndex
