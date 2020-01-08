const express = require('express');
const path = require('path');
const app =  express();

const indexRouter = require(path.resolve(__dirname, './server/route/index.js'));
const firstLevelRouter = require(path.resolve(__dirname, './server/route/firstLevel.js'));
const packageConfig = require(path.resolve(__dirname, './package.json'));
const { port, virtualDirctory = '/' } = packageConfig.config || {};

app.set('views', path.join(__dirname, 'source/views'));
app.set('view engine', 'ejs');
app.use(virtualDirctory, indexRouter);
app.use(`${virtualDirctory}/firstLevel` , firstLevelRouter);
app.listen(port, function() {
    console.log(`listen in: ${port}...` )
})