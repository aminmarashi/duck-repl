import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const searchParams = Array.from(new URLSearchParams(window.location.search));
const options = searchParams.reduce<{page?: number, isEditMode: boolean}>((accumulator, param: [string, string]) => {
  if (param[0] === 'page') {
    return {
      ...accumulator,
      page: parseInt(param[1])
    };
  }
  if (param[0] === 'edit') {
    return {
      ...accumulator,
      isEditMode: !!param[1]
    };
  }
  return accumulator
}, { page: undefined, isEditMode: false });

ReactDOM.render(
  <React.StrictMode>
    <App {...options} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
