import React, { Component } from 'react'
import {
  BrowserRouter, Routes, Route, Link, HashRouter,
  NavLink, Navigate, useNavigate, useParams, 
} from 'react-router-dom'
import axios from 'axios'
import { message } from 'antd';
import storage from '../utils/storage.js'
import App from '../../App'
// 左侧导航组件
import Leftnav from '../../components/left-nav/index.jsx';
// 头部
import Headernav from '../../components/header/index.jsx';
// 内容区
import Contentnav from '../../components/content/index.jsx';
import './admin.css'
// 导入路由
import Home from '../home/home'
import Categroy from '../categroy/categroy'
import Product from '../categroy/product'
import User from '../user/user'
import Bars from '../chars/bars'
import Line from '../chars/line'
import Pie from '../chars/pie'
import { Layout } from 'antd';
const { Content } = Layout;
class Admin extends React.Component {
  state = {
    routers: [],
    collapsed: false,
    isLoginout: false,
    loading: true,
  };
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  componentDidMount() {
    var that = this
    axios.get('http://localhost:5000/getrouter', { params: { username: 'admin', password: '1234' } }).then(function (res) {
      if (res.data.code == 200) {
        that.setState({
          routers: res.data.info,
          loading: false
        })
      }
    }).catch(function (error) {
      console.log(error)
    })
  }
  // 退出登录
  Loginout = () => {
    const hide = message.loading('退出登录..', 0);
    setTimeout(hide, 500);
    storage.removeUser()
    this.setState({
      isLoginout: true
    })
  }
  render() {
    const { collapsed } = this.state;
    const { loading } = this.state
    if (loading) {
      return <div>加载中</div>
    }
    return (
      // <BrowserRouter>
      <div>
        {this.state.isLoginout ? (<Navigate to='/' replace='true' />) :
          // <BrowserRouter>
          <Layout style={{ minHeight: '100vh' }}>
            <Leftnav value={this.state.routers}></Leftnav>
            <Layout className="site-layout">
              <Headernav></Headernav>
              {/* 内容区 */}
              <Content style={{ margin: '0 16px' }}>
                <div className="site-layout-background content" style={{ padding: 24, minHeight: 360 }}>
                  <NavLink to='categroy'>1111</NavLink>
                  <br/>
                  <Routes>
                      <Route path='/' element={<Home />}></Route>
                      <Route path='/home' element={<Home />}></Route>
                      <Route path='/categroy' element={<Categroy/>}></Route>
                      <Route path='product' element={<Product />}></Route>
                      <Route path='/user' element={<User />}></Route>
                      <Route path='/bars' element={<Bars />}></Route>
                      <Route path='/line' element={<Line />}></Route>
                      <Route path='/pie' element={<Pie />}></Route>
                  </Routes>
                </div>
              </Content>
              {/* <Contentnav></Contentnav> */}
              {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
            </Layout>
          </Layout>

          // </BrowserRouter>
        }
      </div>
      // </BrowserRouter>
    );
  }
}
export default Admin