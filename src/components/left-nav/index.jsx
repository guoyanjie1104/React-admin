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
    const [defaultpath, getroute] = useState([localStorage.getItem('getroutepath')||'home'])
    const [defaultsub, getsub] = useState(localStorage.getItem('getroutesub')||'')
    console.log(defaultsub);
    const onCollapse = collapsed => {
        console.log(collapsed);
    };
    const select = (e) => {
        var route = e.key
        var routename = e.item.props.elementRef.current.innerText
        console.log(e);
        localStorage.setItem('getroute',routename)
        localStorage.setItem('getroutepath',e.key)
        console.log(e.keyPath);
        localStorage.setItem('getroutesub',e.keyPath[1])
        getroute(e.key)
        getsub(e.keyPath[1])
        console.log(e.keyPath[1]);
        PubSub.publish('getroute',routename);
        Nav(route)
    }
    return (
        <div className='leftnav'>
            <Sider collapsible collapsed={false} onCollapse={onCollapse}>
                <div className="logo">后台管理系统</div>
                <Menu theme="dark" mode="inline" onSelect={select} 
                 defaultSelectedKeys={defaultpath} defaultOpenKeys={[defaultsub]}>
                    {
                        props.value.map(item => {
                            return item.children ? (<SubMenu key={item.pathname} icon={<UserOutlined />} title={item.name}>
                                {/* {item.pathname}--- */}
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