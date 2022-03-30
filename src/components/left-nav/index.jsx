import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    PieChartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import './index.css'
import PubSub from 'pubsub-js'
const { Sider } = Layout;
const { SubMenu } = Menu;
const Leftnav = (props) => {
    console.log(props);
    const Nav = useNavigate()
    const [routers, getroute] = useState([])
    // useEffect(function a() {
    //     axios.get('http://localhost:5000/getrouter', { params: { username: 'admin', password: '1234' } }).then(function (res) {
    //         if (res.data.code == 200) {
    //             getroute(res.data.info)
    //         }
    //     }).catch(function (error) {
    //     })
    // },[routers])
    const onCollapse = collapsed => {
        console.log(collapsed);
    };
    const select = (e) => {
        var route = e.key
        var routename = e.item.props.elementRef.current.innerText
        localStorage.setItem('getroute',routename)
        PubSub.publish('getroute',routename);
        Nav(route)
    }
    return (
        <div className='leftnav'>
            <Sider collapsible collapsed={false} onCollapse={onCollapse}>
                <div className="logo">后台管理系统</div>
                <Menu theme="dark" mode="inline" onSelect={select}>
                    {
                        props.value.map(item => {
                            return item.children ? (<SubMenu key={item.pathname} icon={<UserOutlined />} title={item.name}>
                                {item.children ? item.children.map(el => <Menu.Item key={el.pathname}>{el.name}</Menu.Item>) : ''}
                            </SubMenu>) : (<Menu.Item key={item.pathname} icon={<PieChartOutlined name='1' refs='aaa'/>}>
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