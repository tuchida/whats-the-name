'use strict';

var Buffer = require('buffer').Buffer;
var gutil = require('gulp-util');
var path = require('path');
var through = require('through');
var wtn = require('./wtn');

var PLUGIN_NAME = 'gulp-wtn';

module.exports = function(fileName) {
  var files = [];

  function bufferContents(file) {
    if (file.isNull()) return;
    if (file.isStream()) {
      throw new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported');
    }
    files.push(file);
  }

  function endStream() {
    if (files.length > 0) {

      var constructors = files.map(function(file) {
        return wtn.parse(file.contents.toString());
      }).reduce(function(res, arr) {
        res.push.apply(res, arr);
        return res;
      }, []);
      var data = wtn.generate(constructors);

      var outputFile = new gutil.File({
        base: files[0].base,
        contents: new Buffer(data),
        cwd: files[0].cwd,
        path: path.join(files[0].base, fileName)
      });
      this.emit('data', outputFile);
    }
    this.emit('end');
  }

  return through(bufferContents, endStream);
};
