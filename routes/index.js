"use strict";

const crypto = require("crypto");
const jwt = require("restify-jwt");
const restify = require("restify");
const mongoose = require("mongoose");

const namespace = require("./namespace");
const config = require("../config");

const User = mongoose.model("User");

module.exports = (server) => () => {
	server.pre(restify.pre.sanitizePath());
    server.use(jwt({ secret: config.jwt_secret, isRevoked }).unless({
        custom: (req) => !req.url.match(/^\/api/),
        path: [
            "/api/login",
            "/api/register",
            "/api/forgot",
            "/api/reset"
        ]
    }));

	namespace(server, "/", require("./auth")(server));
	namespace(server, "/contacts", require("./contacts")(server));
};

function isRevoked(req, payload, done) {
    const userId = payload._id;
    const authData = payload.authData;

    User.findById(userId).select("password").exec((err, user) => {
        if (err) {
            return done(err);
        }

        if (!userId) {
            return new Error("User not found");
        }

        if (crypto.createHash("sha256").update(user.password).digest("hex") !== authData) {
            return done(null, true);
        }

        done();
    });
}
