// Plugins
const { src, dest } = require('gulp');
const gulpPlumber = require('gulp-plumber');
const gulpSize = require('gulp-size');
const gulpAutoprefixer = require('gulp-autoprefixer');
const gulpCssO = require('gulp-csso');
const gulpRename = require('gulp-rename');
const gulpShorthand = require('gulp-shorthand');
const gulpGroupMedia = require('gulp-group-css-media-queries');
const gulpSass = require('gulp-sass')(require('sass'));
const gulpSassGlob = require('gulp-sass-glob');
const gulpWebpCss = require('gulp-webp-css');

// Configuration file
const config = require('../config/path');

//App file
const app = require('../config/app');

const scss = () => {
  return src(config.scss.src, { sourcemaps: app.isDev })
    .pipe(gulpPlumber())
    .pipe(gulpSassGlob())
    .pipe(gulpSass())
    .pipe(gulpWebpCss())
    .pipe(gulpAutoprefixer({ cascade: false }))
    .pipe(gulpShorthand())
    .pipe(gulpGroupMedia())
    .pipe(gulpSize())
    .pipe(dest(config.scss.dest, { sourcemaps: app.isDev }))
    .pipe(gulpCssO())
    .pipe(gulpRename({ suffix: '.min' }))
    .pipe(gulpSize())
    .pipe(dest(config.scss.dest, { sourcemaps: app.isDev }));
};

module.exports = scss;
