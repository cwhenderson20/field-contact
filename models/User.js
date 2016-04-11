"use strict";

const crypto = require("crypto");
const moment = require("moment");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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

	if (!user.isModified("password")) {
		return next();
	}

	bcrypt.hash(user.password, 1, (err, hash) => {
		if (err) {
			return next(err);
		}
		user.password = hash;
		next();
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
	const token = crypto.randomBytes(30).toString("hex");

	user.passwordResetToken = token;
	user.passwordResetExpires = Date.now() + 180000;

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
		authData: crypto.createHash("sha256").update(this.password).digest("hex"),
		exp: exp.unix()
	}, "SECRET", {
		jwtid: uuid.v4()
	});
}

mongoose.model("User", UserSchema);
