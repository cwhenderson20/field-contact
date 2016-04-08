"use strict";

const config = {
	env: process.env.NODE_ENV || "development",
	server_host: "localhost",
	server_port: process.env.PORT || 3000,
	db: process.env.DB || "mongodb://localhost:27017/field-contact"
};

module.exports = config;
