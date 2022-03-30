import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Link, HashRouter, useNavigate } from 'react-router-dom'
import storage from './pages/utils/storage'
import memory from './pages/utils/memory'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
// import { createStore, combineReducers } from 'redux'
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { incrementAction, reduceAction, calculate ,store} from './store/store';
const user = storage.getUser()
memory.user = user
console.log(store);
console.log(store.getState());
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />,
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
