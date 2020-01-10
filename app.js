const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware =require('webpack-dev-middleware');
const webpackHotMiddleware =require('webpack-hot-middleware');
const app =  express();

const indexRouter = require(path.resolve(__dirname, './server/route/index.js'));
const firstLevelRouter = require(path.resolve(__dirname, './server/route/firstLevel.js'));
const packageConfig = require(path.resolve(__dirname, './package.json'));
const webpackDevConfig = require(path.resolve(__dirname, './build/webpack.dev.config.js'));
const { port, virtualDirctory = '/' } = packageConfig.config || {};
const compile = webpack(webpackDevConfig);

const isDev = process.env.NODE_ENV === 'development';
console.log('webpackDevConfig', webpackDevConfig)

if(isDev) {
    app.use(webpackDevMiddleware(compile, {
        publicPath: webpackDevConfig.output.publicPath
    }))
    app.use(webpackHotMiddleware(compile, {
        publicPath: webpackDevConfig.output.publicPath,
    }))
    app.use(webpackDevConfig.output.publicPath, express.static(path.join(__dirname, 'source')))
} else {
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'dist/views'));
    app.use(virtualDirctory, express.static(path.join(__dirname, 'dist')));
}
app.use(virtualDirctory, indexRouter);
app.use(`${virtualDirctory}firstlevel` , firstLevelRouter);
app.listen(port, function() {
    console.log(`listen in: ${port}...` )
})
