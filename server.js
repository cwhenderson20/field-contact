"use strict";

const path = require("path");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

const restify = require("restify");
const bunyan = require("bunyan");
const httpProxy = require("http-proxy");
const mongoose = require("mongoose");

const webpackConfigBuilder = require("./webpack.config");
const config = require("./config");
const namespace = require("./routes/ns");

const proxy = httpProxy.createProxyServer();
const logger = bunyan.createLogger({ name: "Field Contact" });
const server = restify.createServer({ name: "Field Contact", log: logger });

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.requestLogger());

mongoose.connect(config.db)

require("./models");
require("./passport");

namespace(server, "/api", require("./routes")(server));

if (config.env === "development") {
	const webpackConfig = webpackConfigBuilder(config.env);

	new WebpackDevServer(webpack(webpackConfig), {
		publicPath: webpackConfig.output.publicPath,
		hot: true,
		historyApiFallback: true,
		stats: { chunks: false, colors: true }
	}).listen(8080, "localhost", (err) => {
		if (err) {
			return logger.error(err);
		}
		logger.info("Webpack dev server listening at 8080");
	});

	server.get(/^(?!\/api).*/, (req, res) =>
		proxy.web(req, res, { target: "http://localhost:8080" })
	);
} else {
	server.get(/^(?!\/api).*/, restify.serveStatic({
		directory: path.join(__dirname, "/dist"),
		"default": "index.html"
	}));
}

server.on("after", restify.auditLogger({ log: logger }));
server.on("uncaughtException", (req, res, route, err) => {
	req.log.error(err);
	res.send(err);
});
server.listen(config.server_port, () =>
	server.log.info(`Listening at http://${config.server_host}:${config.server_port}`));
