"use strict";

const config = {
	env: process.env.NODE_ENV || "development",
	server_host: "localhost",
	server_port: process.env.PORT || 3000,
	db: process.env.DB || "mongodb://localhost:27017/field-contact",
	sendgrid_key: process.env.SENDGRID_KEY,
	sendgrid_from: process.env.SENDGRID_FROM,
	jwt_secret: process.env.JWT_SECRET
};

module.exports = config;
