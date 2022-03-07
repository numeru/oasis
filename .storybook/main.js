const path = require("path");

module.exports = {
	stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/preset-create-react-app",
		"@storybook/addon-a11y",
		"@storybook/addon-docs",
		"storybook-addon-mock/register",
	],
	framework: "@storybook/react",
	webpackFinal: async (config) => {
		config.resolve.alias["@hooks"] = path.resolve(__dirname, "../src/hooks");
		config.resolve.alias["@components"] = path.resolve(__dirname, "../src/components");
		config.resolve.alias["@pages"] = path.resolve(__dirname, "../src/pages");
		config.resolve.alias["@utils"] = path.resolve(__dirname, "../src/utils");
		config.resolve.alias["@apis"] = path.resolve(__dirname, "../src/apis");
		config.resolve.alias["@assets"] = path.resolve(__dirname, "../src/assets");
		config.resolve.alias["@stores"] = path.resolve(__dirname, "../src/stores");
		config.resolve.alias["@services"] = path.resolve(__dirname, "../src/services");
		config.resolve.alias["@constants"] = path.resolve(__dirname, "../src/constants");
		return config;
	},
};
