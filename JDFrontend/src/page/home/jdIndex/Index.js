import React , {lazy , Suspense , useState , useEffect} from 'react';
import  "../../../assets/css/common/Index/Index.css"
import {Route , Switch} from 'react-router-dom'
import config from '../../../assets/js/conf/config'

const HomeIndex = lazy(()=>import('../homeRouter/HomeIndex'))
const CartIndex = lazy(()=>import('../cartRouter/CartIndex'))
const UserIndex = lazy(()=>import('../../user/userRouter/userIndex'))

const JDIndex = (props) => {
    // 这里传入的props会因为url的变化，而改变，当props改变时，就会触发useEffect执行(这里要注意，无论是props改变，还是useState的状态改变，都是刷新组件，并不会重新挂载组件，挂载组件的这个过程已经在最开始完成了)
    // console.log('props' , props)//这也就是打印台为什么会一次执行两遍console.log的原因
    const [stateStyle , setStateStyle] = useState({})
    // console.log('stateStyle' , stateStyle)
    // {}这里最初不用赋值，因为执行到useEffect的时候会改变这个状态，再重新加载组件
    const goPage = (pUrl) =>{
        props.history.replace(config.path + pUrl);
        // replace的作用是不让其添加到历史记录里面去
        // props.history.push(config.path + pUrl);
        // 如果用的是push的话，当点击同一个地方两次的时候，会有一个警告
        //这里必须加入这个config.path才不会出错(不加上的话，就会一直在前面添加根路径，也就是jd)(目前还不清楚为啥)
    }
    useEffect(()=>{
        let isUnmounted = false;
        if(!isUnmounted){
            switch(props.location.pathname){
                case config.path + 'jd/home':
                    setStateStyle({bHomeStyle : true , bCartStyle : false , bUserStyle : false})
                    break;
                case config.path + 'jd/cart':
                    setStateStyle({bCartStyle : true , bHomeStyle : false , bUserStyle : false})
                    break;
                case config.path + 'jd/user':
                    setStateStyle({bUserStyle : true , bCartStyle : false , bHomeStyle : false})
                    break;
                // 这一段最好加上，要不然会报错
                default:
                    break;
    
            }
        }
        return () => {
            isUnmounted = true;
        }
    },[props])
    return (
        <div className='app'>
            {/* 主页面 */}
            <Suspense fallback={<React.Fragment></React.Fragment>}>
                <Switch>
                    <Route path = {config.path + 'jd/home'}  component={HomeIndex}></Route>
                    <Route path = {config.path + 'jd/cart'}  component={CartIndex}></Route>
                    <Route path = {config.path + 'jd/user'}  component={UserIndex}></Route>
                </Switch>
            </Suspense>
            <div className ='bottom-nav'>
                <ul onClick={goPage.bind(null , 'jd/home')}>
                    <li className={stateStyle.bHomeStyle?'home active' : 'home'}></li>
                    <li className={stateStyle.bHomeStyle?'text active' : 'text'}>首页</li>
                </ul>
                <ul onClick={goPage.bind(null , 'jd/cart')}>
                    <li className={stateStyle.bCartStyle?'cart active' : 'cart'}></li>
                    <li className={stateStyle.bCartStyle?'text active' : 'text'}>购物</li>
                </ul>
                <ul onClick={goPage.bind(null , 'jd/user')}>
                    <li className={stateStyle.bUserStyle?'user active' : 'user'}></li>
                    <li className={stateStyle.bUserStyle?'text active' : 'text'}>我的</li>
                </ul>
            </div>
        </div>
    )
}

export default JDIndex
