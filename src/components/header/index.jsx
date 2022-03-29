import React, { Component } from 'react'
import { Layout} from 'antd';
const { Header } = Layout;
export default class Headernav extends Component {
    Loginout=()=>{
      
    }
    render() {
        return (
            <Header className="site-layout-background top" style={{ padding: 0 }} >
                <div>欢迎admin</div>
                <div style={{ margin: '0px 10px' }}>|</div>
                <div onClick={this.Loginout} className='out'>退出</div>
            </Header>
        )
    }
}
