import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';

gulp.task('sass', () => {
  gulp.src('./lib/sass/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('babel', () => {
  gulp.src('./lib/index.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', () => {
  gulp.watch('./lib/sass/**/*.scss', ['sass']);
  gulp.watch('./lib/**/*.js', ['babel']);
});