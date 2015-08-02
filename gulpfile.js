"use strict";

var gulp = require("gulp");

require("./build/release")(gulp);
require("./build/publish")(gulp);

require("./build/lint")(gulp);
require("./build/test")(gulp, ["lint"]);

gulp.task("default", ["test"]);
