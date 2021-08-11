import React , {useState , useEffect} from 'react'
import {useDispatch , useSelector} from 'react-redux'
import  '../search/search.css'
import {Modal} from 'antd-mobile'
import _ from 'lodash'
import config from '../../assets/js/conf/config'
import { getHotKeywords } from '../../assets/js/libs/request'
//对action的获取进行封装,这样就不用直接写在dispatch里面了
import { setHistoryKeywords } from '../../actions/hkAction'
//子组件里面没法做路由,所以引入这个来使得路由能够修改
import { withRouter } from 'react-router'

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
    //这是目前的解决思路,在最初的状态localStorage.keywords没被创建时用的是keywords,也就是里面默认localStorage.keywords是null或undefined是的空数组[]
    const[aKeywords , setAKeywords] = useState(JSON.parse(localStorage.keywords) || keywords);
    // console.log('aKeywords' , aKeywords);
    const clearHistory  = () => {
        Modal.alert('', '确认要删除吗?', [
            { text: '取消', onPress: () => {}, style: 'default' },
            { text: '确认', onPress: () => {
                setClose(true);
                localStorage.removeItem('keywords');
                setAKeywords([]);
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
        //更新状态,并将最新的搜索放在前面
        //这里判断一下如果是空字符串的话就让他添加进数据集里面
        if(Boolean(obtainKeyword)){
            //这里使用localStorage存储数据的功能配合redux使用(解决redux无法存储数据的能力,但要注意的是localStorage只能存储字符串)
            //!!!这里要记得不要放在useEffect里面,要不组件挂载的时候照样给你变成空
            localStorage['keywords'] = JSON.stringify([obtainKeyword , ...aKeywords ]);
            //虽然这里放在了localStorage里面,但是下面选购商品的时候在初始挂载的时候还是会传给仓库一个空值(因为初始值开始设置的是空值)
            // console.log('localStorage[\'keywords\']' , localStorage['keywords'])
            setAKeywords([obtainKeyword , ...aKeywords ]);
            // localStorage['keywords'] = JSON.stringify(aKeywords );这样组件挂载的时候会给你将里面的数据刷成空数组

            //这里加上一个url跳转时返回之后搜索历史不显示这次的记录,但是localStorage里面有，刷新之后就能显示出来
            goPage('goods/search/?keywords=' + obtainKeyword)
            //目前按我自己的代码来说,问题的症结在于组件挂载时的初始值,因为只有该组件挂载与卸载,并不会触发redux里面赋予默认初始值是localStorage里面值的操作（也就是setAKeywords([obtainKeyword , ...aKeywords ])虽然我改变了这个状态,但rnm的组件卸载再挂载时的被keywords这个玩意给还原了,所以就产生了你搜索之后返回时搜索历史没有发生变化）
        }
        //触发搜索之后将input里面的值清空
        setObtainKeyword('');
    }
    const dispatch = useDispatch();
    useEffect(()=>{
        if(aKeywords.length > 0){
            setClose(false);
        }else{
            setClose(true);
        }
        //1.选购商品信息(这里就将新的内容传给了仓库里面的action)
        //这里也不能写进addHistoryKeywords这个点击事件里面,因为那样传的值是状态刷新之前的值
        dispatch(setHistoryKeywords(aKeywords));
        // dispatch(setHistoryKeywords(aKeywords));
        // console.log('我刷新了哦')
    },[aKeywords , dispatch])

    //点击搜索历史触发跳转到商品搜索信息的页面
    const goPage = (url)=>{
        // console.log('url' , url)
        // console.log('config.baseUrl + url' , config.baseUrl + url)
        props.history.push(config.path + url);
    }
    return (
        <div className='page-public' style={{display: pageStyle}}>
            <div className='search-header-public'>
                <div className='close' onClick={childStyle}></div>
                <div className='search-wrap'>
                    <input type='text' value={obtainKeyword} className='search' placeholder='请输入宝贝名称' onChange={(e)=>{setObtainKeyword(e.target.value)}}></input>
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
                                        <div className='keywords' key={index} onClick={goPage.bind(null , 'goods/search?keywords='+item)}>{item}</div>
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
                                    <div className='keywords' key={index} onClick={goPage.bind(null , 'goods/search?keywords='+item.title)}>{item.title}</div>
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

export default withRouter(Search)
