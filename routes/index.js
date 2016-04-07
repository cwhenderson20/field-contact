"use strict";

const jwt = require("restify-jwt");

module.exports = (server) => () => {
	server.use(jwt({ secret: "SECRET"}).unless({
		custom: (req) => !req.url.match(/^\/api/),
		path: ["/api/login"]
	}));

	server.get("/login", (req, res) => {
		res.json({ message: "Success" });
	});

	server.get("/test", (req, res) => {
		res.json({ message: "HELLO" });
	});
};
