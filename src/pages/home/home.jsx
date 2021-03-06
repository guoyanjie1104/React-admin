import React, { Component } from 'react';
import * as echarts from 'echarts'
console.log(echarts);

// 首页路由
class Home extends Component {
    componentDidMount() {
        var myChart = echarts.init(document.getElementById('main1'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }
            ]
        });
    }
    render() {
        return (
            <div id='main1'>
                首页路由
                <div id="main"></div>
            </div>
        );
    }
}

export default Home;