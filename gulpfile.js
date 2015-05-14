//TODO: Figure out how to selectively push dist to heroku

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat-util'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    plumber = require('gulp-plumber')
    ngAnnotate = require('gulp-ng-annotate'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    cssfont64 = require('gulp-cssfont64'),
    livereload = require('gulp-livereload'),
    del = require('del');

gulp.task('html', function(){
    gulp.src(['src/partials/**/*']).pipe(gulp.dest('dist/partials'))
    gulp.src('src/index.html').pipe(gulp.dest('dist/'))
    gulp.src(['src/partials/*.html']).pipe(livereload());
});

gulp.task('fonts', function() {
    gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'))
})

gulp.task('styles', function() {
  return gulp.src('src/styles/**/*.sass')
    .pipe(sass({
        style: 'expanded',
        errLogToConsole: true,
        indentedSyntax: true
    }))
    .pipe(concat('style.css'))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload())
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src(['src/js/app.js', 'src/js/**/*.js'])
    .pipe(plumber())
    .pipe(concat('main.js', {process: function(src) { return (src.trim() + '\n').replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1'); }}))
    .pipe(concat.header('(function(window, document, undefined) {\n\'use strict\';\n'))
    .pipe(concat.footer('\n})(window, document);\n'))
    .pipe(ngAnnotate())
    // .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload())
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/img'))
    .pipe(livereload())
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function(cb) {
    del(['dist/css', 'dist/js', 'dist/img', 'dist/fonts'], cb)
});

gulp.task('default', ['clean'], function() {
    gulp.start('html', 'styles', 'scripts', 'images', 'fonts');
});

gulp.task('watch', function() {
    gulp.watch('src/fonts/**/*', ['fonts']);

    gulp.watch('src/**/*.html', ['html']);

    gulp.watch('src/styles/**/*.sass', ['styles']);

    gulp.watch('src/js/**/*.js', ['scripts']);

    gulp.watch('src/images/**/*', ['images']);

    livereload.listen();

});
