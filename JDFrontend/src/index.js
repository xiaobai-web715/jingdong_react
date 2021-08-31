import React from 'react';
import 'whatwg-fetch';
//fetch兼容性的东西,需要 npm install whatwg-fetch --save手动安装一下(react不默认配置这个了)
//有了这个好像是可以在fetch请求里面说明是post请求还是request请求
import ReactDOM from 'react-dom';
import App from './app'
import './assets/js/conf/global.js'
// import RouterComponent from './router';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <>
    <App/>
    {/* <RouterComponent /> */}
  </>,
  document.getElementById('root')
);

reportWebVitals();
