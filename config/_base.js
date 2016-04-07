"use strict";

const config = {
	env: process.env.NODE_ENV || "development",
	server_host: "localhost",
	server_port: process.env.PORT || 3000
};

module.exports = config;
