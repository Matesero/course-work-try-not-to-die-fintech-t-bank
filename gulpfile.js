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
                    const registrationRegex = new RegExp('^/registration/?');
                    const loginRegex = new RegExp('^/login/?');
                    const profileRegex = new RegExp('^/profile/?');
                    const patientsRegex = new RegExp('^/patients/?');
                    const consultationsRegex = new RegExp('^/consultations/?');
                    const reportsRegex = new RegExp('^/reports/?');
                    const createRegex = new RegExp('^/create/?');

                    if (url.match(createRegex)) {
                        req.url = '/create.html';
                    }

                    if (url.match(reportsRegex)) {
                        req.url = '/reports.html';
                    }

                    if (url.match(consultationsRegex)) {
                        req.url = '/consultations.html';
                    }

                    if (url.match(patientsRegex)) {
                        req.url = url.replace(patientsRegex, '/patients.html');
                    }

                    if (url.match(registrationRegex)) {
                        req.url = '/registration.html'
                    }

                    if (url.match(loginRegex)) {
                        req.url = '/login.html'
                    }

                    if (url.match(profileRegex)) {
                        req.url = '/profile.html'
                    }

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
