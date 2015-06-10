
'use strict';

var escodegen = require('escodegen');
var esprima = require('esprima-fb');
var estraverse = require('estraverse');
var invariant = require('./invariant.js');
var util = require('util');

function printTree(t) {
  console.log(util.inspect(t, { depth: null, colors: true }));
}

function test() {
  var code = 'var answer = 6 * 7;'
  {
    let ast = esprima.parse(code, { loc: true });
    printTree(ast);
    console.log();
    estraverse.replace(ast, {
      enter: function(node, parent) {
        invariant(node.type, '%s does not have a type', node.name);
        if (node.type === 'VariableDeclaration') {
          parent.body.push({ type: 'EmptyStatement' });
        }
      },
      leave: function(node, parent) {
        if (node.type === 'Literal' && node.value === 7) {
          return {
            type: 'BinaryExpression',
            operator: '/',
            left: { type: 'Literal',
              value: 14,
              raw: '14',
            },
            right: { type: 'Literal',
              value: 2,
              raw: '2',
            },
            loc: node.loc
          };
        }
      }
    });
    let generated = escodegen.generate(
      ast,
      { sourceMap: "answer", sourceMapWithCode: true }
    );
    printTree(generated);
  }
}

test();
