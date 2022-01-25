const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const dotenv = require("dotenv");

const getConfig = (isAnalyzeMode: boolean) => ({
	name: "cromma",
	mode: "production",
	devtool: "hidden-source-map",
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
		main: "./src/index.tsx",
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
							},
						],
						"@babel/preset-react",
						"@babel/preset-typescript",
					],
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
			NODE_ENV: "production",
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
		new MiniCssExtractPlugin({
			filename: `[name].[chunkhash].css`,
		}),
		new CompressionPlugin({
			algorithm: "gzip",
			test: /\.(js|css|html|ttf)$/,
			threshold: 10240,
		}),
		new ImageMinimizerPlugin({
			test: /\.png$/i,
			deleteOriginalAssets: false,
			filename: "/images/[name].webp",
			minimizerOptions: {
				plugins: ["imagemin-webp"],
			},
		}),
		isAnalyzeMode &&
			new BundleAnalyzerPlugin({
				generateStatsFile: true,
				statsFilename: "bundle-stats.json",
			}),
	].filter(Boolean),
	output: {
		path: path.join(__dirname, "dist"),
		filename: "bundle.[name].[chunkhash].js",
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
	optimization: {
		splitChunks: {
			cacheGroups: {
				default: false,
				framework: {
					chunks: "all",
					name: "framework",
					test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
					priority: 30,
					reuseExistingChunk: true,
				},
				library: {
					chunks: "all",
					name: "library",
					test: /[\\/]node_modules[\\/]/,
					priority: 20,
					reuseExistingChunk: true,
				},
				common: {
					chunks: "all",
					name: "common",
					minChunks: 2,
					priority: 10,
					test: /[\\/]src[\\/]/,
					reuseExistingChunk: true,
				},
			},
		},
		runtimeChunk: { name: "runtime" },
	},
	performance: {
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
});
module.exports = (env: any) => {
	const config = getConfig(env.bundleAnalyze);

	return config;
};
