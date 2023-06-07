// Обьединяет js файлы в один и переносит файл в папку dist/js

module.exports = function () {

  $.gulp.task("scripts", () => {

    return $.gulp.src($.config.paths.js + '*.js')
      .pipe($.webpack({
        mode: $.config.toggle.mode,
        entry : {

          // валидатор форм
          validation: {
            import: './src/js/jqueryvalidation.js',
            dependOn: ['jquery-validation']
          },
          'jquery-validation' : {
            import : ['jquery-validation', 'jquery-validation/dist/additional-methods'],
            dependOn: ['jquery'],
          },

          // кастомный селект
          select: {
            import: './src/js/select2.js',
            dependOn: ['select2','jquery-validation']
          },
          'select2' : {
            import : 'select2',
            dependOn: ['jquery'],
          },

          // прогресс выполнения
          progress: {
            import: './src/js/progressJs.js'
          },

          'jquery': 'jquery',
        },
        output: {
          filename: '[name].js'
        },
        watch: false,
        optimization: {
          runtimeChunk: 'single',
          // splitChunks: {
          //   chunks: 'all',
          // },
        },
        devtool: 'source-map',
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [['@babel/preset-env', {
                    debug: true,
                    corejs: 3,
                    useBuiltIns: "usage"
                  }]]
                }
              }
            }
          ]
        }
      }))
      .pipe($.gulp.dest($.config.output.pathJs))
      .on("end", $.browserSync.reload);

  });
}
