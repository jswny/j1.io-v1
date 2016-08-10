import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';
import Cache from 'gulp-file-cache';
import browserSync from 'browser-sync';

let cache = new Cache();

gulp.task('sass', () => {
  let stream = gulp.src('./lib/sass/**/*.scss')
    .pipe(cache.filter())
    .pipe(sass().on('error', sass.logError))
    .pipe(cache.cache())
    .pipe(gulp.dest('./public/css/'));

  return stream;
});

gulp.task('babel', () => {
  let stream = gulp.src('./lib/index.js')
    .pipe(cache.filter())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(cache.cache())
    .pipe(gulp.dest('./dist'));

  return stream;
});

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync(null, {
    proxy: 'localhost:3000',
    files: ['./public/**/*.*'],
    port: 5000
  });
});

gulp.task('nodemon', ['babel', 'sass'], (cb) => {
  let started = false;
  let stream = nodemon({
    script: './dist/index.js',
    watch: './lib',
    ext: 'js hbs',
    tasks: ['babel']
    })
  .on('start', () => {
    if (!started) {
      started = true;
      cb();
    }
  });

  gulp.watch('./lib/sass/**/*.scss', ['sass']);

  return stream;
});

gulp.task('build', () => {
  gulp.src('./lib/index.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist'));

  gulp.src('./lib/sass/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./public/css/'));
});