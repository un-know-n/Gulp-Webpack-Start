// Plugins
const { src, dest } = require('gulp');
const gulpPlumber = require('gulp-plumber');
const gulpNewer = require('gulp-newer');
const gulpFonter = require('gulp-fonter');
const gulpTtf2Woff2 = require('gulp-ttf2woff2');

// Configuration file
const config = require('../config/path');

//App file
const app = require('../config/app');

const fonts = () => {
  return src(config.fonts.src)
    .pipe(gulpPlumber())
    .pipe(gulpNewer(config.fonts.dest))
    .pipe(gulpFonter(app.fonter))
    .pipe(dest(config.fonts.dest))
    .pipe(gulpTtf2Woff2())
    .pipe(dest(config.fonts.dest));
};

module.exports = fonts;
