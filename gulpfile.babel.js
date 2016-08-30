import gulp from 'gulp';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';
import cache from 'gulp-cached';
import browserSync from 'browser-sync';
import jshint from 'gulp-jshint';
import stylish from 'jshint-stylish';
import webpack from 'webpack-stream';
import webpackConfig from './config/webpack.config.js';
import markdown from 'gulp-markdown';
import rename from 'gulp-rename';

gulp.task('blog', () => {
  return gulp.src('./lib/server/posts/**/*.md')
    .pipe(cache('blog'))
    .pipe(markdown({ langPrefix:'language-' }))
    .pipe(rename((path) => {
      path.extname = '.hbs'
    }))
    .pipe(gulp.dest('./dist/server/posts'));
});

gulp.task('webpack', () => {
  return gulp.src('./lib/client/js/pages')
    .pipe(cache('webpack'))
    .pipe(webpack(webpackConfig.dev))
    .pipe(gulp.dest('./dist/client/webpack'));
});

gulp.task('babel', () => {
  return gulp.src('./lib/server/**/*.js')
    .pipe(cache('babel'))
    .pipe(babel({
      presets: ['es2015', 'stage-2']
    }))
    .pipe(gulp.dest('./dist/server'));
});

gulp.task('jshint', () => {
  return gulp.src(['./lib/**/*.js', '!./lib/client/js/vendor/**/*.js'])
    .pipe(cache('jshint'))
    .pipe(jshint({ esversion: 6 }))
    .pipe(jshint.reporter(stylish));
});

gulp.task('bs-reload', () => {
  browserSync.reload();
});

gulp.task('nodemon', ['babel'], (cb) => {
  let started = false;
  return nodemon({
    script: './dist/server/index.js',
    watch: './lib/server',
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

gulp.task('browser-sync', ['nodemon', 'webpack', 'jshint'], () => {
  browserSync({
    proxy: 'localhost:3000',
    files: ['./dist/client/**/*.*'],
    port: 5000
  });
});

gulp.task('watch', ['browser-sync', 'blog'], () => {
  gulp.watch(['./lib/client/sass/**/*.scss', './lib/client/css/**/*.css', './lib/client/js/**/*.js'], ['webpack']);
  gulp.watch(['./lib/**/*.js', '!./lib/client/js/vendor/**/*.js'], ['jshint']);
  gulp.watch('./views/**/*.hbs', ['bs-reload']);
  gulp.watch('./lib/server/posts/**/*.md', ['blog', 'bs-reload']);
});

gulp.task('build', () => {
  gulp.src('./lib/server/**/*.js')
    .pipe(cache('babel'))
    .pipe(babel({
      presets: ['es2015', 'stage-2']
    }))
    .pipe(gulp.dest('./dist/server'));

  gulp.src('./lib/server/posts/**/*.md')
    .pipe(markdown())
    .pipe(rename((path) => {
      path.extname = '.hbs'
    }))
    .pipe(gulp.dest('./dist/server/posts'));

  return gulp.src('./lib/client/js/pages')
    .pipe(webpack(webpackConfig.prod))
    .pipe(gulp.dest('./dist/client/webpack'));
});