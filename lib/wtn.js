'use strict';

var doctrine = require('doctrine');
var escodegen = require('escodegen');
var esprima = require('esprima');
var estraverse = require('estraverse');

var parse = function(source) {
  var ast = esprima.parse(source, {
    attachComment: true
  });

  var constructors = [];
  estraverse.traverse(ast, {
    enter: function (node) {
      if (isConstructorNode(node)) {
        constructors.push(escodegen.generate(node.expression.left));
      }
    }
  });
  return constructors;
};

var isConstructorNode = function(node) {
  if (node.expression && node.leadingComments &&
      node.expression.type === 'AssignmentExpression' &&
      node.expression.right.type === 'FunctionExpression') {
    if (hasConstructorComment(node.leadingComments)) {
      return true;
    }
  }
  return false;
};

var hasConstructorComment = function(comments) {
  return comments.some(function(comment) {
    var jsdoc = doctrine.parse(comment.value, {
      unwrap: true
    });
    return jsdoc.tags.some(function(tag) {
      return tag.title === 'constructor';
    });
  });
};

var generate = function(constructors) {
  return [
    'var wtnb = {};',
    'wtnb.classes_ = ' + escodegen.generate({
      type: 'ArrayExpression',
      elements: constructors.map(function(ctor) {
        return {
          type: 'Identifier',
          name: ctor
        };
      })
    }) + ';',
    '',
    'wtnb.classNames_ = ' + escodegen.generate({
      type: 'ArrayExpression',
      elements: constructors.map(function(ctor) {
        return {
          type: 'Literal',
          value: ctor
        };
      })
    }) + ';',
    ''
  ].join('\n');
};

exports.parse = parse;
exports.generate = generate;
