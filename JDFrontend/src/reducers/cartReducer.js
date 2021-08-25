let cartData ={
    aCartData : localStorage['cartData'] !== undefined ? JSON.parse(localStorage['cartData']) : [],
    total : localStorage['total'] !== undefined ? JSON.parse(localStorage['total']) : 0,
}
//封装一下计算总价的方法
const setTotal = (state) => {
    //计算总价
    let total = 0;
    for(let key in state.aCartData){
        if(state.aCartData[key].checked){
            total += parseFloat(state.aCartData[key].price) * parseInt(state.aCartData[key].amount);
        }
    }
    // Math.round四舍五入的方法,.toFixed(2)保留两位小数
    state.total = parseInt(Math.round(total).toFixed(2));
    localStorage['total'] = JSON.stringify(state.total);
}
//添加商品
const addCart = (state , action) =>{
    //这样push的话没次添加的商品信息就会像aCartData里面添加
    let choose = false;
    if(state.aCartData.length > 0){
        for(let key in state.aCartData){
            if(state.aCartData[key].gid === action.gid && JSON.stringify(state.aCartData[key].attrs) === JSON.stringify(action.attrs)){
                //现在还并不完整,应该是颜色、尺寸之类的都一样才可以
                state.aCartData[key].amount += action.amount;
                choose = true;
                break;
            }
        }
    }
    if(!choose){
        state.aCartData.push(action)
    }
    setTotal(state);
    localStorage['cartData'] = JSON.stringify(state.aCartData)
}

//删除商品的方法
const delItem = (state , action) => {
    state.aCartData.splice(action.index , 1)
    setTotal(state);
    localStorage['cartData'] = JSON.stringify(state.aCartData)
}
//选择商品的方法
const checkItem = (state , action) => {
    state.aCartData[action.index].checked = action.checked;
    setTotal(state)
    localStorage['cartData'] = JSON.stringify(state.aCartData)
}
//全选商品的方法
const allCheck = (state , action) => {
    if(action.checked){
        for(let key in state.aCartData){
            state.aCartData[key].checked = true;
        }
    }else{
        for(let key in state.aCartData){
            state.aCartData[key].checked = false;
        }
    }
    setTotal(state)
    localStorage['cartData'] = JSON.stringify(state.aCartData)
}

//商品列表增加数量的方法
const incAmount =  (state , action) => {
    state.aCartData[action.index].amount += 1;
    setTotal(state)
    localStorage['cartData'] = JSON.stringify(state.aCartData)
}
const cartRedux = (state = cartData , action) => {
   switch(action.type){
       case 'addCart':
           addCart(state , action.data);
           //这里必须折磨来写,好使得状态刷新,如果只写return state的话,不算是状态改变,因为地址没有发生变化,不会触发组件刷新
           return Object.assign({} , state);
        case 'delItem':
            delItem(state , action.data);
            return Object.assign({} , state);
        case 'checkItem':
            checkItem(state , action.data);
            return Object.assign({} , state);
        case 'allItem':
            allCheck(state , action.data);
            return Object.assign({} , state);
        case 'incAmount':
            incAmount(state , action.data);
            return Object.assign({} , state);
        default:
            return Object.assign({} , state);
   } 
}

export default cartRedux
