// import { analyticsWatchOptions, analyticsLoaders } from "../plugins/analytics/admin/admin.config";

const { analyticsLoaders, analyticsWatchOptions } = require("../plugins/analytics/admin/admin.config");

module.exports = {
	webpack: (config, webpack) => {
		config = analyticsWatchOptions(config, webpack);
		config = analyticsLoaders(config, webpack);
		return config;
	},
};