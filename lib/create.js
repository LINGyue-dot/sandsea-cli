const inquirer = require("inquirer");
const Creator = require("./Createor");
const PromptModuleAPI = require("./PromptModuleAPI");

const creator = new Creator();

const promptModules = getPromptModules();

const promptAPI = new PromptModuleAPI(creator);

promptModules.forEach(m => m(promptAPI));

// 生成交互的数据
const answers = await inquirer.prompt(creator.getFinalPrompts());

// 获取所有交互语句包括 babel linter 等
function getPromptModules() {
	return ["babel", "router", "vuex", "linter"].map(file =>
		require(`./promptModules/${file}`)
	);
}
