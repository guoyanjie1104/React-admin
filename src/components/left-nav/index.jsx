import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
import axios from 'axios'
import {
    PieChartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import './index.css'
const { Sider } = Layout;
const { SubMenu } = Menu;
const Leftnav = () => {
    const Nav = useNavigate()
    const [routers, getroute] = useState([])
    useEffect(function a() {
        axios.get('http://localhost:5000/getrouter', { params: { username: 'admin', password: '1234' } }).then(function (res) {
            if (res.data.code == 200) {
                getroute(res.data.info)
            }
        }).catch(function (error) {
        })
    },[routers])
    const onCollapse = collapsed => {
        console.log(collapsed);
    };
    const select = (e) => {
        var route = e.key
        Nav(route)
    }
    return (
        <div className='leftnav'>
            <Sider collapsible collapsed={false} onCollapse={onCollapse}>
                <div className="logo">后台管理系统</div>
                <Menu theme="dark" mode="inline" onSelect={select}>
                    {
                        routers.map(item => {
                            return item.children ? (<SubMenu key={item.pathname} icon={<UserOutlined />} title={item.name}>
                                {item.children ? item.children.map(el => <Menu.Item key={el.pathname}>{el.name}</Menu.Item>) : ''}
                            </SubMenu>) : (<Menu.Item key={item.pathname} icon={<PieChartOutlined />}>
                                {item.name}
                            </Menu.Item>
                            )
                        }
                        )
                    }
                </Menu>
            </Sider>
        </div>
    );
    // }
}

export default Leftnav;