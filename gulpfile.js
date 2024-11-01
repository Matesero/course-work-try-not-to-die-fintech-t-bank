const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();

const paths = {
    styles: {
        src: 'src/less/**/*.less',
        dest: 'src/css'
    }
};

function styles() {
    return gulp.src(paths.styles.src)
      .pipe(plumber({ errorHandler: function(err) {  }}))
      .pipe(less())
      .pipe(concat('style.css'))
      .pipe(cleanCSS())
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(browserSync.stream());
}

function serve() {
    browserSync.init({
        server: {
            baseDir: './src'
        }
    });
    gulp.watch(paths.styles.src, styles);
    gulp.watch('./src/*.html').on('change', browserSync.reload);
}

exports.styles = styles;
exports.serve = serve;
exports.default = gulp.series(styles, serve);