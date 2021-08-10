import React , {useState , useEffect} from 'react'
import {useDispatch , useSelector} from 'react-redux'
import  '../search/search.css'
import {Modal} from 'antd-mobile'
import _ from 'lodash'
import config from '../../assets/js/conf/config'
import { getHotKeywords } from '../../assets/js/libs/request'

const Search = (props) => {
    //4.获取商品信息
    const {keywords} = useSelector((state) => state.searchRedux);
    // console.log('keywords' , keywords)
    const{pageStyle , childStyle} = props;
    const[datasHotKeywords , setDatasHotKeywords] = useState([]);
    // console.log('peops' , props)
    // console.log('pageStyle' , pageStyle);
    //清除历史记录的方法(并且会有警告弹窗出现)

    //目前只是点击垃圾桶的时候让它隐藏,并不是真正的删除了历史记录
    const[close , setClose] = useState(false)
    //获取搜索数据
    const[obtainKeyword , setObtainKeyword] = useState('');
    //存储搜索数据
    //这里也要修改相应的初始值,使得刷新后的再次搜索是在上一次的历史数据上做逻辑处理,同样也是防止初次挂载的时候执行useEffec钩子使得传进去数据同样是空数组,同样造成刷新页面之后历史数据无法保存的现象(这只是一个现象,历史数据其实成功保存在了localStorage里面,只是受到传入的默认空值的影响,而达不到想要其显示的效果)
    // const[aKeywords , setAKeywords] = useState([]);
    const[aKeywords , setAKeywords] = useState(keywords);
    // console.log('aKeywords' , aKeywords);
    const clearHistory  = () => {
        Modal.alert('', '确认要删除吗?', [
            { text: '取消', onPress: () => {}, style: 'default' },
            { text: '确认', onPress: () => {
                setClose(true);
            }},
        ]);
    }

    //获取热门搜索数据
    useEffect(()=>{
        const dataHotKeywords = async()=>{
            try{
                const res = await getHotKeywords(config.baseUrl + 'api/home/public/hotwords?token=' + config.token);
                // console.log('res' , res);
                setDatasHotKeywords(_.get(res , ['data'] , []));
            }catch(err){
                console.log('请求热门数据出错' , err);
            }
        }
        dataHotKeywords();
    },[])

    //点击搜索按钮触发事件(onChange会触发改变obtainKeyword状态的效果,当点击的时候就是最后一次触发也就是最新的obtainKeyword,同样也是我们想要的数据)
    const addHistoryKeywords = ()=>{
        // console.log('obtainKeyword' , obtainKeyword)
        //去掉重复的搜索
        for(let i = 0 ; i<aKeywords.length ; i++){
            if(aKeywords[i] === obtainKeyword){
                aKeywords.splice(i , 1);
            }
        }
        //这里使用localStorage存储数据的功能配合redux使用(解决redux无法存储数据的能力,但要注意的是localStorage只能存储字符串)
        //!!!这里要记得不要放在useEffect里面,要不组件挂载的时候照样给你变成空
        localStorage['keywords'] = JSON.stringify([obtainKeyword , ...aKeywords ]);
        //虽然这里放在了localStorage里面,但是下面选购商品的时候在初始挂载的时候还是会传给仓库一个空值(因为初始值开始设置的是空值)
        // console.log('localStorage[\'keywords\']' , localStorage['keywords'])
        //更新状态,并将最新的搜索放在前面
        setAKeywords([obtainKeyword , ...aKeywords ]);
    }
    const dispatch = useDispatch();
    useEffect(()=>{
        // localStorage['keywords'] = JSON.stringify(aKeywords );这样组件挂载的时候会给你将里面的数据刷成空数组
        //1.选购商品信息(这里就将新的内容传给了仓库里面的action)
        dispatch({type:'addHk' , keywords : aKeywords});
        // console.log('我刷新了哦')
    },[aKeywords , dispatch])
    return (
        <div className='page-public' style={{display: pageStyle}}>
            <div className='search-header-public'>
                <div className='close' onClick={childStyle}></div>
                <div className='search-wrap'>
                    <input type='text' className='search' placeholder='请输入宝贝名称' onChange={(e)=>{setObtainKeyword(e.target.value)}}></input>
                    <button type='button' className='search-btn' onClick={addHistoryKeywords.bind(null)}></button>
                </div>
            </div>
            <div className={close ?'search-main hide' :'search-main'}>
                    <div className='search-title-wrap'>
                        <div className='search-title'>最近搜索</div>
                        <div className='bin' onClick={clearHistory.bind(null)}></div>
                    </div>
                    <div className='search-keywords-wrap'>
                        {
                            aKeywords !=null?
                            aKeywords.map((item , index) => {
                                    return (
                                        <div className='keywords' key={index}>{item}</div>
                                    )
                                }):''
                        }
                    </div>
            </div>
            <div className='search-main'>
                    <div className='search-title-wrap'>
                        <div className='search-title'>热门搜索</div>
                    </div>
                    <div className='search-keywords-wrap'>
                        {
                            datasHotKeywords.map((item , index)=>{
                                return(
                                    <div className='keywords' key={index}>{item.title}</div>
                                )
                            })
                        }
                        {/* <div className='keywords'>大码女装</div>
                        <div className='keywords'>大码女装</div>
                        <div className='keywords'>大码女装</div>
                        <div className='keywords'>大码女装</div>
                        <div className='keywords'>大码女装</div>
                        <div className='keywords'>大码女装</div> */}
                    </div>
            </div>
        </div>
    )
}

export default Search
