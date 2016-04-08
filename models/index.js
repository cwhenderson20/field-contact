"use strict";

const fs = require("fs");

fs.readdirSync(__dirname)
	.filter((file) => !file.match("index.js"))
	.forEach((file) => require(`./${file}`));
