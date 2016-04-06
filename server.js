"use strict";

const path = require("path");

// Webpack Requirements
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfigBuilder = require("./webpack.config");

const restify = require("restify");
const bunyan = require("bunyan");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer();
const logger = bunyan.createLogger({ name: "Field Contact" });
const server = restify.createServer({ name: "Field Contact", log: logger });

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.requestLogger());

if (process.env.NODE_ENV === "development") {
	const config = webpackConfigBuilder(process.env.NODE_ENV);

	new WebpackDevServer(webpack(config), {
		publicPath: config.output.publicPath,
		hot: true,
		historyApiFallback: true,
		stats: { chunks: false, colors: true }
	}).listen(8080, "localhost", (err) => {
		if (err) {
			return logger.error(err);
		}
		logger.info("Webpack dev server listening at 8080");
	});

	server.get(/.*/, (req, res) =>
		proxy.web(req, res, { target: "http://localhost:8080" })
	);
} else {
	server.get(/.*/, restify.serveStatic({
		directory: path.join(__dirname, "/dist"),
		"default": "index.html"
	}));
}

server.on("after", restify.auditLogger({ log: logger }));
server.on("uncaughtException", (req, res, route, err) => res.send(err));
server.listen(3000, () => server.log.info("Listening at http://localhost:3000"));
