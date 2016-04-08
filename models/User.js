"use strict";

const crypto = require("crypto");
const moment = require("moment");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uuid = require('uuid');
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		lowercase: true,
		unique: true,
		trim: true,
		required: true
	},
	firstName: {
		type: String,
		trim: true,
		required: true
	},
	lastName: {
		type: String,
		trim: true,
		required: true
	},
	password: { type: String, required: true },
	passwordResetToken: String,
	passwordResetExpires: Date
});

UserSchema.virtual("name").get(function() {
	return `${this.firstName} ${this.lastName}`;
});

UserSchema.pre("save", function(next) {
	const user = this;
	const User = mongoose.model("User", UserSchema);

	User.findOne({ email: user.email }, (err, existingUser) => {
		if (err) {
			return next(err);
		}

		if (existingUser) {
			const existingUserError = new Error("User already exists");
			existingUserError.code = "UserAlreadyExists";
			return next(existingUserError);
		}

		bcrypt.hash(user.password, 1, (err, hash) => {
			if (err) {
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.checkPassword = checkPassword;
UserSchema.methods.generateResetToken = generateResetToken;
UserSchema.methods.generateJWT = generateJWT;

function checkPassword(input, cb) {
	bcrypt.compare(input, this.password, (err, isMatch) => {
		if (err) {
			return cb(err);
		}
		cb(null, isMatch);
	});
}

function generateResetToken(cb) {
	const user = this;
	const token = crypto.randomBytes(20).toString("hex");

	user.passwordResetToken = token;
	user.passwordResetExpires = Date.now() + 1800000;

	user.save((err) => {
		if (err) {
			return cb(err);
		}
		cb(null, token);
	});
}

function generateJWT() {
	const exp = moment().add(60, "days");

	return jwt.sign({
		_id: this._id,
		email: this.email,
		exp: exp.unix()
	}, "SECRET", {
		jwtid: uuid.v4()
	});
}

mongoose.model("User", UserSchema);
