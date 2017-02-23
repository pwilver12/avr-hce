import { FTP_USERNAME, FTP_PASSWORD, FTP_DESTINATION_PATH } from './env/constants';

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var del = require('del');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var ejs = require('gulp-ejs');
var ftp = require('vinyl-ftp');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var paths = {
    src: {
        sass: ['./src/sass/**/*.sass'],
        js: ['./src/js/**/*.js'],
        appJs: ['./src/js/index.js'],
        html: ['./src/views/**/*.ejs']
    },
    dest: {
        dist: './',
        css: './build/css',
        js: './build/js',
        html: './build/html/',
        startPath: './build/html/pages'
    },
    breakpointStylesheets: './node_modules/breakpoint-sass/stylesheets'
};

gulp.task('clean:css', function(done) {
    return del(['./build/css/**/*.css'], done);
});

gulp.task('clean:js', function(done) {
    return del(['./build/js/**/*.js'], done);
});

gulp.task('sass', ['clean:css'], function() {
    return gulp.src(paths.src.sass)
        .pipe(sass({
            includePaths: [
                paths.breakpointStylesheets
            ]
        })).on('error', sass.logError)
        .pipe(autoprefixer())
        .pipe(cssnano({
            zindex: false
        }))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(paths.dest.css))
        .pipe(browserSync.stream());
});

gulp.task('js', ['clean:js'], function() {
    return browserify({
        entries: paths.src.appJs,
        extensions: ['.js'],
        debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest.js))
        .on('end', reload);
});

gulp.task('ejs', function() {
  return gulp.src(paths.src.html)
    .pipe(ejs({
        msg: "Hello Gulp!"
    }, {
        ext: '.html'
    }))
    .pipe(gulp.dest(paths.dest.html));
});

// Reload html file when changes are saved
gulp.task('html', function() {
  return gulp.src(paths.src.html)
      .on('end', reload);
});

gulp.task('serve', function() {
    browserSync.init({
        server: "./",
        startPath: paths.dest.startPath
    });

    gulp.watch(paths.src.sass, ['sass']);
    gulp.watch(paths.src.js, ['js']);
    gulp.watch(paths.src.html, ['ejs', 'html']);
});

// Added for hook to HubSpot
gulp.task('deploy-css', function() {
    var conn = ftp.create({
        host: 'ftp.hubapi.com',
        user: FTP_USERNAME,
        password: FTP_PASSWORD,
        port: 3200,
        secure: true
    });

    return gulp.src(['build/css/styles.css'], { buffer: false })
        .pipe(conn.dest(FTP_DESTINATION_PATH));
});

gulp.task('deploy-js', function() {
    var conn = ftp.create({
        host: 'ftp.hubapi.com',
        user: FTP_USERNAME,
        password: FTP_PASSWORD,
        port: 3200,
        secure: true
    });

    return gulp.src(['build/js/bundle.js'], { buffer: false })
        .pipe(conn.dest(FTP_DESTINATION_PATH));
});

gulp.task('deploy', function() {
    gulp.run('deploy-css');
    gulp.run('deploy-js');
});
// End hook

// The default task (called when we run `gulp` from cli)
gulp.task('default', ['js', 'sass'], function() {
    gulp.run('serve');
});
