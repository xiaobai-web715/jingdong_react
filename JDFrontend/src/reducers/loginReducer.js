let defaultState = {
    uid : localStorage['uid'] !== undefined?localStorage['uid'] : '',
    nickname : localStorage['nickname'] !== undefined?localStorage['nickname'] : '',
    authToken : localStorage['authToken'] !== undefined?localStorage['authToken'] : '',
    //这里要转一下,缓存里面的都是字符串
    isLogin : localStorage['isLogin'] !== undefined?Boolean(localStorage['isLogin']) : false,
}
const loginRedux = (state = defaultState , action) => {
    switch(action.type){
        case 'login':
            state.uid = action.data.uid;
            state.nickname = action.data.nickname;
            state.authToken = action.data.authToken;
            state.isLogin = action.data.isLogin;
            return Object.assign({} , state);
        case 'outLogin':
            //清空localStorage里面的缓存
            localStorage.removeItem('uid')
            localStorage.removeItem('nickname')
            localStorage.removeItem('authToken')
            localStorage.removeItem('isLogin')
            localStorage.removeItem('addressId')
            //安全退出的时候清空sessionStorage
            sessionStorage.removeItem('addressId')
            //清空redux里面的缓存
            state.uid = '';
            state.nickname = '';
            state.authToken = '';
            state.isLogin = false;
            return Object.assign({} , state);
        default :
            return state;
    }
}

export default loginRedux