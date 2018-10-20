const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const createVueLoaderOptions = require('./vue-loader.config')

const isDev = process.env.VUE_ENV = "development"

const config={
    target:'web',
    mode: process.env.VUE_ENV || 'production',
    entry: path.join(__dirname,'../client/index.js'),
    output: {
        filename: "bundle.[hash:8].js",
        path: path.join(__dirname,'../dist'),
        publicPath: "/public/"
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    module:{
        rules: [
            {
                test:/\.(vue|js|jsx)$/,
                use:'eslint-loader',
                exclude:/node_modules/,
                enforce: "pre"
            },
            {
                test:/\.vue$/,
                use:'vue-loader'
            },
            {
                test:/\.jsx$/,
                use:'babel-loader'
            },
            {
                test:/\.js$/,
                use:'babel-loader',
                exclude:/node_modules/
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
                            name:'resources/[path][name].[hash:8].[ext]'
                        }
                    }
                ]
            },
        ]
    }
}

module.exports = config
