"use strict";

var gulp = require("gulp");
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var eslint = require('gulp-eslint');
var karma = require('karma');
var uglify = require('gulp-uglify');

gulp.task("build", function () {
  browserify({
    "debug": false,
    "entries": ['./client/src/app.js'],
    "paths": ['./node_modules', './client/src', './client/spec']
  })
    .transform(babelify)
    .bundle()
    .pipe(source("script.js"))
    .pipe(gulp.dest("./server/public"))
});

gulp.task('compress', function() {
  return gulp.src('server/public/scirpt.js')
    .pipe(uglify())
    .pipe(gulp.dest('server/public'));
});

gulp.task("lint", function () {
  return gulp.src(['./client/src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task("test", function () {
  return karma.server.start({
    configFile: __dirname+'/karma.conf.js',
    singleRun: true
  });
});

gulp.task("karma", function (){
  return karma.server.start({
    configFile: __dirname + '/karma.conf.js'
  });
});

gulp.task("watch", ["karma"], function () {
  gulp.watch('./client/**/*.js', ['lint', 'build']);
});
