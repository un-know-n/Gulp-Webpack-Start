const pathSrc = './src';
const pathDest = './dist';

module.exports = {
  root: pathDest,
  html: {
    src: pathSrc + '/*.html',
    watch: pathSrc + '/**/*.html',
    dest: pathDest,
  },
  pug: {
    src: pathSrc + '/pug/*.pug',
    watch: pathSrc + '/pug/**/*.pug',
    dest: pathDest,
  },
  css: {
    src: pathSrc + '/css/*.css',
    watch: pathSrc + '/css/**/*.css',
    dest: pathDest + '/css',
  },
  scss: {
    src: pathSrc + '/scss/*.{sass,scss}',
    watch: pathSrc + '/scss/**/*.{sass,scss}',
    dest: pathDest + '/css',
  },
  js: {
    src: pathSrc + '/js/*.js',
    watch: pathSrc + '/js/**/*.js',
    dest: pathDest + '/js',
  },
  images: {
    src: pathSrc + '/images/*.{png,jpg,jpeg,gif,svg}',
    watch: pathSrc + '/images/**/*.{png,jpg,jpeg,gif,svg}',
    dest: pathDest + '/images',
  },
  fonts: {
    src: pathSrc + '/fonts/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}',
    watch: pathSrc + '/fonts/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}',
    dest: pathDest + '/fonts',
  },
};
