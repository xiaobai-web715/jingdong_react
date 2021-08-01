//请求幻灯片数据的方法
// pType = 'get'默认给予get请求
const requestHDP = (pUrl , pType = 'GET') =>{
    return fetch(pUrl , {method : pType}).then(res => res.json());
}

export default requestHDP;