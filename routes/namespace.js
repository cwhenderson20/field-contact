"use strict";

const path = require("path");
const methods = ["del", "get", "head", "opts", "post", "put", "patch"];

module.exports = (server, prefix, callback) => {
	const originals = {};

	methods.forEach((method) => {
		const orig = server[method];

		originals[method] = orig;
		server[method] = function() {
			const args = Array.prototype.slice.call(arguments, 0);
			const route = args[0];
			const regexMsg = "Regular expression route support is not implemented";

			if (route instanceof RegExp) {
				throw new Error(regexMsg);
			}

			if (typeof route === "string") {
				args[0] = path.join(prefix, route);
			} else if (typeof route === "object") {
				if (typeof route.path === "string") {
					route.path = path.join(prefix, route.path);
				} else if (route.path instanceof RegExp) {
					throw new Error(regexMsg);
				}
			}
			orig.apply(this, args);
		};
	});

	callback();

	methods.forEach((method) => server[method] = originals[method]);
};
