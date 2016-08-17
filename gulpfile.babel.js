import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';
import gulpCache from 'gulp-file-cache';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import jshint from 'gulp-jshint';
import stylish from 'jshint-stylish';
import webpack from 'gulp-webpack';
import commons from 'webpack/lib/optimize/CommonsChunkPlugin';

let webpackConfig = {
  entry: {
    home: './lib/js/home.js',
    projects: './lib/js/projects.js'
  },
  output: {
    filename: '[name].js',
    publicPath: 'js/bundles/'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.scss$/, loaders: ['style', 'css?sourceMap', 'sass'] },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  },
  sassLoader: {
    sourceMap: true,
    outputStyle: 'compressed'
  },
  plugins: [
    new commons('commons.js', ['home', 'projects'])
  ]
}

let cache = new gulpCache();

gulp.task('webpack', () => {
  return gulp.src(['lib/js/home.js', 'lib/js/projects.js'])
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./public/js/bundles'));
});

// gulp.task('sass', () => {
//   return gulp.src('./lib/sass/**/*.scss')
//     .pipe(cache.filter())
//     .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
//     .pipe(cache.cache())
//     .pipe(gulp.dest('./public/css/'));
// });

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
  return gulp.src('./lib/**/*.js')
    .pipe(jshint({ esversion: 6 }))
    .pipe(jshint.reporter(stylish));
});

gulp.task('bs-reload', () => {
  browserSync.reload();
});

gulp.task('nodemon', ['jshint', 'babel', 'webpack'], (cb) => {
  let started = false;
  return nodemon({
    script: './dist/index.js',
    watch: './lib/*.js',
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
  gulp.watch(['./lib/sass/**/*.scss', './lib/js/**/*.js'], ['webpack']);
  gulp.watch('./lib/**/*.js', ['jshint']);
  gulp.watch('./views/**/*.hbs', ['bs-reload']);
});

gulp.task('build', ['webpack'], () => {
  gulp.src('./lib/index.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist'));
});