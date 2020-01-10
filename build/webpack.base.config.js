
const glob = require('glob');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CONFIG = require('./config');
console.log(resolve(__dirname, "../source/public/javascripts/main/"));

const isDev = process.env.NODE_ENV === 'development';
module.exports = {
    entry: (function(fileLists) {
        let entryObj = {};
        const basePath = resolve(__dirname, "../source/public/javascripts/main/");
        fileLists.map((filePath) => {
            const temp  = filePath.split(basePath),
                  filename = temp[temp.length - 1].split('/').join('_').slice(1).split('.')[0];
            // entryObj[filename] = filePath;
            entryObj[filename] = isDev ? ['webpack-hot-middleware/client?noInfo=true&reload=true', filePath] :filePath;
        });
        return entryObj;
    })(glob.sync(resolve(__dirname, "../source/public/javascripts/main/**/*.js"))),
    output: {
        path: resolve(__dirname, `../${CONFIG.DIRC.DIST}`),
        filename: `${CONFIG.DIRC.SCRIPT}/[name].bundle.js`,
        chunkFilename: `${CONFIG.DIRC.SCRIPT}/[name].[chunkhash].js`,
        publicPath: CONFIG.PATH.PUBLIC_PATH
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, '../source'),
            '@js': resolve(__dirname, '../source/public/javascripts'),
            '@style': resolve(__dirname, '../source/public/stylesheets'),
            '@views': resolve(__dirname, '../source/views')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader', resolve(__dirname, 'auto-update-ejs-loader')],
                exclude: /node_modules/
            },
            {
                test: /\.ejs$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src', 'img:data-src', ':data-background']
                        }
                    },
                    {
						loader: 'ejs-html-loader',
						options: {
							production: process.env.ENV === 'production'
						}
					}
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        ...glob.sync(resolve(__dirname, "../source/views/**/*.ejs")).map((filePath) => {
            const basePath = resolve(__dirname, '../source/views/');
            const temp  = filePath.split(basePath),
                  chunksName = `${temp[temp.length - 1].split('/').join('_').slice(1).split('.')[0]}`;
			return new HtmlWebpackPlugin({ 
                filename: `${CONFIG.DIRC.VIEW}${temp[1]}`, 
                template: filePath, 
                chunks: isDev ? [ chunksName ] : ['manifest', 'vendors', chunksName],
                chunksSortMode: "manual"
            })
        })
    ]
}
