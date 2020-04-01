
const path = require('path')

const fs = require('fs')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpack = require('webpack');

const webpackMerge = require('webpack-merge')

const baseConfig = require('./webpack.config.base')

const {pageDir,mainHtml,entry,outputPath,srcRoot,devObj} = require('./config')


function getHtmlArray(entryMap) {
    let htmls = []

    Object.keys(entryMap).forEach(function (key) {
        const fullPathName = path.resolve(pageDir, key)

        const fileName = path.resolve(fullPathName, mainHtml)

        if (fs.existsSync(fileName)) {
            htmls.push(new HtmlWebpackPlugin({
                filename: key + '.html',
                template: fileName,
                chunks: [key]
            }))
        }
    })

    return htmls
}

const htmlArray = getHtmlArray(entry)


const devConfig = {
    mode: 'development',
    devtool: "cheap-module-eval-source-map",
    devServer: {
        open: true,
        overlay: true,//错误直接显示在浏览器中
        contentBase: outputPath,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ],
                include: srcRoot
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ],
                include: srcRoot
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'postcss-loader',
                    'less-loader'
                ],
                include: srcRoot
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                mode:JSON.stringify('development'),
                ...devObj
            }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ].concat(htmlArray)
}

module.exports = webpackMerge(baseConfig,devConfig)