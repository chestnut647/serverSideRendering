
/**
 * 给项目提供views的实时更新
 * 在js文件中增加   enable hot updates of view, [filename] 的注释即可
 */
module.exports = function (resource) {
    const reg = /enable hot updates of view,[\s]*([^\s]+)/i;
    const matchRes = resource.match(reg);
    if(matchRes) {
        const filename = matchRes[1];
        console.log(`给文件${filename}.js添加ejs热更新代码`);
        return resource + `
        if(process.env.NODE_ENV === 'development') {
            require('raw-loader!@views/${filename}.ejs')
        }
        
        if(module.hot) {
            module.hot.accept();
            module.hot.dispose(() => {
                const axios = require('axios');
                const href = window.location.href
                axios.get(href).then(res => {
                    const template = res.data
                    document.body.innerHTML = template
                }).catch(e => {
                    console.error(e)
                })
            })
        }`
    }
    return resource;
}