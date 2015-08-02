"use strict";

var git = require("gulp-git");
var bump = require("gulp-bump");
var prompt = require("gulp-prompt");
var tagVersion = require("gulp-tag-version");
var shell = require("gulp-shell");

var pkgSource = ["./package.json"];

var versionTypes = ["patch", "minor", "major"];

module.exports = function(gulp, depends) {
  function increment(type) {
    // get all the files to bump version in
    return gulp.src(pkgSource)
      // bump the version number in those files
      .pipe(bump({type: type}))
      // save it back to filesystem
      .pipe(gulp.dest("./"))
      // commit the changed version number
      .pipe(git.commit("bump version"))
      // tag it in the repository
      .pipe(tagVersion())
      // push it
      // can't use git.push until this is resolved...
      // https://github.com/ikari-pl/gulp-tag-version/issues/8
      //.pipe(git.push("origin", "master", {args: "--tags"}));
      .pipe(shell("git push origin master --tags"));
  }

  gulp.task("release", depends, function(done) {
    return gulp.src(pkgSource)
      .pipe(prompt.prompt({
          type: "checkbox",
          name: "type",
          message: "What type of release would you like to do?",
          choices: versionTypes
      }, function(result){
        var type = result.type[0];
        if (type) {
          return increment(type);
        }
      }));
  });

  versionTypes.forEach(function(version) {
    gulp.task("release:" + version, depends, increment.bind(increment, version));
  });
};
