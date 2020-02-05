const fs = require('fs');
const { src, task, series, dest, watch } = require('gulp');
const clean = require('gulp-clean');

task('clear', function () {
  return src([
    './src/**/*.js',
    './src/**/*.d.ts'
  ], {read: false})
    .pipe(clean());
});

task('clear:dist', function () {
  return src('./dist', {read: false})
    .pipe(clean());
});

task('move', () => {
  return fs.createReadStream('./src/index.d.ts')
  .pipe(fs.createWriteStream('./index.d.ts'))
});

task('dist', () => {
  return src(['./src/**/*.js', './src/**/*.d.ts'])
    .pipe(dest('dist'));
});

exports.build = series('dist', 'clear');
exports.clearDist = series('clear:dist');
