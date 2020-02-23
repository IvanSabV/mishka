"use strict";

var gulp = require('gulp'),
    less = require('gulp-less'),
    sourcemap = require("gulp-sourcemaps"),
    rename =  require("gulp-rename"),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require("gulp-plumber"),
    webp = require("gulp-webp"),
    svgstore = require("gulp-svgstore");

gulp.task('less', function () {
  return gulp.src('source/less/main.less')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(rename("main.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
    notify: false,
  });

  gulp.watch('source/less/**/*.less', gulp.series('less')); 
  gulp.watch("source/img/icon-*.svg", gulp.series('sprite', 'code'));
  gulp.watch('source/*.html', gulp.series('code')); 

});

gulp.task('code', function() {
  return gulp.src('source/*.html')
  .pipe(gulp.dest("build"))
  .pipe(browserSync.reload({ stream: true }));
});

gulp.task('clean', async function() {
  return del.sync('build'); 
});

gulp.task('img', function() {
  return gulp.src('source/img/**/*') 
      .pipe(imagemin([
        imagemin.optipng({optimizationlevel: 3}),
        imagemin.mozjpeg({progressive: true}),
        imagemin.svgo()
        ]))
      .pipe(gulp.dest('build/img')); 
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/**/icon-*.svg")
    .pipe(svgstore ({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task('prebuild', async function() {

    var buildFonts = gulp.src('source/fonts/**/*.{woff,woff2}') 
    .pipe(gulp.dest('build/fonts'))

    var buildJs = gulp.src('source/js/**/*') 
    .pipe(gulp.dest('build/js'))

    var buildHtml = gulp.src('source/*.html') 
    .pipe(gulp.dest('build'));

});

gulp.task('clear', function (callback) {
  return cache.clearAll();
})


gulp.task('build', gulp.series('prebuild', 'clean', 'img', 'webp', 'less', 'sprite'));

gulp.task('start', gulp.series('build', 'browser-sync'));
