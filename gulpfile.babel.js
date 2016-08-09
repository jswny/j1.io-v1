import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';
import Cache from 'gulp-file-cache';

let cache = new Cache();

gulp.task('sass', () => {
  let stream = gulp.src('./lib/sass/**/*.scss')
    .pipe(cache.filter())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
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

gulp.task('watch', ['babel', 'sass'], function () {
  let stream = nodemon({
    script: './dist/index.js',
    watch: './lib',
    ext: 'js hbs',
    tasks: ['babel']
    });

  gulp.watch('./lib/sass/**/*.scss', ['sass']);

  return stream;
});
