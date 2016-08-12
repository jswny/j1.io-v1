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
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
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

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('nodemon', ['babel', 'sass'], (cb) => {
  let started = false;
  let stream = nodemon({
    script: './dist/index.js',
    watch: './lib',
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

  return stream;
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
})

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