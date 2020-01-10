const ejs = require('ejs');
const axios = require('axios');
const path = require('path');
const CONFIG = require('../../build/config');
const packageConfig = require(path.resolve(__dirname, '../../package.json'));

const isDev = process.env.NODE_ENV === 'development';
function render(res, filename, data) {
	if(isDev) {
		const localPath = `http://localhost:${packageConfig.config.port}${CONFIG.PATH.PUBLIC_PATH}/${CONFIG.DIRC.VIEW}/${filename}.ejs`;
		axios.get(localPath)
		.then(fileRes => {
			const html = ejs.render(fileRes.data, data);
			res.send(html)
		})
		return;
	}
    res.render(filename, data);
}
module.exports = {
    render
}