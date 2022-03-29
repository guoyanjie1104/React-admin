
import React from 'react'
import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import 'antd/dist/antd.min.css';
// import login from './pages/login/login';
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import Home from './pages/home/home'
import { BrowserRouter, Routes, Route, Link, HashRouter, withRouter, NavLink, Navigate, useNavigate,
   useParams,useRoutes } from 'react-router-dom'
// class App extends React.Component{
//   render(){
//     return(
      
//       // <BrowserRouter>
//       // <Routes>
//       //   <Route path='/' element={<Login />}></Route>
//       //   <Route path='/admin' element={<Admin />}></Route>
//       // </Routes>
//     // </BrowserRouter>
//     )
//   }
// }
const App = () => {
  let routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/admin/*", element: <Admin /> },
    // { path: "/product", element: <Home /> },
  ]);
  return routes;
};
export default App;
