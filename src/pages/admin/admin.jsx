import React, { Component } from 'react'
import {
  BrowserRouter, Routes, Route, Link, HashRouter,
  NavLink, Navigate, useNavigate, useParams,useLocation
} from 'react-router-dom'
import axios from 'axios'
import { message, Layout } from 'antd'
import storage from '../utils/storage.js'
import PubSub from 'pubsub-js'
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
const { Content, Header } = Layout;
class Admin extends React.Component {
  constructor(props){
    super(props)
    console.log(useLocation);
    var routeq = localStorage.getItem('getroute')
    var routepath = localStorage.getItem('getroutepath')
    this.state={
      routename: routeq||'首页',
      routepath:'/'+routepath||'/home',
      routers: [],
      collapsed: false,
      isLoginout: false,
      loading: true,
    }
  }
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  mySubscriber = (msg, data) => {
    console.log(msg, data);
    console.log(this);
    var routeq = localStorage.getItem('getroute')
    this.setState({
      routename: routeq||data
    })
  }
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
    // pubsub.subscribe('delete',(data)=>{
    //   console.log(data);  
    //   })
    var routeq = localStorage.getItem('getroute')
    var token = PubSub.subscribe('getroute', this.mySubscriber);
  }
  componentDidUpdate(){
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
   return null
  }
  componentWillUnmount(){
    localStorage.removeItem('getroute')
  }
  // 退出登录
  Loginout = () => {
    const hide = message.loading('退出登录..', 0);
    localStorage.removeItem('getroutesub')
    localStorage.removeItem('getroutepath')
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
              {/* <Headernav></Headernav> */}
              <Header className="site-layout-background box" style={{ padding: 0 }} >
                <div className="top">
                  <div>欢迎admin</div>
                  <div style={{ margin: '0px 10px' }}>|</div>
                  <div onClick={this.Loginout} className='loginout'>退出</div>
                </div>
                <div className='routename'>
                  {this.state.routename}
                </div>
              </Header>
              {/* 内容区 */}
              <Content style={{ margin: '0 16px' }}>
                <div className="site-layout-background content" style={{ padding: 24, minHeight: 360 }}>
                  <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/home' element={<Home />}></Route>
                    <Route path='/categroy' element={<Categroy />}></Route>
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
