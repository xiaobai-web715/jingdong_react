import React from 'react'
import SubHeader from '../../../components/header/subheader'
import config from '../../../assets/js/conf/config'
import '../../../assets/css/common/address/address.css'

const AddressIndex = (props) => {
    const pushPage = (url) => {
        props.history.push(config.path + url)
    }
    return (
        <div className='address-page'>
            <SubHeader title='选择收货地址'></SubHeader>
            <div className='main'>
                <div className='address-nav'>
                    <div className='address-nav-name-1'>配送地址</div>
                    <div className='address-nav-name-2' onClick={pushPage.bind(null , 'address/add')}>添加收货地址</div>
                </div>
                <div className='address-list'>
                    <div className='address-info-wrap'>
                        <div className='check-mark'></div>
                        <div className='address-info default'>
                            <div className='persion'><span>张三</span><span>18315963987</span></div>
                            <div className='address'>
                                <span className='default'>默认</span>
                                <span className='text'>北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳</span>
                            </div>
                        </div>
                    </div>
                    <div className='handle-wrap'>
                        <div className='edit'></div>
                        <div className='del'></div>
                    </div>
                </div>
                <div className='address-list'>
                    <div className='address-info-wrap'>
                        <div className='address-info'>
                            <div className='persion'><span>张三</span><span>18315963987</span></div>
                            <div className='address'>
                                <span className='text'>北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳北京朝阳</span>
                            </div>
                        </div>
                    </div>
                    <div className='handle-wrap'>
                        <div className='edit'></div>
                        <div className='del'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressIndex
