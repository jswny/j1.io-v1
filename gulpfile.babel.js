import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';
import gulpCache from 'gulp-file-cache';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import jshint from 'gulp-jshint';
import stylish from 'jshint-stylish';

let cache = new gulpCache();

gulp.task('sass', () => {
  return gulp.src('./lib/sass/**/*.scss')
    .pipe(cache.filter())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(cache.cache())
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('babel', () => {
  return gulp.src('./lib/index.js')
    .pipe(cache.filter())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(cache.cache())
    .pipe(gulp.dest('./dist'));
});

gulp.task('jshint', () => {
  return gulp.src('./lib/*.js')
    .pipe(jshint({ esversion: 6 }))
    .pipe(jshint.reporter(stylish));
});

gulp.task('bs-reload', () => {
  browserSync.reload();
});

gulp.task('nodemon', ['jshint', 'babel', 'sass'], (cb) => {
  let started = false;
  return nodemon({
    script: './dist/index.js',
    watch: './lib',
    tasks: ['babel', 'jshint']
    })
  .on('start', () => {
    if (!started) {
      started = true;
      cb();
    }
  }).on('restart', () => {
    setTimeout(() => {
      browserSync.reload({
        stream: false
      });
    }, 500);
  });
});

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync({
    proxy: 'localhost:3000',
    files: ['./public/**/*.*'],
    port: 5000
  });
});

gulp.task('watch', ['browser-sync'], () => {
  gulp.watch('./lib/sass/**/*.scss', ['sass']);
  gulp.watch('./views/**/*.hbs', ['bs-reload']);
});

gulp.task('build', () => {
  gulp.src('./lib/index.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist'));

  gulp.src('./lib/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css/'));
});