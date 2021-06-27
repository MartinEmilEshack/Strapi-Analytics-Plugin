exports.analyticsLoaders = (config, webpack) => {
	console.log('Analytics loaders added');
	config.module.rules.push(
		{
			test: /\.(js|mjs)$/,
			exclude: /@babel(?:\/|\\{1,2})runtime/,
			loader: require.resolve('babel-loader'),
			options: {
				compact: false,
				presets: [
					'@babel/preset-env',
					'@babel/preset-react'
				],
				plugins: [
					"@babel/plugin-proposal-nullish-coalescing-operator",
					"@babel/plugin-proposal-optional-chaining",
					'@babel/plugin-proposal-class-properties',
					'@babel/plugin-proposal-object-rest-spread',
					['import', { libraryName: 'antd', style: 'css' }]
				],
				cacheCompression: false,
				// Babel sourcemaps are needed for debugging into node_modules
				// code.  Without the options below, debuggers like VSCode
				// show incorrect code and set breakpoints on the wrong lines.
				sourceMaps: true,
				inputSourceMap: true,
			},
		}
	);
	return config;
};

exports.analyticsWatchOptions = (config, webpack) => {
	console.log('Analytics watch options added');
	config.watchOptions = {
		aggregateTimeout: 3000,
		ignored: [
			/node_modules/,
			/.vscode/,
			/out/,
			/old/,
			/metadata/,
			'README*.md',
			'.gitignore',
			'package*.json',
			'tsconfig.json',
		],
	};
	return config;
};
