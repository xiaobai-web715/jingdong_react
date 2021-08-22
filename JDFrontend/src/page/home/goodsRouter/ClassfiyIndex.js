import React , {lazy , useEffect , useState} from 'react'
import {Route , Switch} from 'react-router-dom'
import '../../../assets/css/common/goods/classify.css'
import config from '../../../assets/js/conf/config'
//将搜索组件引入分类商品当中
import Search from '../../../components/search/search'

import { getClassify } from '../../../assets/js/libs/request'
import { localParam } from '../../../assets/js/utils/utils'
import IScroll from '../../../assets/js/libs/iscroll'
import _ from 'lodash'

const ItemIndex = lazy(()=>import('./Item'))

const ClassfiyIndex = (props) => {
    let targetScrollClassify = null,
        targetClassifyItem = null;
        // myIscorll = null;
    //这里本来打算用一个变量来直接获取new IScroll的值,不过一直报错,现在还是启用的原来的用状态来保存的方式
    const [myIscorll , setMyIscorll] = useState(null)
        //保存数据的状态
    const [dataClassify , setDataClassify] = useState([]);
    //返回上一个push页面的方法
    const GoBack = () => {
        props.history.goBack();
    }
    //这个iscroll要根据请求的导航数据作相应的变化,其实就是从初始挂载到数据请求状态改变这两个就可以
    const myScroll = () => {
        targetScrollClassify.addEventListener('touchmove' , function(e){e.preventDefault();} , false);
        let iscorll = new IScroll(targetScrollClassify , {
            scrollX : false,
            scrollY : true,
            preventDefault : false,
        });
        setMyIscorll(iscorll);
    }
    //iscorll组件操作导航滑动效果
    useEffect(() => { 
        let isUnmounted = false;
        if(!isUnmounted){
            myScroll();
        }
        return () => {
            isUnmounted = true;
        }
    },[dataClassify])// eslint-disable-line react-hooks/exhaustive-deps
    //获取导航分类数据的请求方法
    useState(() => {
        let isUnmounted = false;
        const getDataClassify = async() =>{
            try{
                const res = await getClassify(config.baseUrl + '/api/home/category/menu?token=' + config.token);
                // console.log('res...' , res)
                // 创建一个中间副本来添加一个决定样式的条件
                const classifyData = _.get(res , ['data'] , []),
                      classifyDataLen = classifyData.length;
                for(let i = 0 ; i < classifyDataLen ; i++){
                    classifyData[i].bActive = false;
                }
                //这里还需要增加一个刷新匹配对应导航变红样式的效果(本来想写成函数放在外面,但是触发不了组件的刷新,所以就在修改数据状态之前去修改这个参数)
                const cid =  _.get(localParam(props.location.search) , ['search' , 'cid'] , '492');
                // console.log('cid' , cid)
                if(classifyData.length > 0){
                    for(let i = 0 ; i < classifyData.length ; i++){
                        if(classifyData[i].cid === cid){
                            classifyData[i].bActive = true;
                            break;//break跳出循环
                        }
                    }
                }
                // console.log('classifyData' , classifyData)
                if(!isUnmounted){
                    setDataClassify(classifyData);
                }
            }catch(err){
                console.log('请求分类商品导航数据出错' , err);
            }
        }
        getDataClassify();
        return () => {
            isUnmounted = true;
        }
    } , [])

    //点击导航事件触发效果
    const clickNav = (pUrl , pIndex) => {
        for(let i = 0 ; i < dataClassify.length ; i++){
            dataClassify[i].bActive = false;
        }
        dataClassify[pIndex].bActive = true;
        //refDiv与scrollClassify在这里你就可以理解为最原始的点击事件传进来的e里面记录的你点击的DOM元素的情况
        // console.log('scrollClassify' , scrollClassify);
        //获取整个页面的高度
        let iScorllHeight = Math.round(targetScrollClassify.offsetHeight);
        //获取点击位置距离页面顶部的高度
        let iTopHeight = Math.round(parseInt(targetClassifyItem.offsetHeight)*pIndex);
        //获取整个DOM元素的高度
        let DOMScorllHeight = Math.round(targetScrollClassify.scrollHeight )
        //这里是做一个限制条件,当点击位置超过页面的1/3的时候才会触发自动滑动的效果
        //再增加一个限制条件就是当点击的地方距父DOM元素的底部的距离小于可视界面高度的时候就不让其触发动画效果
        let iDOMBottomHeight = DOMScorllHeight - iTopHeight;
        if(iTopHeight >= Math.round(iScorllHeight/3) && iDOMBottomHeight > iScorllHeight){
            myIscorll.scrollTo(0 , -iTopHeight , 300 , IScroll.utils.ease.elastic);
        }
        props.history.replace(config.path + pUrl)
    }
    // 从下面的打印与否我们可以知道上面的dataClassify[pIndex].bActive = true;并没有改变状态
    // useEffect(()=>{
    //     console.log('我刷新了哦')
    // },[dataClassify])

    //添加搜索组件所需要的的状态属性
    const[pageStyle , setPageStyle] = useState('none');
    //点击搜索框的时候改变上面的状态变为true
    const changeSearch = () => {
        setPageStyle('block');
    }
    //下面这个函数会传进搜索组件里面,当组件内部触发关闭事件时,会将上面的状态变成false从而使得搜索组件加载不出来
    const getStyle = () =>{
        setPageStyle('none');
    }
    return (
        <div>
           <div className = 'classify-search-header'>
               <div className = 'back' onClick={GoBack.bind(null)}></div>
               <div className = 'search' onClick={changeSearch.bind(null)}>请输入宝贝名称</div>
            </div> 
            <div className = 'goods-main'>
                <div ref={div => targetScrollClassify = div}  className='classify-wrap'>
                    <div>{/*之所以加这一层就是为了满足引入外部iscorll组件的3层标签结构*/}
                        {
                            dataClassify.map((item , index) => {
                                return (
                                    <div ref={div => targetClassifyItem = div} className={item.bActive?'classify-item active' : 'classify-item'} key = {index} onClick={clickNav.bind(null , 'goods/classify/items?cid=' + item.cid , index)}>{item.title}</div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='goods-content'>
                    {/* 但凡涉及到路由加载组件的都要用路由懒加载 */}
                    <Switch>
                        <Route path ={config.path + 'goods/classify/items'} component={ItemIndex}></Route>
                    </Switch>
                </div>
            </div>
            <Search pageStyle={pageStyle} childStyle = {getStyle.bind(null)}></Search>
        </div>
    )
}

export default ClassfiyIndex
