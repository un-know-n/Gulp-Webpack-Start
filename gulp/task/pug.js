// PLugins
const { src, dest } = require('gulp');
const gulpSize = require('gulp-size');
const gulpPlumber = require('gulp-plumber');
const gulpPug = require('gulp-pug');

// Configuration file
const config = require('../config/path');

//App file
const app = require('../config/app');

//To handle the PUG files
const pug = () => {
  return src([
    config.pug.src,
    '!./src/pug/components/*.pug',
    '!./src/pug/layout/*.pug',
  ])
    .pipe(gulpPlumber())
    .pipe(gulpPug(app.pug))
    .pipe(gulpSize())
    .pipe(dest(config.pug.dest));
};

module.exports = pug;
