const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const mode = getArg('mode');
const NODE = mode === 'server';
const isDev = process.env.NODE_ENV && process.env.NODE_ENV.indexOf('dev') > -1;
const removeHTML = require('./plugins/removeHtml');
const webpack = require('webpack');

const path = require('path');
const resolve = dir => path.join(__dirname, dir);
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const theme = require('./src/assets/css/CommonLess.json').theme;

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
		// css预设器配置项
		loaderOptions: {
			less: {
				lessOptions: {
					// If you are using less-loader@5 please spread the lessOptions to options directly
					modifyVars: theme,
					javascriptEnabled: true,
					included: /node_modules/,
				},
			},
		},
		// 启用 CSS modules for all css / pre-processor files.
		// modules: false
		// requireModuleExtension: true
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
			// 开发生产共同配置
			resolve: {
				extensions: ['.js', '.vue', '.json', '.less'], // 可以省略后缀名
				alias: {
					vue$: 'vue/dist/vue.esm.js', //加上这一句
					'@': path.resolve(__dirname, './src'),
					'@c': path.resolve(__dirname, './src/components'),
				},
			},
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
			plugins: [
				new VueSSRServerPlugin(),
				// 配置compression-webpack-plugin压缩
				new CompressionWebpackPlugin({
					algorithm: 'gzip',
					test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
					threshold: 10240,
					minRatio: 0.8,
				}),
				new webpack.optimize.LimitChunkCountPlugin({
					maxChunks: 5,
					minChunkSize: 100,
				}),
			],
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
			config.optimization.splitChunks({
				chunks: 'all',
				cacheGroups: {
					libs: {
						name: 'chunk-libs',
						test: /[\\/]node_modules[\\/]/,
						priority: 10,
						chunks: 'initial', // only package third parties that are initially dependent
					},
					antd: {
						name: 'chunk-antd', // split elementUI into a single package
						priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
						test: /[\\/]node_modules[\\/]_?ant-design-vue(.*)/,
					},
					commons: {
						name: 'chunk-commons',
						test: resolve('src/components'), // can customize your rules
						minChunks: 3, //  minimum common number
						priority: 5,
						reuseExistingChunk: true,
					},
				},
			});
		},
	});
}

console.log(config);
module.exports = config;
