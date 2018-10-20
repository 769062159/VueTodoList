const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.config.base')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const isDev = process.env.VUE_ENV = "development"

let config

const defaultPlugins=[
    new HtmlWebpackPlugin({template: path.join(__dirname, 'template.html')}),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': isDev ? JSON.stringify("development") : JSON.stringify("production")
    }),
  new VueClientPlugin()
]

const devServer={
    port: 8000,
    host:'0.0.0.0',
    overlay:{
        errors:true
    },
  historyApiFallback: {
    index: '/public/index.html'
  },
    // open:true,
    hot:true
}
if(isDev){
    config = merge(baseConfig,{
        devtool:'#cheap-module-eval-source-map',
        module:{
            rules:[{
                test:/\.styl/,
                use:[
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap:true
                        }
                    },
                    'stylus-loader'
                ]
            }]
        },
        devServer,
        plugins:defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            //new webpack.NoEmitOnErrorsPlugin()
        ])
    })
}else{
    config = merge(baseConfig,{
        entry:{
            app:path.join(__dirname,'../client/index.js'),
            //vendor:['vue']
        },
        output:{
            filename:'[name].[chunkhash:8].js'
        },
        module:{
            rules:[
                {
                    test:/\.styl/,
                    use: [
                         MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'stylus-loader'
                    ]
                }
            ]
        },
        optimization:{
            splitChunks:{
                chunks:'all'
            },
            runtimeChunk:true
        },
        plugins:defaultPlugins.concat([
            new MiniCssExtractPlugin({filename:"[contenthash:8].css"}),
            /*new webpack.optimize.CommonsChunkPlugin({
                name:'vendor'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name:'runtime'
            })*/
        ])
    })
}

module.exports = config
