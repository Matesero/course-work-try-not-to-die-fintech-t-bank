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
    },
    html: './src/*.html'
};

function styles() {
    return gulp.src(paths.styles.src)
      .pipe(plumber({
          errorHandler: function (err) {
              console.error(err.message);
              this.emit('end');
          }
      }))
      .pipe(less())
      .pipe(concat('style.css'))
      .pipe(cleanCSS())
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(browserSync.stream());
}

function serve() {
    browserSync.init({
        server: {
            baseDir: './src',
            middleware: [
                function (req, res, next) {
                    const url = req.url;
                    const patientRegex = new RegExp('^/patient/[0-9a-fA-F-]{36}/?');
                    const inspectionRegex = new RegExp('^/inspection/[0-9a-fA-F-]{36}/?')

                    if (url.match(patientRegex)) {
                        req.url = '/patient.html';
                    }

                    if (url.match(inspectionRegex)) {
                        req.url = '/inspection.html';
                    }

                    next();
                },
            ]
        }
    });

    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.html).on('change', browserSync.reload);
}

exports.styles = styles;
exports.serve = serve;
exports.default = gulp.series(styles, serve);
