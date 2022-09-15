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

const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const autoPrefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const imageMin = require('gulp-imagemin');
const del = require('del');

function styles() {
  return src('src/scss/style.scss')
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(
      autoPrefixer({ overrideBrowserslist: ['last 10 version'], grid: true })
    )
    .pipe(concat('style.min.css'))
    .pipe(dest('src/css'))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(['node_modules/jquery/dist/jquery.js', 'src/js/scripts.js'])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(dest('src/js'))
    .pipe(browserSync.stream());
}

function watching() {
  watch(['src/scss/**/*.scss'], styles);
  watch(['src/js/**/*.js', '!src/js/scripts.min.js'], scripts);
  watch(['src/**/*.html']).on('change', browserSync.reload);
}

function build() {
  return src(
    [
      'src/css/style.min.css',
      'src/fonts/**/*',
      'src/js/scripts.min.js',
      'src/**/*.html',
    ],
    { base: 'src' }
  ).pipe(dest('dist'));
}

function images() {
  return src(['src/images/**/*'])
    .pipe(
      imageMin([
        imageMin.gifsicle({ interlaced: true }),
        imageMin.mozjpeg({ quality: 99, progressive: true }),
        imageMin.optipng({ optimizationLevel: 5 }),
        imageMin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest('dist/images'));
}

function cleanDist() {
  return del('dist');
}

function sync() {
  browserSync.init({
    server: {
      baseDir: './src',
    },
  });
}

exports.styles = styles;
exports.watching = watching;
exports.sync = sync;
exports.scripts = scripts;
exports.build = build;
exports.images = images;
exports.cleanDist = cleanDist;

exports.default = parallel(sync, watching);
exports.production = series(cleanDist, styles, scripts, images, build);
