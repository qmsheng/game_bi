/**
 * Created by Administrator on 2016/8/4.
 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app:[
            //'webpack/hot/dev-server',
            //'webpack-dev-server/client?http://localhost:8080',
            path.resolve(__dirname, 'app/main.js')
        ],
        vendor:['react',
            'react-dom',
            'react-router',
            'keymirror',
            'react-intl',
            'intl',
            'jquery',
            'react-intl',
            'axios',
            './semantic/dist/semantic.css',
            './semantic/dist/semantic.min.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: 'js/[name].js?[hash]',
    },
    resolve: {
        extension: ['', '.js', '.jsx', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot-loader/webpack', 'babel'],
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.css/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.less/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                query : {
                    limit : 8192,
                    name : '/images/[name]_[hash].[ext]'
                }
            },
            {
                test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url",
                query : {
                    limit : 10000,
                    mimetype : 'application/image/svg+xml',
                    name : '/fonts/[name]_[hash].[ext]'
                }
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.ProvidePlugin({
            $ : "jquery",
            jQuery : "jquery",
            "window.jQuery" : "jquery"
        }),
        //new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.js?[hash]'),
        new ExtractTextPlugin("css/[name].css?[hash]"),
        new HtmlWebpackPlugin({
            title: 'BI',
            template: './app/index.html',
        }),
        new CopyWebpackPlugin([{
            from: '../public/index.html',
            to:'../resources/views/admin.blade.php'
        }]),
    ],
    devtool: 'cheap-module-source-map'
};