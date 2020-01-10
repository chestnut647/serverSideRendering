const webpack = require('webpack');
const  webpackMerge = require('webpack-merge');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config');
const CONFIG = require('./config');

module.exports = webpackMerge(webpackBaseConfig, {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
					fallback: "style-loader",
					use: "css-loader",
					publicPath: CONFIG.PATH.PUBLIC_PATH
				})
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextWebpackPlugin({
            filename: `${CONFIG.DIRC.STYLE}/[name].[hash:5].min.css`
        }),
        new optimizeCss(),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					minChunks: 1,
					chunks: 'all',
					priority: 100
				}
			}
		},
		runtimeChunk: {
			name: 'manifest'
		}
	},
    devtool: 'cheap-module-source-map',
    mode: 'production'
})