import { createStore, combineReducers , compose, applyMiddleware } from 'redux'
// 异步操作缺少使用自定义中间件，需要使用中间件 redux-thunk，实现异步性
import thunk from 'redux-thunk'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const addz = { type:'add',count:1 }
// reducer函数
// 数据state，reducer就是根据action来对state进行操作。
const calculate = (state=0, action) => {
    console.log(state);
    switch (action.type) {
        case 'add':
            console.log(state.num,action);
            return {num:state.num + action.count}
            break;
        case 'sj' :
            return {num:action.count}   
        default:
            return {num:0}
            break;
    }
}
const baseinfo = (state, action) => {
   return {name:'gyj',age:24}
}
//  combineReducers合并多个reducer函数
export const rootReducers = combineReducers({ calculate,baseinfo})
// applyMiddleware():应用上基于redux的中间件(插件库)
// store 创建包含指定reducer的store对象
export const store = createStore(rootReducers,composeEnhancers(applyMiddleware(thunk)))
// export calculate 

// store的方法有：
// 1)	getState() 获取store里的内容
// redux：将每一个更改动作描述为一个action，要更改state中的内容，就需要发送action。
//       一个action是一个简单的对象，用来描述state发生了什么变更。
// 2)	dispatch(action)
// 3)	subscribe(listener)
