"use strict";

const restify = require("restify");
const jwt = require("restify-jwt");
const mongoose = require("mongoose");
const passport = require("passport-restify");

const User = mongoose.model("User");

module.exports = (server) => () => {
	server.use(jwt({ secret: "SECRET" }).unless({
		custom: (req) => !req.url.match(/^\/api/),
		path: [
			"/api/login",
			"/api/register"
		]
	}));

	server.post("/register", (req, res, next) => {
		const reqParams = ["email", "firstName", "lastName", "password"];
		const error = checkParams(req.body, reqParams);

		if (error) {
			req.log.error(error);
			return next(error);
		}

		const user = new User();
		reqParams.forEach((param) => user[param] = req.body[param]);
		user.save((saveErr) => {
			if (saveErr) {
				req.log.error(saveErr);

				if (saveErr.code === "UserAlreadyExists") {
					return next(new restify.BadRequestError("This email address is already registered"));
				}

				return next(saveErr);
			}

			res.json(201, { token: user.generateJWT() });
		});
	});

	server.post("/login", (req, res, next) => {
		passport.authenticate("local", (err, user, info) => {
			if (err) {
				return next(err);
			}

			if (!user) {
				return next(new restify.UnauthorizedError(info.message));
			}

			res.json(200, { token: user.generateJWT() });
		})(req, res, next);
	});

	server.get("/test", (req, res) => {
		res.json({ message: "HELLO" });
	});
};

function checkParams(params, reqParams) {
	const missingParams = [];

	if (!params || typeof params !== "object") {
		return new restify.BadRequestError("Missing request body");
	}

	reqParams.forEach((reqParam) => params[reqParam] ? null : missingParams.push(reqParam));

	if (missingParams.length) {
		return new restify.MissingParameterError(`Missing required parameters: ${missingParams.join(", ")}`);
	}
}
