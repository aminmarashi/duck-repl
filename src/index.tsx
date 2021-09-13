import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const searchParams = Array.from(new URLSearchParams(window.location.search));
const page = searchParams.reduce((page: number, param: [string, string]) => {
  if (param[0] === 'page') {
    return parseInt(param[1]);
  }
  return page;
}, 1);

ReactDOM.render(
  <React.StrictMode>
    <App page={page}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
