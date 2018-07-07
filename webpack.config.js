const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');//webpack 插件 ，作为项目的入口的 html
const isDev = process.env.NODE_ENV === 'development';//判断是否属于开发环境
const webpack = require('webpack')


const config=   {
   target:'web',//webpack 的编译目标是在 web 平台
   entry: path.join(__dirname,'src/index.js'),
   output: {
      filename:'bundle.js',
      path: path.join(__dirname,'dist')
   },
   module:{
      rules:[
         {
            test :/\.vue$/,
            loader:'vue-loader'
         },
         {
            test: /\.jsx$/,
            loader: 'babel-loader'
         },
         {
            test:/\.css$/,
            use: [
               'style-loader',
               'css-loader',
            ],
         },
         {
            test:/\.styl$/,
            use:[
               'style-loader',
               'css-loader',
               {
                  'loader':'postcss-loader',
                  options: {
                     sourceMap:true
                  }
               },
               'stylus-loader',
            ]
         },
         {
            test:/\.(gif|jpg|jpeg|png|svg)$/,
            use:[
               {
                  loader:'url-loader',
                  options:{
                     limit:1024,
                     name:'[name].[ext]'
                  }
               }
            ]
         }
      ]
   },
   plugins: [
      new webpack.DefinePlugin({//判断开发者写的代码  进行打包处理
         'process-env': {
            NODE_ENV: isDev ? '"development"': '"production"'
         }
      }),
      new HTMLPlugin()
   ]
}

// 安装一个cross-env 包，判断 开发环境 和生产环境   在 package.josn 里面去配置； 
// "build": "cross-env NODE_ENV=production webpack --config webpack.config.js", 生产环境 
//"dev": "cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js"  开发环境
if(isDev) {
   config.devtool = '#cheap-module-eval-source-map';//方便调试代码； 你写的什么代码浏览器就会显示什么代码；不会编译成其他样式
   config.devServer = {
      port:'8080',
      host:'0.0.0.0',
      overlay: {
         errors: true,//显示webpack编译的错误
      },
      hot :true,// 修改组件的 代码，只需要加载修改的代码；不会重新加载左右的 代码； 否则就会刷新页面；
   },
   config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),//启动 hot 功能
      new webpack.NoEmitOnErrorsPlugin()
   )
}

module.exports = config;