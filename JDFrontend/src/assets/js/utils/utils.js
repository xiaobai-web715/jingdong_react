//图片懒加载导入的文件
import echo from '../libs/echo';

//图片懒加载的方法
function lazyImg(){
    echo.init({
        offset:100,//可视区域多上像素可以被加载
        throttle:0,//设置图片延迟加载的时间
    })
}

export{
    lazyImg,
}