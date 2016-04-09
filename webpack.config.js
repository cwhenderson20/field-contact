"use strict";

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const argv = require("yargs").argv;

const dev = "development";

function getPlugins(env) {
	const GLOBALS = {
		"process.env.NODE_ENV": JSON.stringify(env),
		__DEV__: env === dev,
		__DEBUG__: env === dev && !argv.no_debug,
		__DEBUG_NEW_WINDOW__: !!argv.nw
	};

	const plugins = [
		new webpack.DefinePlugin(GLOBALS),
		new HtmlWebpackPlugin({
			template: "client/index.html",
			filename: "index.html"
		})
	];

	if (env === dev) {
		plugins.push(new webpack.HotModuleReplacementPlugin());
	} else {
		plugins.push(new webpack.optimize.DedupePlugin());
		plugins.push(new webpack.optimize.UglifyJsPlugin({
			output: { comments: false },
			compress: { warnings: false },
			screw_ie8: true
		}));
	}

	return plugins;
}

function getEntry(env) {
	const entry = [];

	if (env === dev) {
		entry.push("webpack-dev-server/client?http://localhost:8080");
		entry.push("webpack/hot/only-dev-server");
	}

	entry.push("./client/index.jsx");

	return entry;
}

function getLoaders() {
	const loaders = [{
		test: /\.jsx?$/,
		include: path.join(__dirname, "client"),
		loaders: ["babel"],
		query: { cacheDirectory: true }
	}, {
		test: /\.html$/,
		include: path.join(__dirname, "client"),
		loader: "raw"
	}, {
		test: /\.css$/,
		loaders: ["style", "css"]
	}, {
		test: /\.woff(\?.*)?$/,
		loader: "url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff"
	}, {
		test: /\.woff2(\?.*)?$/,
		loader: "url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2"
	}, {
		test: /\.otf(\?.*)?$/,
		loader: "file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype"
	}, {
		test: /\.ttf(\?.*)?$/,
		loader: "url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream"
	}, {
		test: /\.eot(\?.*)?$/,
		loader: "file?prefix=fonts/&name=[path][name].[ext]"
	}, {
		test: /\.svg(\?.*)?$/,
		loader: "url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml"
	}, {
		test: /\.(png|jpg)$/,
		loader: "url?limit=8192"
	}];

	return loaders;
}

function getConfig(env) {
	return {
		resolve: {
			modules: [path.resolve(__dirname, "client"), "node_modules"],
			extensions: ["", ".js", ".jsx"]
		},
		devtool: env === dev ? "cheap-module-eval-source-map" : "source-map",
		stats: { chunks: false },
		entry: getEntry(env),
		target: "web",
		output: {
			path: path.join(__dirname, "dist"),
			publicPath: "/",
			filename: "bundle.js"
		},
		plugins: getPlugins(env),
		module: { loaders: getLoaders(env) }
	};
}

module.exports = getConfig;
