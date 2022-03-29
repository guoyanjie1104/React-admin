import React, { Component, useState,useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, HashRouter, useNavigate, Navigate,Redirect} from 'react-router-dom'
// import PropTypes from 'prop-types'
import axios from 'axios'
import storage from '../utils/storage'
import memory from '../utils/memory'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css'
import { render } from 'react-dom'

function Login() {
  const Nav = useNavigate()
  function login(event) {
    // event.prevent()
    var username = event.username
    var password = event.password
    var that = this
    console.log('aaaa');
    console.log(Nav);
    axios
      .get('http://localhost:5000/loginaxios',
        {
          params: {
            username, password
          }
        })
      .then(function (res) {
        console.log(res)
        if (res.data.code == 200) {
          message.info('登录成功')
          // 保存用户信息
          storage.saveUser({ username, password })
          memory.user = username
          Nav('admin', {
            replace: false,
            state: {
              id: '1',
              username,
              password
            }
          })
        } else {
          message.error(res.data.msg)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  // 函数组件生命周期
  useEffect(()=>{
    console.log(memory.user);
},[])
// state
const setLineData = React.useState(memory.user);
  // if(setLineData[0].username){
  //   console.log(setLineData[0].username);
  //   return (
  //    <div>
  //        登录成功 
        
  //     </div>
    
  //   )
  // }
  return (
    <div className='login'>
      <header className='toptitle'>后台管理系统</header>
      <section>
        <div className="formbox">
          <h2 className='title'>立即登录</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={login}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '请输入用户名', whitespace: true },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }, 
              { min: 4, message: '密码最少为4位'}, { max: 12, message: '密码最大为12位' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
    </div>
    // </Router>
  )
}
export default Login