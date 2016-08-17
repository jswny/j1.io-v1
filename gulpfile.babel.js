import gulp from 'gulp';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';
import gulpCache from 'gulp-file-cache';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import jshint from 'gulp-jshint';
import stylish from 'jshint-stylish';
import webpack from 'gulp-webpack';
import webpackConfig from './config/webpack.config.js';

let cache = new gulpCache();

gulp.task('webpack', () => {
  return gulp.src('./lib/client/js/pages')
    .pipe(webpack(webpackConfig.prod))
    .pipe(gulp.dest('./public/webpack'));
});

gulp.task('babel', () => {
  return gulp.src('./lib/server/index.js')
    .pipe(cache.filter())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(cache.cache())
    .pipe(gulp.dest('./dist/server'));
});

gulp.task('jshint', () => {
  return gulp.src(['./lib/**/*.js', '!./lib/**/*.min.js'])
    .pipe(jshint({ esversion: 6 }))
    .pipe(jshint.reporter(stylish));
});

gulp.task('bs-reload', () => {
  browserSync.reload();
});

gulp.task('nodemon', ['jshint', 'babel', 'webpack'], (cb) => {
  let started = false;
  return nodemon({
    script: './dist/server/index.js',
    watch: './lib/server/*.js',
    tasks: ['babel']
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
  gulp.watch(['./lib/client/sass/**/*.scss', './lib/client/js/**/*.js'], ['webpack']);
  gulp.watch('./lib/**/*.js', ['jshint']);
  gulp.watch('./views/**/*.hbs', ['bs-reload']);
});

gulp.task('build', ['webpack'], () => {
  gulp.src('./lib/server/index.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist/server'));
});