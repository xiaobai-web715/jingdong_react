import ReactDOM  from "react-dom";
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

export {getSwiper , getNav , getGoodsLevel , getReco , getClassify , getGoods , getHotKeywords , getData , getClassifyAttr , getAttr};