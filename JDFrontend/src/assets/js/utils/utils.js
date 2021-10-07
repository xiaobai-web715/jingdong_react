//图片懒加载导入的文件
import echo from '../libs/echo';
import config from '../../../assets/js/conf/config'
import { setOutLogin } from '../../../actions/outLoginAction';
import { request } from '../../../assets/js/libs/request';
import { setClearCart } from '../../../actions/clearCartAction';

//图片懒加载的方法
function lazyImg(){
    echo.init({
        offset:100,//可视区域多上像素可以被加载
        throttle:0,//设置图片延迟加载的时间
    })
}

//获取url?后面部分的方法,这些保存在了props.location.search里面,下面的方法返回一个对象(对象中有解析出来的search属性 => 这个属性是包含键值对的一个对象)
function localParam(search , hash){
    // search如果是传值的话就用传来的值计算，如果没有传值，就默认window.location.search也就是url后面的？后面的那部分
    search = search || window.location.search
    // hash的话没有传值就默认通过window.location.hash获取url#后面的那部分不包括？后面的
    hash = hash || window.location.hash
    //下面这个函数是吧？后面的那部分通过正则转化成一个json对象，这样就可以去使用了
    var fn = function(str , reg){
        if(str){
            var data = {};
            str.replace(reg , function($0 , $1 , $2 , $3){
                data[$1] = $3
            })
            return data
        }
    }
    return{
        search : fn(search , new RegExp("([^?=&]+)(=([^&]*))?" , "g")) || {},
        hash : fn(hash , new RegExp("([^#=&]+)(=([^&]*))?" , "g")) || {}
    }
}
//解决滚动定位问题
const setScrollTop = (val) => {
    setTimeout(() => {
        // 兼容谷歌和火狐的写法
        document.body.scrollTop = val;
        document.documentElement.scrollTop = val;
    } , 300)
}

//会员登录安全验证
const safeAuth = (uid , authToken , props , dispatch) => {
    let sUrl = config.baseUrl + '/api/home/user/safe?token=' + config.token;
    try{
        // 这样写就是获得了一个promise对象
        // let a = request(sUrl , 'post' , {uid})
        request(sUrl , 'post' , {uid , auth_token : authToken}).then(res => {
            // console.log('res' , res)
            if(res.code !== 200){
                //这里只要没访问权限,就会触发这个redux将localStorage里面的数据状态清空
                // (像这种写成函数的形式而不是react组件的样式,是不能够直接在这里面引用钩子hook的,多以我外面创建好的dispatch当做参数传进来了,目前来看是可行的)
                //安全退出触发redux的操作来清空用户信息和购物车里面的存储在redux和localStorage里面的数据
                dispatch(setOutLogin())
                dispatch(setClearCart())
                //直接将页面跳转到登录页面
                props.history.replace(config.path + 'login/index')
            }
        })
    }catch(err){
        console.log('err' , err)
    }
}
export{
    lazyImg,
    localParam,
    setScrollTop,
    safeAuth,
}