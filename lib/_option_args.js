/**
 * @function _optionArgs
 * @private
 */

"use strict";

var stringcase = require('stringcase'),
    arrayreduce = require('arrayreduce');

/** @lends _optionArgs */
function _optionArgs(options) {
    return Object.keys(options)
        .filter(function (key) {
            return options[key] !== false;
        })
        .map(function (key) {
            var prefix = key.length === 1 ? '-' : '--';
            var prefixedKey = prefix + stringcase.spinalcase(key).replace(/^\-+/, '');
            if (options[key] === true) {
                return [prefixedKey];
            } else {
                return [prefixedKey, options[key]];

            }
        }).reduce(arrayreduce.arrayConcat(), []);
}

module.exports = _optionArgs;