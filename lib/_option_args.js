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
            var value = options[key];
            var empty = (value === undefined) || (value === null) || (value === '') || (value === false);
            return !empty;
        })
        .map(function (key) {
            var prefix = key.length === 1 ? '-' : '--';
            var prefixedKey = prefix + stringcase.spinalcase(key).replace(/^\-+/, '');
            var value = options[key];
            if (value === true) {
                return [prefixedKey];
            } else {
                return [prefixedKey, value];

            }
        }).reduce(arrayreduce.arrayConcat(), []);
}

module.exports = _optionArgs;