const express = require('express');
const prod = express();
const path = require('path');
const fs = require('fs');
const { createBundleRenderer } = require('vue-server-renderer');
const serverBundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/vue-ssr-client-manifest');

const template = fs.readFileSync(path.resolve(__dirname, '../src/index.temp.html'), 'utf-8');
const renderer = createBundleRenderer(serverBundle, {
	runInNewContext: false,
	template,
	clientManifest: clientManifest,
});

const LRU = require('lru-cache');

const port = 9527;

prod.use(express.static(path.join(__dirname, '../dist'), { index: false }));
prod.use(express.static(path.join(__dirname, '../public'), { index: false }));
prod.get('*', function (req, res) {
	renderHTML(req, res);
});
const microCache = new LRU({
	max: 100,
	maxAge: 60 * 60 * 1000, //1 hours cache
});
let cacheUrl = ['/about'];
const isCacheable = url => {
	return cacheUrl.indexOf(url) > -1;
};

function helper(v) {
	if (typeof v === 'function') {
		return v();
	}
	return '';
}

async function renderHTML(req, res) {
	const cacheable = isCacheable(req.url);
	if (cacheable) {
		const hit = microCache.get(req.url);
		if (hit) {
			return res.end(hit);
		}
	}
	try {
		const context = { url: req.url, title: 'ssr' };
		const html = await renderer.renderToString(context);
		res.send(html);
	} catch (error) {
		res.status(500).send('服务器内部错误');
	}
}

prod.listen(port, () => {
	console.log('server is running at: http://localhost:' + port);
});
