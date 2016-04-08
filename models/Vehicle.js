"use strict";

const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE","FL", "GA",
				"HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
				"MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
				"NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
				"SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

const VehicleSchema = new mongoose.Schema({
	user: { type: ObjectId, ref: "User" },
	make: { type: String, trim: true },
	model: { type: String, trim: true },
	year: Number,
	color: { type: String, trim: true },
	plate: {
		state: { type: String, enum: states },
		number: { type: String, trim: true }
	},
	vin: { type: String, trim: true },
	style: { type: String, trim: true },
	identifyingMarks: String,
	notes: [String],
	ownerInfo: {
		firstName: { type: String, trim: true },
		lastName: { type: String, trim: true },
		address1: { type: String, trim: true },
		address2: { type: String, trim: true },
		city: { type: String, trim: true },
		state: { type: String, "enum": states },
		zip: { type: String, trim: true }
	},
	tags: [{ type: ObjectId, ref: "Tag" }]
});

// VehicleSchema.virtual("ownerInfo.name").get(`${this.ownerInfo.firstName} ${this.ownerInfo.lastName}`);

mongoose.model("Vehicle", VehicleSchema);
