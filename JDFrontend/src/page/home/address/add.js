import React from 'react'
import SubHeader from '../../../components/header/subheader'
import '../../../assets/css/common/address/add.css'

const AddressAdd = (props) => {
    return (
        <div class='add-page'>
            <SubHeader title='添加收货地址'></SubHeader>
            <div className='add-main'>
                <ul>
                    <li>收货人</li>
                    <li><input type='text' placeholder='收货人姓名'></input></li>
                </ul>
                <ul>
                    <li>联系方式</li>
                    <li><input type='text' placeholder='联系人手机号'></input></li>
                </ul>
                <ul>
                    <li>所在地区</li>
                    <li><input className='area' type='text' placeholder='请选择收货地址' readOnly></input></li>
                </ul>
                <ul>
                    <li>详细地址</li>
                    <li><input type='text' placeholder='街道详细地址'></input></li>
                </ul>
                <ul>
                    <li>设置为默认地址</li>
                    <li><input type='checkbox'></input></li>
                </ul>
                <button type='button' className='submit-save'>保存</button>
            </div>
        </div>
    )
}

export default AddressAdd
