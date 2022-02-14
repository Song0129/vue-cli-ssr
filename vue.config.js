const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const mode = getArg('mode');
const NODE = mode === 'server';
const isDev = process.env.NODE_ENV && process.env.NODE_ENV.indexOf('dev') > -1;
const removeHTML = require('./plugins/removeHtml');
function getArg(k) {
	var reg = new RegExp('--env.' + k + '=(.*)');
	for (let it of process.argv) {
		var m = it.match(reg);
		if (m) return m[1];
	}
	return '';
}
var config = {
	publicPath: isDev ? 'http://127.0.0.1:8080/' : './',
	css: {
		sourceMap: !isDev && !NODE, // if enable sourceMap:  fix ssr load Critical CSS throw replace of undefind
	},
};
isDev &&
	(config.devServer = {
		headers: { 'Access-Control-Allow-Origin': '*' },
		disableHostCheck: true, // fix ssr console error
	});
if (mode === 'client') {
	config = Object.assign({}, config, {
		configureWebpack: {
			entry: './src/entry-client.js',
			plugins: [
				new VueSSRClientPlugin(),
				new removeHTML({ name: 'index' }), //访问网页根目录时会默认走index.html，所以删除它，直接走预置模板
			],
		},
	});
} else if (mode === 'server') {
	config = Object.assign({}, config, {
		configureWebpack: {
			entry: './src/entry-server.js',
			target: 'node',
			output: {
				libraryTarget: 'commonjs2',
			},
			externals: nodeExternals({
				allowlist: /\.css$/,
			}),
			plugins: [new VueSSRServerPlugin()],
		},
		chainWebpack: config => {
			config.optimization.splitChunks(undefined);
			// fix ssr bug: document not found -- https://github.com/Akryum/vue-cli-plugin-ssr/blob/master/lib/webpack.js
			const isExtracting = config.plugins.has('extract-css');
			if (isExtracting) {
				// Remove extract
				const langs = ['css', 'postcss', 'scss', 'sass', 'less', 'stylus'];
				const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
				for (const lang of langs) {
					for (const type of types) {
						const rule = config.module.rule(lang).oneOf(type);
						rule.uses.delete('extract-css-loader');
						// Critical CSS
						rule.use('vue-style').loader('vue-style-loader').before('css-loader');
					}
				}
				config.plugins.delete('extract-css');
			}
			// fix ssr hot update bug
			config.plugins.delete('hmr');
		},
	});
}
module.exports = config;
