
'use strict';

var esprima = require('esprima-fb');
var escodegen = require('escodegen');
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
    let generated = escodegen.generate(
      ast,
      { sourceMap: "answer", sourceMapWithCode: true }
    );
    printTree(generated);
  }
}

test();
