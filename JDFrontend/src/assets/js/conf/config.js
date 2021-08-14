// let prodUrl = 'http://vueshop.glbuys.com';
let prodUrl = '//vueshop.glbuys.com';//修改成这样接口可以自动识别http还是https
// 生产者环境

// let devUrl = 'http://vueshop.glbuys.com';
let devUrl = '/proxy';
// 开发者环境(这里就可以替换成咱们自己写的代理)

let baseUrl = process.env.NODE_ENV === 'development' ? devUrl : prodUrl;
// development就是开发者环境
// console.log(process.env.NODE_ENV)

const config = {
    baseUrl:baseUrl,
    path:'/',
    // 这里会根据上传的服务器来改动
    token:'1ec949a15fb709370f'
}

export default config