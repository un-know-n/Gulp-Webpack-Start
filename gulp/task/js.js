// Plugins
const { src, dest } = require('gulp');
const gulpPlumber = require('gulp-plumber');
const gulpSize = require('gulp-size');
const gulpBabel = require('gulp-babel');
//const gulpUglify = require('gulp-uglify');
const webpackStream = require('webpack-stream');

// Configuration file
const config = require('../config/path');

//App file
const app = require('../config/app');

const js = () => {
  return src(config.js.src, { sourcemaps: app.isDev })
    .pipe(gulpPlumber())
    .pipe(gulpBabel())
    .pipe(webpackStream(app.webpack))
    .pipe(gulpSize())
    .pipe(dest(config.js.dest, { sourcemaps: app.isDev }));
};

module.exports = js;
