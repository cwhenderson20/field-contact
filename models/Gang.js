"use strict";

const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const GangSchema = new mongoose.Schema({
	user: { type: ObjectId, ref: "User", index: 1 },
	name: {
		type: String,
		trim: true,
		unique: true
	},
	notes: [String],
	tags: [{ type: ObjectId, ref: "Tag" }]
});

mongoose.model("Gang", GangSchema);
