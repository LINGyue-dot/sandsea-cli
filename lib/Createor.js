// prompt 管理类
class Creator {
	constructor() {
		this.featurePrompt = {
			name: "features",
			message: "Check the features needed for your project:",
			pageSize: 10,
			type: "checkbox",
			choices: [],
		};

		this.injectedPrompts = [];
	}

	// 控制 when
	getFinalPrompts() {
		this.injectedPrompts.forEach(prompt => {
			const originalWhen = prompt.when || (() => true);
			prompt.when = answer => originalWhen(answer);
		});

		const prompts = [this.featurePrompt, ...this.injectedPrompts];

		return prompts;
	}
}

module.exports = Creator;
