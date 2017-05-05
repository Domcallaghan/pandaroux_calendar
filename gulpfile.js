'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var connect = require('gulp-connect');

gulp.task('connect', function() {
    connect.server({
      livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./index.html')
      .pipe(connect.reload());
});

gulp.task('concat', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('compress', function (cb) {
  pump([
        gulp.src('dist/js/main.js'),
        uglify(),
        gulp.dest('dist/js/min')
    ],
    cb
  );
});
gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('watch', function()
{
	gulp.watch('./src/sass/**/*.scss', ['sass', 'html']);
    gulp.watch('./src/js/**/*.js', ['concat', 'html']);
    gulp.watch('./index.html', ['html']);
});


gulp.task('default', ['connect', 'watch']);
