var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    minify = require('gulp-clean-css'),
    rename = require('gulp-rename');

gulp.task('build-css', function() {
  gulp.src('./src/sazerac.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 25 versions']
    }))
    .pipe(gulp.dest('./public/css'))
    .pipe(minify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
            baseDir: "./public"
        }
  });
})

gulp.task('watch', function(){
  gulp.watch('./src/**/*.scss', ['build-css']);
})

gulp.task('default', ['build-css', 'serve', 'watch']);
gulp.task('build', ['build-css']);
