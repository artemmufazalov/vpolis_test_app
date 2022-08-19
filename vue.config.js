const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
	publicPath: process.env.NODE_ENV === 'production' ? '/vpolis_test_app/' : '/',
	transpileDependencies: true,
	configureWebpack: {
		module: {
			rules: [
				{
					test: /\.scss$/,
					use: [
						{
							loader: 'sass-loader',
							options: {
								implementation: require('sass'),
							},
						},
					],
				},
			],
		},
	},
});
