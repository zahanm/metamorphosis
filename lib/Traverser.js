
'use strict';

var invariant = require('invariant');

var VisitorKeys = require('estraverse').VisitorKeys;

/**
 * Traverses a tree in-order
 * --
 *
 * Constructor
 */
function Traverser(root, operator, context) {
  this.root = root;
  this.operator = operator;
  this.opContext = context || null;
  this.loc = root;
}

Traverser.prototype.start = function start() {
  invariant(this.loc.type, '%j does not have a type');
  for (let prop in this.loc) {
    if (VisitorKeys[this.loc.type].indexOf(prop) >= 0) {
    }
  }
}
