//解决谷歌警告('window.webkitStorageInfo' is deprecated. Please use 'navigator.webkitTemporaryStorage' or 'navigator.webkitPersistentStorage' instead.)
//目前并不成功
// let storageInfo = null;
// if(navigator.webkitTemporaryStorage){
//     console.log('navigator.webkitTemporaryStorage' , navigator.webkitTemporaryStorage)
//     storageInfo = navigator.webkitTemporaryStorage;
// }else if(navigator.webkitPersistentStorage){
//     console.log('navigator.webkitPersistentStorage' , navigator.webkitPersistentStorage)
//     storageInfo = navigator.webkitPersistentStorage;
// }else{
//     console.log('window.webkitStorageInfo' , window.webkitStorageInfo)
//     storageInfo = window.webkitStorageInfo;
// }
//自执行匿名函数;这同样也是一个闭包的写法(可以让内存释放,防止内存的溢出,性能比较好)
(function(globals){
    // console.log('global' , global)
    //下面其实是在window下添加的属性,也就是全局的变量
    globals.global = {};
    global.scrollTop = {
        index : 0,
    }
    module.exports = global;
})(window)