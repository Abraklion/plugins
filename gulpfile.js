"use strict";

global.$ = {
  gulp: require('gulp'),
  gp: require('gulp-load-plugins')(),
  webpack: require("webpack-stream"),
  named: require("vinyl-named"),
  browserSync: require('browser-sync'),
  autoprefixer: require('autoprefixer'),
  panini: require('panini'),
  sass: require("gulp-sass")(require('sass')),
  del: require('del'),

  config: {
    src: require('./gulp/config'),

    toggle: {
      mode: 'development', // development / production
      minHtml: false,      // true / false
      fullCss: false,      // true / false
      resizeImg: false,    // true / false
    },

    paths: {
      html: 'src/*.html',
      css: 'src/sass/*.scss',
      js: './src/js/',
      images: {
        img: 'src/assets/img/',
        webp: 'src/assets/img/webp/',
        svg: 'src/assets/img/sprite/**/*.svg',
        lottie: 'src/assets/img/lottie/**/*.json'
      },
      fonts: 'src/assets/fonts/',
      other: 'src/assets/other/'
    },
    output: {
      path: 'docs',
      pathCss: 'docs/assets/css/',
      pathJs: 'docs/js/',
      pathImg: {
        img: 'docs/assets/img/',
        svg: 'docs/assets/img/sprite/',
        lottie: 'docs/assets/img/lottie/'
      },
      pathFonts: 'docs/assets/fonts/',
      templates: '../templates/.default/',
    },
    watch: {
      html: 'src/**/*.html',
      css: 'src/sass/**/*.scss',
      js: 'src/js/**/*.js',
      images: {
        img: 'src/assets/img/*.{jpg,png,gif,svg,ico,webp}',
        webp: 'src/assets/img/webp/*.{jpg,png,gif}',
        svg: 'src/assets/img/sprite/**/*.svg',
        lottie: 'src/assets/img/lottie/**/*.json'
      },
      fonts: 'src/assets/fonts/',
      other: 'src/assets/other/'
    }
  }
}

$.config.src.forEach(function (path) {
  require(path)();
});

const build = $.gulp.series('clean', $.gulp.parallel('html','styles','scripts','fonts','images','sprite','copy'));
const watch = $.gulp.series(build, $.gulp.parallel('serve', 'watcher'));

const bx_watch = $.gulp.series(build, 'copyTopLevel', $.gulp.parallel('watcher','watcher_dist'));

exports.build = build;
exports.watch = watch;
exports.bx_watch = bx_watch;

exports.default = watch;
