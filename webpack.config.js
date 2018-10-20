const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.VUE_ENV = 'development'


const config={
    target:'web',
    entry: path.join(__dirname,'client/index.js'),
    output: {
        filename: "bundle.[hash:8].js",
        path: path.join(__dirname,'dist')
    },
    mode: 'development',
    module:{
        rules: [
            {
                test:/\.vue$/,
                use:'vue-loader'
            },
            {
                test:/\.jsx$/,
                use:'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test:/\.(git|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader: "url-loader",
                        options:{
                            limit:1024,
                            name:'[name]-aaa.[ext]'
                        }
                    }
                ]
            },
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': isDev ? JSON.stringify("development") : JSON.stringify("production")
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin('/dist','index.html'),
    ]
}

if(isDev){
    config.module.rules.push({
        test:/\.styl/,
        use:[
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap:true
                }
            },
            'stylus-loader'
        ]
    })
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer ={
        port: 8000,
        host:'0.0.0.0',
        overlay:{
            errors:true
        },
        // open:true,
        hot:true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    )
}else{
    config.entry={
        app:path.join(__dirname,'client/index.js'),
        vendor:['vue']
    }
    config.output.filename='[name].[chunkhash:8].js'
    config.module.rules.push({
        test:/\.styl/,
        use: ExtractPlugin.extract({
            fallback:'style-loader',
            use:[
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap:true
                    }
                },
                'stylus-loader'
            ]
        })
    })

    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'runtime'
        })
    )
}

module.exports = config