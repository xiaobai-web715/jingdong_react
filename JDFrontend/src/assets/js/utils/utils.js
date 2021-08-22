//图片懒加载导入的文件
import echo from '../libs/echo';

//图片懒加载的方法
function lazyImg(){
    echo.init({
        offset:100,//可视区域多上像素可以被加载
        throttle:0,//设置图片延迟加载的时间
    })
}

//获取url?后面部分的方法
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
    } , 400)
}

export{
    lazyImg,
    localParam,
    setScrollTop,
}