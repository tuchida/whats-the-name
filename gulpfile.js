'use strict';

var addsrc = require('gulp-add-src');
var gulp = require('gulp');
var concat = require('gulp-concat');
var mocha = require('gulp-mocha');


gulp.task('test', [ 'gen' ], function (cb) {
  gulp.src('test/*.js')
      .pipe(mocha({
        reporter: 'spec',
        timeout: 100000 // 100s
      }))
      .on('end', cb);
});

gulp.task('gen', function (cb) {

  gulp.src(['./test/data/closure.js'])
      .pipe(require('./lib/gulp-wtn')('wtnb-classes.js'))
      .pipe(addsrc('./lib/browser/wtnb.js'))
      .pipe(concat('wtnb.js'))
      .pipe(gulp.dest('dist/'))
      .on('end', cb);
});

gulp.task('default', [ 'test' ]);
