"use strict"

const restify = require("restify");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Contact = mongoose.model("Contact");

module.exports = (server) => () => {
	server.get("/", (req, res, next) => {
		const user = req.user._id;
		const skip = req.query.skip || 0;
		const limit = req.query.limit || 50;

		Contact.find({ user }).skip(skip).limit(limit).exec((err, contacts) => {
			if (err) {
				return next(err);
			}

			res.json(contacts);
		});
	});

	server.post("/", (req, res, next) => {
		const contact = new Contact({ user: req.user._id });
		const validFields = [
			"firstName", "lastName", "middleName", "alias",
			"ssn", "oln", "height", "weight", "gender","ethnicity",
			"identifyingMarks", "notes", "gang", "tags"
		];

		if (!req.body) {
			return next(new restify.BadRequestError("Missing request body"));
		}

		validFields.forEach((field) => {
			if (req.body[field]) {
				contact[field] = req.body[field];
			}
		});

		contact.save((err, savedContact) => {
			if (err) {
				return next(err);
			}

			res.json(savedContact);
		});
	});

	server.get("/:id", (req, res, next) => {
		const id = req.params.id;

		if (!ObjectId.isValid(id)) {
			return next(new restify.BadRequestError("Invalid id"));
		}

		Contact.findById(id, (err, contact) => {
			if (err) {
				return next(err);
			}

			if (!contact) {
				return next(new restify.NotFoundError("Contact not found"));
			}

			res.json(contact);
		});
	});

	server.put("/:id", (req, res, next) => {
		const update = { $set: {} };
		const validFields = [
			"firstName", "lastName", "middleName", "alias",
			"ssn", "oln", "height", "weight", "gender","ethnicity",
			"identifyingMarks", "notes", "gang", "tags"
		];

		if (!req.body) {
			return next(new restify.BadRequestError("Missing request body"));
		}

		validFields.forEach((field) => {
			if (req.body[field]) {
				update.$set[field] = req.body[field];
			}
		});

		Contact.findByIdAndUpdate(req.params.id, update, { new: true }, (err, updatedContact) => {
			if (err) {
				return next(err);
			}

			if (!updatedContact) {
				return next(new restify.NotFoundError("Contact not found"));
			}

			res.json(updatedContact);
		});
	});

	server.del("/:id", (req, res, next) => {
		const id = req.params.id;

		if (!ObjectId.isValid(id)) {
			return next(new restify.BadRequestError("Invalid id"));
		}

		Contact.findByIdAndRemove(id, (err, contact) => {
			if (err) {
				return next(err);
			}

			if (!contact) {
				return next(new restify.NotFoundError("Contact not found"));
			}

			res.send(204);
		});
	});
};
