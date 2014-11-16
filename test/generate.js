/*global require describe it before*/

var fs = require('fs');
var assert = require('power-assert');

describe('generate', function () {

  eval(fs.readFileSync('test/data/closure.js').toString());
  eval(fs.readFileSync('dist/wtnb.js').toString());

  it('getClassName', function () {
    assert.equal(wtnb.getClassName(new aqua.widget.TextBase()), 'aqua.widget.TextBase');
    assert.equal(wtnb.getClassName(new aqua.widget.Text()), 'aqua.widget.Text');
    assert.equal(wtnb.getClassName(new aqua.widget.URL()), 'aqua.widget.URL');
    assert.equal(wtnb.getClassName(new aqua.widget.ComboBox()), 'aqua.widget.ComboBox');
    assert.equal(wtnb.getClassName([]), '');
  });

  it('getAncestorNames', function() {
    assert.deepEqual(wtnb.getAncestorNames(new aqua.widget.TextBase()), ['aqua.widget.TextBase', 'aqua.widget.WidgetBase']);
    assert.deepEqual(wtnb.getAncestorNames(new aqua.widget.Text()), ['aqua.widget.Text', 'aqua.widget.TextBase', 'aqua.widget.WidgetBase']);
    assert.deepEqual(wtnb.getAncestorNames(new aqua.widget.URL()), ['aqua.widget.URL', 'aqua.widget.TextBase', 'aqua.widget.WidgetBase']);
    assert.deepEqual(wtnb.getAncestorNames(new aqua.widget.ComboBox()), ['aqua.widget.ComboBox', 'aqua.widget.WidgetBase']);
    assert.deepEqual(wtnb.getAncestorNames([]), []);
  });
});
