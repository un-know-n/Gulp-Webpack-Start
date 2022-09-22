// Plugins
const { src, dest } = require('gulp');
const gulpPlumber = require('gulp-plumber');
const gulpSize = require('gulp-size');
const gulpConcat = require('gulp-concat');
const gulpCssImport = require('gulp-cssimport');
const gulpAutoprefixer = require('gulp-autoprefixer');
const gulpCssO = require('gulp-csso');
const gulpRename = require('gulp-rename');
const gulpShorthand = require('gulp-shorthand');
const gulpGroupMedia = require('gulp-group-css-media-queries');

// Configuration file
const config = require('../config/path');

//App file
const app = require('../config/app');

const css = () => {
  return src(config.css.src, { sourcemaps: app.isDev })
    .pipe(gulpPlumber())
    .pipe(gulpCssImport())
    .pipe(gulpAutoprefixer({ cascade: false }))
    .pipe(gulpShorthand())
    .pipe(gulpGroupMedia())
    .pipe(gulpSize())
    .pipe(dest(config.css.dest, { sourcemaps: app.isDev }))
    .pipe(gulpCssO())
    .pipe(gulpRename({ suffix: '.min' }))
    .pipe(gulpSize())
    .pipe(dest(config.css.dest, { sourcemaps: app.isDev }));
};

module.exports = css;
