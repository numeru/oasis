const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const dotenv = require("dotenv");

const config = {
	name: "cromma",
	mode: "development",
	devtool: "inline-source-map",
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
		alias: {
			"@hooks": path.resolve(__dirname, "src/hooks"),
			"@components": path.resolve(__dirname, "src/components"),
			"@pages": path.resolve(__dirname, "src/pages"),
			"@utils": path.resolve(__dirname, "src/utils"),
			"@stores": path.resolve(__dirname, "src/stores"),
			"@assets": path.resolve(__dirname, "src/assets"),
			"@services": path.resolve(__dirname, "src/services"),
			"@constants": path.resolve(__dirname, "src/constants"),
			"@apis": path.resolve(__dirname, "src/apis"),
		},
	},
	entry: {
		app: "./src/index.tsx",
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "babel-loader",
				options: {
					presets: [
						[
							"@babel/preset-env",
							{
								targets: { browsers: ["last 2 chrome versions"] },
								debug: true,
							},
						],
						"@babel/preset-react",
						"@babel/preset-typescript",
					],
					env: {
						development: {
							plugins: [require.resolve("react-refresh/babel"), "babel-plugin-styled-components"],
						},
					},
				},
				exclude: ["/node_modules"],
			},
			{
				test: /\.css?$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(ico|png|jpg|jpeg|gif|svg|webp)$/i,
				type: "asset/resource",
				generator: {
					filename: "images/[name][ext]",
				},
			},
			{
				test: /\.(woff|woff2|ttf)$/i,
				type: "asset/resource",
				generator: {
					filename: "fonts/[name][ext]",
				},
			},
		],
	},
	plugins: [
		new webpack.EnvironmentPlugin({
			NODE_ENV: "development",
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			favicon: "./public/favicon.ico",
		}),
		new ForkTsCheckerWebpackPlugin({
			async: false,
		}),
		new webpack.DefinePlugin({
			"process.env": JSON.stringify(dotenv.config().parsed),
		}),
		new ReactRefreshWebpackPlugin(),
		new ImageMinimizerPlugin({
			test: /\.png$/i,
			deleteOriginalAssets: false,
			filename: "/images/[name].webp",
			minimizerOptions: {
				plugins: ["imagemin-webp"],
			},
		}),
	],
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].js",
		chunkFilename: "chunk.[name].[chunkhash].js",
		publicPath: "/",
		clean: true,
	},
	devServer: {
		historyApiFallback: true,
		port: 3000,
		open: true,
		compress: true,
	},
};
export default config;
