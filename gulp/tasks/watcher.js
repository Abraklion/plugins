// Открывает слежку за файлами

module.exports = function () {

  $.gulp.task('watcher', (done) => {

    $.gulp.watch($.config.watch.html, $.gulp.series("html"));
    $.gulp.watch($.config.watch.css, $.gulp.series("styles"));
    $.gulp.watch($.config.watch.js, $.gulp.series("scripts"));
    $.gulp.watch($.config.watch.fonts, $.gulp.series("fonts"));
    $.gulp.watch([$.config.watch.images.img, $.config.watch.images.webp, $.config.watch.images.lottie], $.gulp.series("images"));
    $.gulp.watch($.config.watch.images.svg, $.gulp.series("sprite"));
    $.gulp.watch($.config.watch.other, $.gulp.series("copy"));

    done();
  });

  $.gulp.task('watcher_dist', (done) => {

    $.gulp.watch($.config.output.path, $.gulp.series("copyTopLevel"))

    done();
  });
}
