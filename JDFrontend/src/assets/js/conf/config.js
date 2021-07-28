let prodUrl = 'http://reactshop.glbuys.com';
// 生产者环境

let devUrl = 'http://reactshop.glbuys.com';
// 开发者环境

let baseUrl = process.env.NODE_ENV === 'development' ? devUrl : prodUrl;

// console.log(process.env.NODE_ENV)

const config = {
    baseUrl:baseUrl,
    path:'/',
    // 这里会根据上传的服务器来改动
    token:'1ec949a15fb709370f'
}

export default config