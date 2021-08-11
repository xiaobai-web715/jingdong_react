//这个是搜索加载的页面
//这个页面也是要加载到路由里面的
import React from 'react'
import '../../../assets/css/common/goods/search.css'

const search = () => {
    return (
        <div className='search-page'>
            <div className='search-top'>
                <div className='search-header2'>
                    <div className='search-back'></div>
                    <div className='search-wrap2'>
                        <div className='search-icon2'></div>
                        <div className='search-text2'>请输入您的宝贝名称</div>
                    </div>
                    <div className='screen-btn2'>筛选</div>
                </div>
                <div className='order-main'>
                    <div className='order-item'>
                        <div className='order-text active'>综合</div>
                        <div className='order-icon up'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default search
