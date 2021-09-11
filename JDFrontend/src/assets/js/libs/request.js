import ReactDOM  from "react-dom";
//这里引用的fetch是可以兼容低版本浏览器的方法
import {fetch} from 'whatwg-fetch'
// ReactDOM(虚拟dom)可以加快获取dom的速度
let oLoad = ReactDOM.findDOMNode(document.getElementById('page-load'));
// 显示正在加载的状态
const showLoad = () =>{
    oLoad.style.display = 'block';
}
//正在加载的状态消失
const hideLoad = () =>{
    oLoad.style.display = 'none';
}

//请求幻灯片数据的方法
// pType = 'get'默认给予get请求
const getSwiper = (pUrl , pType = 'GET') =>{
    // 开始请求的时候加载动态
    showLoad();
    return fetch(pUrl , {method : pType}).then(res =>{ 
        // 请求完成之后停止加载
        hideLoad()
        return res.json()
    });
}

const getNav = (pUrl , pType = 'GET') =>{
   // 开始请求的时候加载动态
   showLoad();
   return fetch(pUrl , {method : pType}).then(res =>{ 
       // 请求完成之后停止加载
       hideLoad()
       return res.json()
   });
}

const getGoodsLevel = (pUrl , pType = 'GET') =>{
    // 开始请求的时候加载动态
    showLoad();
    return fetch(pUrl , {method : pType}).then(res =>{ 
        // 请求完成之后停止加载
        hideLoad()
        return res.json()
    });
}

const getReco = (pUrl , pType='GET') =>{
    // 开始请求的时候加载动态
    showLoad();
    return fetch(pUrl , {method : pType}).then(res =>{ 
        // 请求完成之后停止加载
        hideLoad()
        return res.json()
    });
}

//请求商品分类导航信息
const getClassify = (pUrl , pType='GET') => {
    showLoad();
    return fetch(pUrl , {method : pType}).then(res =>{
        hideLoad();
        return res.json();
    })
}

//请求分类的商品信息(不是主页面部分)
const getGoods = (pUrl , pType='GET') => {
    showLoad();
    return fetch(pUrl , {method : pType}).then(res => {
        hideLoad();
        return res.json();
    })
}

//请求热门搜索商品数据
const getHotKeywords = (pUrl , pType='GET') => {
    showLoad();
    return fetch(pUrl , {method: pType}).then(res =>{
        hideLoad();
        return res.json();
    })
}

//搜索筛选界面请求数据
const getData = (pUrl , pType='GET') => {
    showLoad();
    return fetch(pUrl , {method : pType}).then(res => {
        hideLoad();
        return res.json();
    })
}

//分类属性请求数据
const getClassifyAttr= (pUrl , pType='GET') => {
    showLoad();
    return fetch(pUrl , {method : pType}).then(res => {
        hideLoad();
        return res.json();
    })
}

//特定商品的分类属性请求数据
const getAttr= (pUrl , pType='GET') => {
    showLoad();
    return fetch(pUrl , {method : pType}).then(res => {
        hideLoad();
        return res.json();
    })
}

//获取商品的轮播图的数据
const getGoodsSwiper = (pUrl , pType='GET') => {

    showLoad();
    return fetch(pUrl , {method : pType}).then(res => {
        hideLoad();
        return res.json();
    })
}

//获取商品规格属性数据
const getGoodsAttr = (pUrl , pType='GET') => {

    showLoad();
    return fetch(pUrl , {method : pType}).then(res => {
        hideLoad();
        return res.json();
    })
}

//获取商品评价数据
const getGoodsReviews = (pUrl , pType='GET') => {

    showLoad();
    return fetch(pUrl , {method : pType}).then(res => {
        hideLoad();
        return res.json();
    })
}

//获取商品详情数据
const getDetails = (pUrl , pType='GET') => {

    showLoad();
    return fetch(pUrl , {method : pType}).then(res => {
        hideLoad();
        return res.json();
    })
}

//将get和post请求封装在一起
const request = (pUrl , pType = 'get'.toLocaleLowerCase() , data={}) => {
    showLoad();
    let config = {},
        headers = {},
        params = '';//params用来存储转成JSON格式后的数据 , headers用来存储请求头
    if(pType === 'file'.toLocaleLowerCase()){
        pType = 'post';
        if(data instanceof Object){
            params = new FormData();
            for(let key in data){
                params.append(key , data[key]);
            }
        }
        config = {
            method:pType,
            body:params
        }
    }else if(pType === 'get'.toLocaleLowerCase()){
        config = {
            method : pType
        }
    }else{
        //也就是post请求除了第二个对象参数中原本的method还要添加两个属性,一个是headers请求头,另一个params(传入的参数,不过这个参数要被转换为字符串拼接的样式)
        //这里需要一个head头
        headers = {
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
        if(data instanceof Object){
            //要将传入的参数转成字符串拼接的格式
            for(let key in data){
                // encodeURIComponent()会将特殊的字符进行转义(就比如所空格、中文),这样后台就能够成功读取数据了
                params+=`&${key}=${encodeURIComponent(data[key])}`
            }
            //第一个参数的前面不应该连接有&字符(截取指定位置字符串的方法,从索引位置1开始到之后,slice方法不会修改原来的字符串,但会返回指定索引位置的字符串)
            params = params.slice(1)
        }
        // console.log(params)
        config = {
            method : pType,
            headers, 
            body:params,
        }
    }
    // fetch这里用的fetch是高版本浏览器自带的,低版本要兼容的话要引入上面的
    return fetch(pUrl , config).then(res => {
        hideLoad();
        return res.json();
    })
}

export {getSwiper , getNav , getGoodsLevel , getReco , getClassify , getGoods , getHotKeywords , getData , getClassifyAttr , getAttr , getGoodsSwiper , getGoodsAttr , getGoodsReviews , getDetails , request};