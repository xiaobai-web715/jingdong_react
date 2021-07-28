import React , {lazy , Suspense} from 'react';
import {HashRouter as Router , Route , Switch , Redirect} from 'react-router-dom'
// import Private from './routes/Private'
//这里路由拦截的时候要使用

import config from './assets/js/conf/config'
// console.log(config)

const JDIndex = lazy(()=>import('./page/home/jdIndex/Index'))

function RouterComponent() {
  return (
    <React.Fragment>
      <Router>
        <Suspense fallback={<React.Fragment></React.Fragment>}>
          <Switch>
            <Route path = {config.path + 'jd'}  component={JDIndex}></Route>
            <Redirect to = {config.path +'jd/home'}></Redirect>
          </Switch>
        </Suspense>
      </Router>
    </React.Fragment>
  );
}

export default RouterComponent;
