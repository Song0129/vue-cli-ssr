const webpackConfig = require('@vue/cli-service/webpack.config');
const webpack = require('webpack');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const { createBundleRenderer } = require('vue-server-renderer');
const axios = require('axios');
const express = require('express');
const server = express();
const MemoryFS = require('memory-fs');
const fs = require('fs');
const path = require('path');
const opn = require('opn');
const port = 9588;
const template = fs.readFileSync(path.resolve(__dirname, '../src/index.temp.html'), 'utf-8');

webpackConfig.entry = path.join(__dirname, '../src/entry-server.js');
webpackConfig.target = 'node';
webpackConfig.output.libraryTarget = 'commonjs2';
webpackConfig.optimization.splitChunks = {};
webpackConfig.output.publicPath = 'http://127.0.0.1:8080/';
webpackConfig.plugins.push(new VueSSRServerPlugin());

const complier = webpack(webpackConfig);
const mfs = new MemoryFS();
complier.outputFileSystem = mfs;
let bundle, isRunning;
complier.watch({}, (err, states) => {
	if (err) {
		throw err;
	}
	states = states.toJson();
	states.errors.forEach(error => console.error(error));
	states.warnings.forEach(warn => console.warn(warn));
	const bundlePath = path.join(webpackConfig.output.path, 'vue-ssr-server-bundle.json');
	bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
	console.log('new bundle generated');
	if (!isRunning) {
		setUpServer();
		opn('http://localhost:' + port);
	}
});

function setUpServer() {
	isRunning = true;
	server.use(express.static(path.join(__dirname, '../dist'), { index: false }));
	server.use(express.static(path.join(__dirname, '../public'), { index: false }));
	server.get('*', function (req, res) {
		renderHtml(req, res);
	});
	server.listen(port, () => console.log('Server is running at:http://localhost:' + port));
}

function helper(v) {
	if (typeof v === 'function') {
		return v();
	}
	return '';
}

async function renderHtml(req, res) {
	let data = await axios.get('http://localhost:8080/vue-ssr-client-manifest.json');
	let clientManifest = data.data;
	let renderer = createBundleRenderer(bundle, {
		runInNewContext: false,
		template,
		clientManifest,
	});
	try {
		const context = { url: req.url, title: 'ssr' };
		const html = await renderer.renderToString(context);
		res.send(html);
	} catch (error) {
		res.status(500).send('?????????????????????');
	}
}

const log4js = require('log4js');
log4js.configure({
	appenders: {
		out: { type: 'stdout' }, //????????????????????????????????????
		// type???????????????????????????????????? file??????????????????????????? dateFile?????????????????????????????????
		//filename ??????????????????,?????????????????????????????????????????????????????????
		info: { type: 'file', filename: './log.log' },
	},
	categories: {
		default: { appenders: ['out', 'info'], level: 'info' }, //??????'out'???????????????????????????
	},
});
let logger = log4js.getLogger('info');
module.exports = logger;
