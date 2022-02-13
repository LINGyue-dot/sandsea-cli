const globby = require("globby");
const path = require("path");
(async function () {
	const source = path.resolve(__dirname, "__tests__");
	const paths = await globby(["../**"],{ cwd: source });
	console.log(paths);
})();
