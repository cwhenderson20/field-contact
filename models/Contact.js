"use strict";

const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const ContactSchema = new mongoose.Schema({
	user: { type: ObjectId, ref: "User", index: 1},
	firstName: { type: String, trim: true },
	lastName: { type: String, trim: true },
	middleName: { type: String, trim: true },
	alias: { type: String, trim: true },
	ssn: { type: String, trim: true },
	oln: { type: String, trim: true },
	height: {
		value: Number,
		unit: {
			type: String,
			"enum": ["in", "cm"],
			"default": "in"
		}
	},
	weight: {
		value: Number,
		unit: {
			type: String,
			"enum": ["lbs", "kg"],
			"default": "lbs"
		}
	},
	gender: String,
	ethnicity: String,
	identifyingMarks: String,
	notes: [String],
	gang: { type: ObjectId, ref: "Gang", index: 1 },
	tags: [{ type: ObjectId, ref: "Tag" }]
});

mongoose.model("Contact", ContactSchema);
