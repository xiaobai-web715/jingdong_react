import React , {lazy , Suspense} from 'react';
import {HashRouter as Router , Route , Switch , Redirect} from 'react-router-dom'
// import Private from './routes/Private'
//这里路由拦截的时候要使用

import  "./assets/css/common/public/public.css"
import config from './assets/js/conf/config'
import { AuthRoute } from './routes/Private';

const JDIndex = lazy(()=>import('./page/home/jdIndex/Index'))
const ClassfiyIndex = lazy(() => import('./page/home/goodsRouter/ClassfiyIndex'))
const SearchIndex = lazy(() => import('./page/home/goodsRouter/search'))
const DetailsIndex = lazy(() => import('./page/home/goodsRouter/details'))
const LoginIndex = lazy(() => import('./page/home/loginRouter/loginIndex'))
const RegIndex = lazy(() => import('./page/home/regRouter/regIndex'))
const BalanceIndex = lazy(() => import('./page/home/balanceRouter/balanceIndex'))
const AddressIndex = lazy(() => import('./page/home/address/index'))
const AddressAdd = lazy(() => import('./page/home/address/add'))
const AddressMod = lazy(() => import('./page/home/address/mod'))
const BalanceEnd = lazy(() => import('./page/home/balanceRouter/endIndex'))

function RouterComponent() {
  return (
    <React.Fragment>
      <Router>
        <Suspense fallback={<React.Fragment></React.Fragment>}>
          <Switch>
            {/* 根目录路由 */}
            <Route path = {config.path + 'jd'}  component={JDIndex}></Route>
            {/* 这里之所以不可以写成jd/goods/classify是因为根路由是模糊匹配,这样上面的根组件也会被加载,但是你还没办法给上面加上exact,因为路由嵌套子路由用的就是模糊匹配的原则 */}
            {/* 而这里你是想让他是另一个页面组件,前缀不一样就可以避免模糊匹配先匹配到上面那个，然后再去子路由里面找对应路由加载的组件,这样就造成我所看到的奇怪的现象,url是对的,但是会有JDIndex组件里面的底部导航在 */}

            {/* 这里也用到了模糊匹配路由的原则,这样就可以做到点击菜单,菜单栏不会消失，但是内容会根据不同的路由去加载 */}
            {/* 只要路由与路由不呈现包含关系就不会触发模糊匹配 */}
            <Route path = {config.path + 'goods/classify'}  component={ClassfiyIndex}></Route>
            <Route path = {config.path + 'goods/search'}  component={SearchIndex}></Route>
            <Route path = {config.path + 'goods/details'}  component={DetailsIndex}></Route>
            <Route path = {config.path + 'login/index'}  component={LoginIndex}></Route>
            <Route path = {config.path + 'reg/index'}  component={RegIndex}></Route>
            {/* 这里加了这个路由认证就不会路由跳转而导致页面闪抖了 */}
            <AuthRoute path = {config.path + 'balance/index'}  component={BalanceIndex}></AuthRoute>
            <AuthRoute path = {config.path + 'address/index'}  component={AddressIndex}></AuthRoute>
            {/* 添加收货地址 */}
            <AuthRoute path = {config.path + 'address/add'}  component={AddressAdd}></AuthRoute>
            {/* 修改收货地址 */}
            <AuthRoute path = {config.path + 'address/mod'}  component={AddressMod}></AuthRoute>
            {/* 订单结束页面 */}
            <AuthRoute path = {config.path + 'balance/end'}  component={BalanceEnd}></AuthRoute>
            <Redirect to = {config.path +'jd/home'}></Redirect>
          </Switch>
        </Suspense>
      </Router>
    </React.Fragment>
  );
}

export default RouterComponent;
