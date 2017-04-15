import { FTP_USERNAME, FTP_PASSWORD, FTP_DESTINATION_PATH } from './env/constants';

import gulp from 'gulp';
import gulpPluginsModule from 'gulp-load-plugins';
import babelify from 'babelify';
import browserify from 'browserify';
import browserSyncModule from 'browser-sync';
import del from 'del';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import ftp from 'vinyl-ftp';

const $$ = gulpPluginsModule();
const browserSync = browserSyncModule.create();
const reload = browserSync.reload;

const paths = {
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
  }
};

gulp.task('clean:css', (done) =>
  del(['./build/css/**/*.css'], done));

gulp.task('clean:js', (done) =>
  del(['./build/js/**/*.js'], done));

gulp.task('sass', ['clean:css'], () =>
  gulp.src(paths.src.sass)
    .pipe($$.sass())
    .on('error', $$.sass.logError)
    .pipe($$.autoprefixer())
    .pipe($$.cssnano({
      zindex: false
    }))
    .pipe($$.concat('styles.css'))
    .pipe(gulp.dest(paths.dest.css))
    .pipe(browserSync.stream());
});

gulp.task('js', ['clean:js'], () =>
    browserify({
      entries: paths.src.appJs,
      extensions: ['.js'],
      debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe($$.uglify())
    .pipe(gulp.dest(paths.dest.js))
    .on('end', reload));

gulp.task('ejs', () =>
  gulp.src(paths.src.html)
    .pipe(ejs({
      msg: "Hello Gulp!"
    }, {
      ext: '.html'
    }))
    .pipe(gulp.dest(paths.dest.html)));

// Reload html file when changes are saved
gulp.task('html', () =>
  gulp.src(paths.src.html)
  .on('end', reload));

gulp.task('serve', () => {
  browserSync.init({
    server: "./",
    startPath: paths.dest.startPath
  });
  gulp.watch(paths.src.sass, ['sass']);
  gulp.watch(paths.src.js, ['js']);
  gulp.watch(paths.src.html, ['ejs', 'html']);
});

// Added for hook to HubSpot
gulp.task('deploy-css', () => {
  const conn = ftp.create({
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
  const conn = ftp.create({
    host: 'ftp.hubapi.com',
    user: FTP_USERNAME,
    password: FTP_PASSWORD,
    port: 3200,
    secure: true
  });

  return gulp.src(['build/js/bundle.js'], { buffer: false })
    .pipe(conn.dest(FTP_DESTINATION_PATH));
});

gulp.task('deploy', () => {
  gulp.run('deploy-css');
  gulp.run('deploy-js');
});
// End hook

// The default task (called when we run `gulp` from cli)
gulp.task('default', ['js', 'sass'], () => {
  gulp.run('serve');
});
