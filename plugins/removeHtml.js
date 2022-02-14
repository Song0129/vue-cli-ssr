class removeHtml {
	constructor(options) {
		this.options = options || {};
	}
	apply(compiler) {
		compiler.hooks.emit.tapAsync('remove-html', (compilation, callback) => {
			for (let file in compilation.assets) {
				if (/\.html$/.test(file) && file.indexOf(this.options.name) > -1) {
					delete compilation.assets[file];
				}
			}
			callback();
		});
	}
}

module.exports = removeHtml;
