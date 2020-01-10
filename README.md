
# 项目

采用webpack\+express\+ejs的服务端渲染模式。

## 页面

1. 一级页面 test1 test2
2. 二级页面 firstLevel/secondLevel1 firstLevel/secondLevel1

## 使用说明

1. 安装依赖     \`npm install\`
2. 开发环境    \`npm run dev \`  浏览器访问 localhost:3000/m/test/xxx 
3. 打包构建    \`npm run build\`
4. 生产环境    \`npm run serve\`

## 功能

### 服务端重启

监听app.js 以及 server文件夹，代码修改 node应用重启

### 热更新

支持js，css，ejs模板的热更新。需要注意的是，如果要支持ejs的热更新，需要在相应的js文件中增加如下注释代码，其中upgradeVersion是文件名称

```
/** enable hot updates of view, upgradeVersion */
```
## 项目结构

项目中，以下几个部分是开发涉及到的目录结构，其中

1. build目录里是webpack相关配置
2. server是服务端代码
3. source中是前端代码，包含了资源和前端模版部分。其中需要注意的是，source/public/javascripts/main中的js文件的结构及命名，必须要跟source/public/views中模板文件命名一致，这样webpack打包资源才能成功

```html
+ build
+ dist
+ server
    + route
    + common
+ source
    + public
        + javascripts
            + lib
            + main
        + images
        + stylesheets
    + views
app.js

```

