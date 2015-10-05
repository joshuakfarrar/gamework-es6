var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var del = require('del');
var chalk = require('chalk');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');

// server
var babel = require('gulp-babel');

// client
var watchify = require('watchify');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var stylus = require('gulp-stylus');
var prettyTime = require('prettytime');

var environment = process.env.NODE_ENV || 'development';

gulp.task('browserify', function() {
  var devMode = environment === 'development';

  var browserifyOpts = {
    entries: './client/js/home.js',
    debug: devMode
  };

  var bundle = (devMode)
    ? watchify(browserify(browserifyOpts), { poll: 100 })
    : browserify(browserifyOpts);

  bundle.transform(babelify);
  bundle.on('update', function() {
    gutil.log("Bundling...");
    return rebundle(bundle);
  });
  bundle.on('time', function(time) {
    var t = prettyTime(time);
    gutil.log("Bundle generated in", chalk.magenta(t));
  });

  function rebundle(bundle) {
    return bundle.bundle()
    .on('error', function(error) {
      gutil.log(chalk.red(error.stack));
      this.emit('end');
    })
    .pipe(
        gulpif(
          (process.env.NODE_ENV !== 'development'),
          source('bundle.min.js'),
          source('bundle.js')
        )
    )
    .pipe(gulp.dest('dist/js'))
  }

  return rebundle(bundle);
});

gulp.task('stylus', function() {
  del.sync('./dist/css');
  return gulp.src('./client/stylus/**/*.styl')
    .pipe(stylus().on('error', function(err) {
      console.error(err);
      this.emit('end');
    }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('compile', function() {
  del.sync('./server/lib');
  return gulp.src('./server/src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./server/lib'))
});

gulp.task('statics', function() {
  gulp.src('./client/js/keypress.js')
    .pipe(gulp.dest('./dist/js'));

  var statics = [
    './client/meshes/**/*.json',
    './client/textures/**/*.png'
  ]
  return gulp.src(statics)
    .pipe(gulp.dest('./dist/meshes'));
});

gulp.task('serve', ['build'], function() {
  gulp.watch('./client/stylus/**/*.styl', ['stylus']);
  return nodemon({
    script: './server',
    ignore: [
      './server/lib/*.js',
      './node_modules',
      './dist',
      './client'
    ],
    tasks: ['compile'],
    env: { 'NODE_ENV': environment }
  });
});

gulp.task('build', ['statics', 'compile', 'stylus', 'browserify']);
