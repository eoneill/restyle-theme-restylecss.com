"use strict";

var gulp = require("gulp");

require("./build/release")(gulp, ["test"]);
require("./build/publish")(gulp, ["test"]);

require("./build/lint")(gulp);
require("./build/test")(gulp, ["lint"]);

gulp.task("default", ["test"]);
