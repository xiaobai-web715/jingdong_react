//请求幻灯片数据的方法
// pType = 'get'默认给予get请求
const getSwiper = (pUrl , pType = 'GET') =>{
    return fetch(pUrl , {method : pType}).then(res => res.json());
}

const getNav = (pUrl , pType = 'GET') =>{
    return fetch(pUrl , {method : pType}).then(res => res.json());
}

const getGoodsLevel = (pUrl , pType = 'GET') =>{
    return fetch(pUrl , {method : pType}).then(res => res.json());
}

const getReco = (pUrl , pType='GET') =>{
    return fetch(pUrl , {method : pType}).then(res => res.json());
}


export {getSwiper , getNav , getGoodsLevel , getReco};