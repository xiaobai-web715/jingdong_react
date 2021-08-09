import React , {useState} from 'react'
import  '../search/search.css'
import {Modal} from 'antd-mobile'

const Search = (props) => {
    const{pageStyle , childStyle} = props;
    // console.log('peops' , props)
    // console.log('pageStyle' , pageStyle);
    //清除历史记录的方法(并且会有警告弹窗出现)

    //目前只是点击垃圾桶的时候让它隐藏,并不是真正的删除了历史记录
    const[close , setClose] = useState(false)
    const clearHistory  = () => {
        Modal.alert('', '确认要删除吗?', [
            { text: '取消', onPress: () => {}, style: 'default' },
            { text: '确认', onPress: () => {
                setClose(true);
            }},
        ]);
    }
    return (
        <div className='page-public' style={{display: pageStyle}}>
            <div className='search-header-public'>
                <div className='close' onClick={childStyle}></div>
                <div className='search-wrap'>
                    <input type='text' className='search' placeholder='请输入宝贝名称'></input>
                    <button type='button' className='search-btn'></button>
                </div>
            </div>
            <div className={close ?'search-main hide' :'search-main'}>
                    <div className='search-title-wrap'>
                        <div className='search-title'>最近搜索</div>
                        <div className='bin' onClick={clearHistory.bind(null)}></div>
                    </div>
                    <div className='search-keywords-wrap'>
                        <div className='keywords'>大码女装</div>
                        <div className='keywords'>大码女装</div>
                        <div className='keywords'>大码女装</div>
                        <div className='keywords'>大码女装</div>
                        <div className='keywords'>大码女装</div>
                        <div className='keywords'>大码女装</div>
                    </div>
            </div>
            <div className='search-main'>
                    <div className='search-title-wrap'>
                        <div className='search-title'>热门搜索</div>
                    </div>
                    <div className='search-keywords-wrap'>
                        <div className='keywords'>大码女装</div>
                        <div className='keywords'>大码女装</div>
                        <div className='keywords'>大码女装</div>
                        <div className='keywords'>大码女装</div>
                        <div className='keywords'>大码女装</div>
                        <div className='keywords'>大码女装</div>
                    </div>
            </div>
        </div>
    )
}

export default Search
