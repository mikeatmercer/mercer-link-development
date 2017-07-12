var gulp = require('gulp');

var sass = require('gulp-sass');
var replace = require('gulp-replace');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
gulp.task("move", function(){
  var date = new Date();
return gulp.src(['entry.html '])

        .pipe(gulp.dest('z:'))
});

gulp.task('sass',function(){
  return gulp.src('main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('z:'));
});
gulp.task('scripts',function(){
  return gulp.src(['scripts/*.js','init.js'])
    .pipe(concat('main_script.js'))
    .pipe(gulp.dest('z:'));
});
gulp.task('lint', function() {
  return gulp.src(['scripts/*.js','init.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


gulp.task('watch', function() {
    gulp.watch(['scss/**/*'], ['sass']);
    gulp.watch(['entry.html'], ['move']);
    gulp.watch([['scripts/*.js','init.js']], ['scripts']);
});
