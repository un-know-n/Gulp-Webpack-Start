// Plugins
const { src, dest } = require('gulp');
const gulpSize = require('gulp-size');
const htmlFileInclude = require('gulp-file-include');
const htmlMin = require('gulp-htmlmin');
const gulpPlumber = require('gulp-plumber');
const gulpNotify = require('gulp-notify');
const gulpWebpHTML = require('gulp-webp-html');

// Configuration file
const config = require('../config/path');

//App file
const app = require('../config/app');

//To handle the html files
const html = () => {
  return src([config.html.src, '!./src/components/*.html'])
    .pipe(
      gulpPlumber({
        errorHandler: gulpNotify.onError((error) => ({
          title: 'HTML',
          message: error.message,
        })),
      }),
    )
    .pipe(htmlFileInclude())
    .pipe(gulpWebpHTML())
    .pipe(htmlMin(app.htmlmin))
    .pipe(gulpSize())
    .pipe(dest(config.html.dest));
};

module.exports = html;
