"use strict";

const restify = require("restify");
const mongoose = require("mongoose");
const passport = require("passport-restify");
const Sendgrid = require("sendgrid");

const config = require("../config");

const sendgrid = Sendgrid(config.sendgrid_key);
const User = mongoose.model("User");

module.exports = (server) => () => {
	server.post("/register", (req, res, next) => {
		const reqParams = ["email", "firstName", "lastName", "password"];
		const error = checkParams(req.body, reqParams);

		if (error) {
			req.log.error(error);
			return next(error);
		}

		User.findOne({ email: req.body.email }, (err, existingUser) => {
			if (err) {
				return next(err);
			}

			if (existingUser) {
				return next(new restify.BadRequestError("This email address is already registered"));
			}

			const user = new User();
			reqParams.forEach((param) => user[param] = req.body[param]);
			user.save((saveErr) => {
				if (saveErr) {
					req.log.error(saveErr);
					return next(saveErr);
				}

				res.json(201, { token: user.generateJWT() });
			});
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

	server.post("/forgot", (req, res, next) => {
		const reqParams = ["email"];
		const error = checkParams(req.body, reqParams);

		if (error) {
			return next(error);
		}

		User.findOne({ email: req.body.email }, (err, user) => {
			if (err) {
				return next(err);
			}

			if (!user) {
				return next(new restify.UnauthorizedError("No matching user"));
			}

			user.generateResetToken((genErr, token) => {
				if (genErr) {
					return next(genErr);
				}

				const email = new sendgrid.Email({
					to: req.body.email,
					from: config.sendgrid_from,
					fromname: "Chris at Field Contact",
					subject: "Field Contact Password Reset Request",
					text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.

          			       Please click on the following link, or paste this into your browser to complete the process:

          				   http://${req.headers.host}/reset?token=${token}

          				   If you did not request this, you can safely ignore this email.`
				});

				sendgrid.send(email, (sendErr) => {
					if (sendErr) {
						return next(sendErr);
					}

					res.json({ message: `Email sent to ${sanitizeEmail(req.body.email)}` });
				});
			});
		});
	});

	server.post("/reset", (req, res, next) => {
		const reqParams = ["password", "confirmPassword", "token"];
		const error = checkParams(req.body, reqParams);

		if (error) {
			return next(error);
		}

		User.findOne({
			passwordResetToken: req.body.token,
			passwordResetExpires: { $gt: Date.now() }
		}, (err, user) => {
			if (err) {
				return next(err);
			}

			if (!user) {
				return next(new restify.UnauthorizedError("Password reset token is invalid or has expired"));
			}

			if (req.body.password !== req.body.confirmPassword) {
				return next(new restify.BadRequestError("Passwords do not match"));
			}

			user.password = req.body.password;
			user.passwordResetToken = undefined;
			user.passwordResetExpires = undefined;

			user.save((saveErr) => {
				if (saveErr) {
					return next(saveErr);
				}

				const email = new sendgrid.Email({
					to: user.email,
					from: config.sendgrid_from,
					fromname: "Chris at Field Contact",
					subject: "Your password has been changed",
					text: `Hello,

						   This is a confirmation that the password for your Field Contact account ${user.email} has been changed.

						   If you did not request this change, please contact us immediately.`
				});

				sendgrid.send(email, (sendErr) => {
					if (sendErr) {
						return next(sendErr);
					}

					res.send(204);
				});
			});
		});
	});
};

function sanitizeEmail(email) {
	let length = email.lastIndexOf("@") - 1;
	let stars = "";
	while (length--) {
		stars += "*";
	}

	return email.substr(0, 2).concat(stars).concat(email.substr(email.lastIndexOf("@")));
}

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
