// copy - переносит файлы разного назначения в папку dist
// copyTopLevel - из папки dist на верхний уровень

module.exports = function () {

  $.gulp.task('copy', () => {

    return $.gulp.src([
      $.config.paths.other + '*.ico',
      $.config.paths.other + '*.webmanifest'
    ], {
      base: 'src/assets/other'
    })
      .pipe($.gulp.dest($.config.output.path))

  });

  $.gulp.task('copyTopLevel', () => {

    return $.gulp.src([
      $.config.output.path + '/**',
      '!' + $.config.output.path + '/*.{html,ico,webmanifest}',
    ])
      .pipe($.gulp.dest($.config.output.templates))

  });
}
