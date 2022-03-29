var express = require("express")
var web = express()
web.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();

})
web.get('/loginaxios', (req, res) => {
    var query = req.query
    var username = query.username
    var password = query.password
    var message = {
        code: 200,
        info: {
            'password': password,
            'username': username
        }
    }
    var error = {
        code: 400,
        msg: '账号或密码错误！'
    }
    if (username == 'admin' && password == '1234') {
        res.send(message)
    } else {
        res.send(error)
    }
})
web.get('/getrouter', (req, res) => {
    var query = req.query
    var username = query.username
    var password = query.password
    var message = {
        code: 200,
        info: [
            {
                id: '1',
                name: '首页',
                pathname: 'home',
            },
            {
                id: '2',
                name: '商品',
                pathname: 'shop',
                children:[
                    {
                        id: '21',
                        name: '品类管理',
                        pathname: 'categroy'
                    },
                    {
                        id: '22',
                        name: '商品管理',
                        pathname: 'product'
                    },
                ]
            },
            {
                id: '3',
                name: '用户管理',
                pathname: 'user'
            },
            {
                id: '4',
                name: '图形图表',
                pathname: 'shopechars',
                children:[
                    {
                        id: '41',
                        name: '柱形图',
                        pathname: 'bars'
                    },
                    {
                        id: '42',
                        name: '线状图',
                        pathname: 'line'
                    },
                    {
                        id: '43',
                        name: '饼状图',
                        pathname: 'pie'
                    },
                ]
            },
        ]
    }
    if (username && password) {
        res.send(message)
    }

})
web.listen('5000', () => {
    console.log('服务器启动成功端口号5000......');
})