const { override, fixBabelImports,addLessLoader, __esModule } = require('customize-cra')
__esModule.exports = override(
    // 针对antd 实现按需打包 根据 import 来打包 使用babel-plugin-import 
    fixBabelImports('import', {
        libraryName: "antd",
        libraryDirectory: 'es',
        style: true
    }),
    addLessLoader({
        javascriptEnable:true,
        modifyVars:{'@primary-color':'#lDA57A'}
    })
)
