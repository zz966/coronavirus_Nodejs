const path = require('path')
const webpack = require('webpack')

// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports ={
    entry: './src/main.js',
    output: {
        path:path.resolve(__dirname,'dist'),
        filename:'bundle'+Math.ceil(Math.random()*10000000)+'.js',
        publicPath:''
    },devServer: {
      proxy:"http://localhost:3000", //开发环境的跨域问题解决，后端springboot服务ip 和 端口
      port: 8080  //dev模式下的前端服务端口，也就是浏览器通过localhost：8085 访问前端页面
  },
    mode: 'development',
    module:{
        rules:[
            {
                test: /\.vue$/,
                use: 'vue-loader'
              },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    // name: '[name].[ext]?[hash]',
                    esModule: false,
                }
            },
            {
                test: /\.css$/,
                use: [
                  {
                    loader: 'vue-style-loader'
                  },
                  {
                    loader: 'css-loader',
                    
                  }
                ]
              }
        ],
    },
    plugins: [
        new VueLoaderPlugin()
      ],
      resolve: {
        alias: {
          'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },

}