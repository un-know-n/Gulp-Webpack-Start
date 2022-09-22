/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
//---------------Gulp build from Vadim Prokopchuk

// Only gulpfile.js, without other folders, starter build

// "devDependencies": {
//   "browser-sync": "^2.27.10",
//   "del": "^6.1.1",
//   "gulp": "^4.0.2",
//   "gulp-autoprefixer": "^8.0.0",
//   "gulp-concat": "^2.6.1",
//   "gulp-imagemin": "^7.1.0",
//   "gulp-sass": "^5.1.0",
//   "gulp-uglify-es": "^3.0.0",
//   "jquery": "^3.6.1",
//   "sass": "^1.54.9"
// }

// const { src, dest, watch, parallel, series } = require('gulp');
// const scss = require('gulp-sass')(require('sass'));
// const autoPrefixer = require('gulp-autoprefixer');
// const concat = require('gulp-concat');
// const browserSync = require('browser-sync').create();
// const uglify = require('gulp-uglify-es').default;
// const imageMin = require('gulp-imagemin');
// const del = require('del');

// function styles() {
//   return src('src/scss/style.scss')
//     .pipe(scss({ outputStyle: 'compressed' }))
//     .pipe(
//       autoPrefixer({ overrideBrowserslist: ['last 10 version'], grid: true })
//     )
//     .pipe(concat('style.min.css'))
//     .pipe(dest('src/css'))
//     .pipe(browserSync.stream());
// }

// function scripts() {
//   return src(['node_modules/jquery/dist/jquery.js', 'src/js/scripts.js'])
//     .pipe(concat('scripts.min.js'))
//     .pipe(uglify())
//     .pipe(dest('src/js'))
//     .pipe(browserSync.stream());
// }

// function watching() {
//   watch(['src/scss/**/*.scss'], styles);
//   watch(['src/js/**/*.js', '!src/js/scripts.min.js'], scripts);
//   watch(['src/**/*.html']).on('change', browserSync.reload);
// }

// function build() {
//   return src(
//     [
//       'src/css/style.min.css',
//       'src/fonts/**/*',
//       'src/js/scripts.min.js',
//       'src/**/*.html',
//     ],
//     { base: 'src' }
//   ).pipe(dest('dist'));
// }

// function images() {
//   return src(['src/images/**/*'])
//     .pipe(
//       imageMin([
//         imageMin.gifsicle({ interlaced: true }),
//         imageMin.mozjpeg({ quality: 99, progressive: true }),
//         imageMin.optipng({ optimizationLevel: 5 }),
//         imageMin.svgo({
//           plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
//         }),
//       ])
//     )
//     .pipe(dest('dist/images'));
// }

// function cleanDist() {
//   return del('dist');
// }

// function sync() {
//   browserSync.init({
//     server: {
//       baseDir: './src',
//     },
//   });
// }

// Task without 'exports.' is private, gulp won't make it

// exports.styles = styles;
// exports.watching = watching;
// exports.sync = sync;
// exports.scripts = scripts;
// exports.build = build;
// exports.images = images;
// exports.cleanDist = cleanDist;

// exports.default = parallel(sync, watching);
// exports.production = series(cleanDist, styles, scripts, images, build);

//---------------Gulp build from Code Quest

//TODO:  Gulpfile.js with folders (config, data, task)

//!.reload() - full page reload, .stream() - without reloading
// For Babel: npm i -D gulp-babel @babel/core @babel/preset-env
// For Webpack: npm i -D webpack webpack-stream

//Default methods
const { src, dest, watch, series, parallel } = require('gulp');

//See file sizes(useful, when minimization)
//const gulpSize = require('gulp-size');

//Helps to use components in HTML(@@include...)
//const htmlFileInclude = require('gulp-file-include');

//Minimize the html
//const htmlMin = require('gulp-htmlmin');

//Sync the browser
//const browserSync = require('browser-sync').create();

//To handle errors
//const gulpPlumber = require('gulp-plumber');

//To create custom messages
//const gulpNotify = require('gulp-notify');

//To delete the unnecessary files
//const del = require('del');

//To edit PUG files
//const gulpPug = require('gulp-pug');

//To concat and rename files
//const gulpConcat = require('gulp-concat');

//To automatically import css files when build
//const gulpCssImport = require('gulp-cssimport');

//To add prefixes for older browsers
//const gulpAutoprefixer = require('gulp-autoprefixer');

//To minimize the css
//const gulpCssO = require('gulp-csso');

//To rename the files
//const gulpRename = require('gulp-rename');

//To make some styles shorter
//const gulpShorthand = require('gulp-shorthand');

//To group the media queries
//const gulpGroupMedia = require('gulp-group-css-media-queries');

//To use SASS
// const gulpSass = require('gulp-sass')(require('sass'));

//To use masks when importing files into scss
// const gulpSassGlob = require('gulp-sass-glob');

//To work with babel
// const gulpBabel = require('gulp-babel');

//To minimize js
// const gulpUglify = require('gulp-uglify');

//To minimize the images
//const gulpImageMin = require('gulp-imagemin');

// Configuration file
const config = require('./gulp/config/path');

//App file
const app = require('./gulp/config/app');

//Tasks to include
const clear = require('./gulp/task/clear');
const css = require('./gulp/task/css');
const pug = require('./gulp/task/pug');
const html = require('./gulp/task/html');
const browserSync = require('browser-sync');
const scss = require('./gulp/task/scss');
const js = require('./gulp/task/js');
const images = require('./gulp/task/images');
const fonts = require('./gulp/task/fonts');

//To start the server
const sync = () => {
  browserSync.init({
    server: {
      baseDir: config.root,
    },
  });
};

//To start-up the watchers
const watcher = () => {
  watch([config.pug.watch], pug).on('all', browserSync.reload);
  watch([config.scss.watch]).on('all', browserSync.reload);
  watch([config.js.watch]).on('all', browserSync.reload);
  watch([config.images.watch]).on('all', browserSync.reload);
};

//Builds
const build = series(clear, parallel(pug, scss, js, images, fonts));

const dev = series(build, parallel(watcher, sync));

//Tasks
exports.html = html;
exports.clear = clear;
exports.pug = pug;
exports.css = css;
exports.scss = scss;
exports.js = js;
exports.images = images;
exports.fonts = fonts;

// exports.build = build;
// exports.dev = dev;

exports.default = app.isProd ? build : dev;

//gulp --production - to build on prod
//gulp - to use for development
