(function(g) {
"use strict";

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var mo = w * 4;
var y = d * 365.25;

function round(num, dec) {
  return dec ? Math.round(num*Math.pow(10,dec))/Math.pow(10,dec) : Math.round(num);
}

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @return {String|Number}
 * @api public
 */

var ms = function(val, options) {
  options = options || {};
  if(options['long']) { return longval(val); }
  if(options['short']) { return shortval(val); }
  return parse(val);
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  var match = /^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|weeks?|w|months?|mos?|years?|y)?$/i.exec(str);
  if (!match) { return; }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'y':
      return n * y;
    case 'months':
    case 'month':
    case 'mos':
    case 'mo':
      return n * mo;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 's':
      return n * s;
    case 'ms':
      return n;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function shortval(ms) {
  if (ms >= y) { return round(ms / y, 4) + 'y'; }
  if (ms >= mo) { return round(ms / mo, 4) + 'm'; }
  if (ms >= w) { return round(ms / w, 4) + 'w'; }
  if (ms >= d) { return round(ms / d, 4) + 'd'; }
  if (ms >= h) { return round(ms / h, 4) + 'h'; }
  if (ms >= m) { return round(ms / m, 4) + 'm'; }
  if (ms >= s) { return round(ms / s, 4) + 's'; }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function longval(ms) {
  return pluralval(ms, y, 'year') || pluralval(ms, mo, 'month') || pluralval(ms, w, 'week') || pluralval(ms, d, 'day') || pluralval(ms, h, 'hour') || pluralval(ms, m, 'minute') || pluralval(ms, s, 'second') || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function pluralval(ms, n, name) {
  if (ms < n) { return; }
  if (ms < n * 1.01) { return round(ms / n, 4) + ' ' + name; }
  return round(ms / n, 4) + ' ' + name + 's';
}

if (g.top) {
   g.ms = ms;
} else {
  module.exports = ms;
}
})(this);