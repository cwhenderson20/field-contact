"use strict";

const fs = require("fs");
const config = require("./_base");

const overridesFilename = `_${config.env}`;
let hasOverridesFile;

try {
	fs.lstatSync(`${__dirname}/${overridesFilename}.js`);
	hasOverridesFile = true;
} catch (e) {
	console.warn(`No overrides file found for env ${config.env}`);
}

let overrides;
if (hasOverridesFile) {
	overrides = require(`./${overridesFilename}`)(config);
}

module.exports = Object.assign({}, config, overrides);
