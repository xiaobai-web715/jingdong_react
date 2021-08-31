import React from 'react'
import SubHeader from '../../../components/header/subheader'
import config from '../../../assets/js/conf/config'

const AddressIndex = (props) => {
    const pushPage = (url) => {
        props.history.push(config.path + url)
    }
    return (
        <div>
            <SubHeader title='选择收货地址'></SubHeader>
            <button type='button' onClick={pushPage.bind(null , 'address/add')} style={{marginTop : '2rem'}}>添加收货地址</button>
        </div>
    )
}

export default AddressIndex
