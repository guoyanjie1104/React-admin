import React, { Component } from 'react';
import { Layout} from 'antd';
const { Content} = Layout;
class Contentnav extends Component {
    render() {
        return (
                <Content style={{ margin: '0 16px' }}>
                    <div className="site-layout-background content" style={{ padding: 24, minHeight: 360 }}>
                        Bill is a cat.
                    </div>
                </Content>
        );
    }
}

export default Contentnav;