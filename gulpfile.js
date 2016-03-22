// npm install --save-dev gulp browserify babel babel-cli babel-preset-es2015 babelify del vinyl-source-stream gulp-uglify gulp-sass gulp-autoprefixer gulp-cssnano gulp-concat browser-sync breakpoint-sass

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var del = require('del');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var ftp = require('vinyl-ftp');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var $USERHOME = process.env.HOME;

var paths = {
    src: {
        sass: ['./src/sass/**/*.sass'],
        js: ['./src/js/**/*.js'],
        appJs: ['./src/js/index.js'],
        html: ['./*.html']
    },
    dest: {
        dist: './',
        css: './build/css',
        js: './build/js'
    },
    hubspotPublicAssetsRoot: $USERHOME + '/github/hubspot_public_assets',
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
                paths.hubspotPublicAssetsRoot,
                paths.breakpointStylesheets
            ]
        })).on('error', sass.logError)
        .pipe(autoprefixer())
        .pipe(cssnano())
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
    .pipe(gulp.dest(paths.dest.js))
        .on('end', reload);
});

// Reload html file when changes are saved
gulp.task('html', function() {
    return gulp.src(paths.src.html)
        .on('end', reload);
});

gulp.task('deploy-css', function() {
    var conn = ftp.create({
        host: 'ftp.hubapi.com',
        user: 'pwilver12@gmail.com',
        password: 'Ltlec0met0',
        port: 3200,
        secure: true
    });

    return gulp.src(['build/css/styles.css'], { buffer: false })
        .pipe(conn.dest('/portals/2124715-avnet_riverbed/content/templates/custom/page/avr'));
});

gulp.task('deploy-js', function() {
    var conn = ftp.create({
        host: 'ftp.hubapi.com',
        user: 'pwilver12@gmail.com',
        password: 'Ltlec0met0',
        port: 3200,
        secure: true
    });

    return gulp.src(['build/js/bundle.js'], { buffer: false })
        .pipe(conn.dest('/portals/2124715-avnet_riverbed/content/templates/custom/page/avr'));
});

gulp.task('serve', function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch(paths.src.sass, ['sass', 'deploy-css']);
    gulp.watch(paths.src.js, ['js', 'deploy-js']);
    gulp.watch(paths.src.html, ['html']);
});

// The default task (called when we run `gulp` from cli)
gulp.task('default', ['js', 'sass'], function() {
    gulp.run('serve');
});
