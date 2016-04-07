"use strict";

const mongoose = require("mongoose");

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
	hash: String,
	salt: String
});

UserSchema.virtual("name").get(() => `${this.firstName} ${this.lastName}`);

mongoose.model("User", UserSchema);
