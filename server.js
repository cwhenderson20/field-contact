"use strict";

const path = require("path");
const express = require("express");

// Webpack Requirements
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfigBuilder = require("./webpack.config");

const app = new express();
const port = 3000;
const config = webpackConfigBuilder(process.env.NODE_ENV);
const compiler = webpack(config);

if (process.env.NODE_ENV === "development") {
	app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
	app.use(webpackHotMiddleware(compiler));
}

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "client/index.html"));
});

app.listen(port, (err) => {
	if (err) {
		return console.error(err);
	}
	console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
});
