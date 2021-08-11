//2.商品装车
// !=这里不用绝对不等于就是包含null和undefind两种,前面是有属性名但是没有值，后面是没有这个属性
const keywords = localStorage.keywords != null ? JSON.parse(localStorage.keywords) : [];
const searchRedux = (state={keywords:keywords} , action) => {
    // console.log('action' , action);
    //redux虽然可以跨组件获取到数据,但是没有保存数据的功能(视频中的解决方法是配合localStorage使用)
    // console.log('state' , state)
    switch(action.type){
        case 'addHk':
            // es6新增的对象的浅拷贝的方法
            state = Object.assign({} , state , action);
            // state =  {...state , keywords : action.keywords};
            break;
        default:
            break;
    }
    return state;
}

export default searchRedux;
