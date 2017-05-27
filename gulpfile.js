const gulp         = require("gulp"),
      path         = require('path'),
      watch        = require('gulp-watch'),
      uglify       = require('gulp-uglify'),
      concat       = require('gulp-concat'),
      plumber      = require('gulp-plumber'),
      del          = require('del'),
      runSequence  = require('run-sequence'),
      exec         = require('child_process').execSync;

/**
 * File Path
 */
const ROOT        = __dirname;
const SRC_PATH    = path.join(ROOT, './lib');
const PUBLIC_PATH = path.join(ROOT, './public');
const DIST_PATH   = path.join(ROOT, './dist');

const JS_PUBLIC_FILES = path.join(PUBLIC_PATH, './**/*.js');

// Clean Task
gulp.task('js.build', function(callback) {
  exec('num run webpack', function(err, stdout, stderr) {
    if (err) { console.log(err); }

    callback();
  });
});

// JavaScript
gulp.task('js.copy', function() {
  return gulp.src([JS_PUBLIC_FILES])
    .pipe(gulp.dest(DIST_PATH));
});

// ファイル更新監視
gulp.task('watch', function() {
});

/**
 * Build Task
 **/
gulp.task('build.js', function(callback) {
  return runSequence(
    'js.build',
    'js.copy',
    callback
  );
});

/**
 * Dist Task
 **/
gulp.task('dist', function(callback) {
  return runSequence(
    'build.js',
    callback
  );
});

/**
 * default Task
 **/
gulp.task('default', function(callback) {
  runSequence(
    'watch',
    callback
  );
});