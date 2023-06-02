// Компелирует scss с css и переносит файл в папку dist/assets/css/

module.exports = function () {

  $.gulp.task('styles', () => {

    return $.gulp.src($.config.paths.css)

      .pipe($.sass({
        includePaths: ['node_modules']
      }).on('error', $.sass.logError))
      .pipe($.gp.postcss([$.autoprefixer()]))
      .pipe($.gp.groupCssMediaQueries())
      .pipe($.gp.cssbeautify())
      .pipe($.gp.if($.config.toggle.fullCss, $.gulp.dest($.config.output.pathCss)))

      .pipe($.gp.cleanCss())
      .pipe($.gp.rename({
        suffix: ".min",
        extname: ".css"
      }))
      .pipe($.gulp.dest($.config.output.pathCss))
      .pipe($.browserSync.stream());
  });
}
