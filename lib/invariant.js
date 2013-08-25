
'use strict';

var util = require('util');

function ViolationError(message) {
  this.name = 'ViolationError';
  this.message = 'ViolationError: ' + message;
}
ViolationError.prototype = new Error();
ViolationError.prototype.constructor = ViolationError;

module.exports = function(condition/*, ...args*/) {
  if (!condition) {
    let fmt_msg_args = Array.prototype.slice.call(arguments, 1);
    throw new ViolationError(util.format.apply(util, fmt_msg_args));
  }
}
