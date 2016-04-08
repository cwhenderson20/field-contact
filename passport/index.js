"use strict";

const passport = require("passport-restify");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("User");

passport.use(new LocalStrategy({
	usernameField: "email",
	session: false
}, (email, password, done) => {
	User.findOne({ email }, (err, user) => {
		if (err) {
			return done(err);
		}

		if (!user) {
			return done(null, false, { message: "No matching user" });
		}

		user.checkPassword(password, (checkErr, isValid) => {
			if (checkErr) {
				return done(err);
			}

			if (!isValid) {
				return done(null, false, { message: "Invalid password" });
			}

			done(null, user);
		});
	});
}));
