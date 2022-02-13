// package.json 文件先用 js object 进行表示方便进行添加以 pkg 表示
class Generator {
	constructor() {}

	// 向 pkg 中添加配置
	extendPackage(fields) {
		const pkg = this.pkg;
		for (const key in fields) {
			const value = fields[key];
			const existing = pkg[key];
			if (
				isObject(value) &&
				(key === "dependencies" ||
					key === "devDependencies" ||
					key === "scripts")
			) {
				pkg[key] = Object.assign(existing || {}, value);
			} else {
				pkg[key] = value;
			}
		}
	}

	// 渲染模版到具体文件内
	render(source, additionalData = {}, ejsOptions = {}) {
		// 获取调用 generator.render() 函数的文件的父目录路径
		const baseDir = extractCallDir();
		source = path.resolve(baseDir, source);
		this._injectFileMiddleware(async files => {
			const data = this._resolveData(additionalData);
			// https://github.com/sindresorhus/globby
			const globby = require("globby");
			// 读取目录中所有的文件
			const _files = await globby(["**/*"], { cwd: source, dot: true });
			for (const rawPath of _files) {
				const sourcePath = path.resolve(source, rawPath);
				// 解析文件内容
				const content = this.renderFile(sourcePath, data, ejsOptions);
				// only set file if it's not all whitespace, or is a Buffer (binary files)
				if (Buffer.isBuffer(content) || /[^\s]/.test(content)) {
					files[rawPath] = content;
				}
			}
		});
	}
}

module.exports = Generator;
