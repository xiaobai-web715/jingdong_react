import RouterComponent from './router';
import React from 'react'
//reducer就是不同业务的redux商品装车(reducer方法返回的state对象)作为参数传递给combineReducers方法，所生成的最终的reducer对象
import reducer from './reducers/index'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

const App = () => {
    //3存入仓库(这里在创建store的时候可以另起一个单独的文件,以便于saga中间件的使用)
    const store = createStore(reducer);
    return (
        <Provider store={store}>
            <RouterComponent />
        </Provider>
    )
}

export default App
