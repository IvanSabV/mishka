var gulp = require('gulp'),
    less = require('gulp-less'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('less', function () {
  return gulp.src('source/less/**/*.less')
    .pipe(less())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('source/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: 'source'
    },

  });
});

gulp.task('code', function() {
  return gulp.src('source/*.html')
  .pipe(browserSync.reload({ stream: true }))
});

gulp.task('clean', async function() {
  return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
  return gulp.src('source/img/**/*') // Берем все изображения из app
      .pipe(cache(imagemin({ // С кешированием
      // .pipe(imagemin({ // Сжимаем изображения без кеширования
          interlaced: true,
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()]
      }))/**/)
      .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('prebuild', async function() {

    var buildFonts = gulp.src('source/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('source/fonts'))

    var buildJs = gulp.src('source/js/**/*') // Переносим скрипты в продакшен
    .pipe(gulp.dest('source/js'))

    var buildHtml = gulp.src('source/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
  return cache.clearAll();
})

gulp.task('watch', function() {
  gulp.watch('source/less/**/*.less', gulp.parallel('less')); // Наблюдение за sass файлами
  gulp.watch('source/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
});
gulp.task('default', gulp.parallel('less', 'browser-sync', 'watch'));
gulp.task('build', gulp.parallel('prebuild', 'clean', 'img', 'less'));

