// Plugins
const { src, dest } = require('gulp');
const gulpPlumber = require('gulp-plumber');
const gulpImageMin = require('gulp-imagemin');
const gulpNewer = require('gulp-newer');
const gulpWebp = require('gulp-webp');
const gulpIf = require('gulp-if');

// Configuration file
const config = require('../config/path');

//App file
const app = require('../config/app');

const images = () => {
  return src(config.images.src)
    .pipe(gulpPlumber())
    .pipe(gulpNewer(config.images.dest))
    .pipe(gulpWebp())
    .pipe(gulpIf(app.isProd, gulpImageMin(app.imagemin)))
    .pipe(dest(config.images.dest));
};

module.exports = images;
