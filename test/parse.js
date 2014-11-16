/*global require describe it before*/

var wtn = require('../lib/wtn.js');
var fs = require("fs");
var assert = require('power-assert');

describe('parse', function () {
  var jsSource;
  before(function() {
    jsSource = fs.readFileSync('test/data/closure.js');
  });

  it('empty string', function () {
    assert.deepEqual(wtn.parse(''), []);
  });

  it('standard', function () {
    assert.deepEqual(wtn.parse([
      '/**',
      ' * @constructor',
      ' */',
      'abc.efg.Class = function() {};'
    ].join('\n')), ['abc.efg.Class']);
  });

  it('jsdoc without difinition', function () {
    assert.deepEqual(wtn.parse([
      '/**',
      ' * @constructor',
      ' */'
    ].join('\n')), []);
  });

  it('closure style', function () {
    assert.deepEqual(wtn.parse(jsSource), [
      'aqua.widget.WidgetBase',
      'aqua.widget.TextBase',
      'aqua.widget.Text',
      'aqua.widget.URL',
      'aqua.widget.ComboBox'
    ]);
  });

});
