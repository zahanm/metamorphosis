
'use strict';

var util = require('util');

function InvariantViolation(message) {
  this.name = 'InvariantViolation';
  this.message = message;
}
util.inherits(InvariantViolation, Error);

function invariant(condition/*, ...args*/) {
  if (!condition) {
    let fmt_msg_args = Array.prototype.slice.call(arguments, 1);
    throw new InvariantViolation(util.format.apply(util, fmt_msg_args));
  }
}

module.exports = invariant;
