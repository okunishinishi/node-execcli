/**
 * Execute cli.
 * @function execcli
 * @param {string} cmdBin - Bin command to execute.
 * @param {string} [cmdArgs] - Bin command arguments to execute.
 * @param {object} [cmdOptions] - Optional settings.
 * @param {object} [spawnOptions] - Spawn options.
 * @param {function} callback - Callback when done.
 */

"use strict";

var argx = require('argx'),
    childProcess = require('child_process');

function _spawn(bin, args, options, callback) {
    var spawned = childProcess.spawn(bin, args, options);
    spawned.stdout.pipe(process.stdout);
    spawned.stderr.pipe(process.stderr);
    spawned.on('exit', function (exitCode) {
        var err = exitCode === 0 ? null : new Error('Exit with code: ' + exitCode);
        callback(err);
    })
}

function _optionArgs(options) {
    return Object.keys(options)
        .filter(function (key) {
            return options[key] !== false;
        })
        .map(function (key) {
            var prefix = key.length === 1 ? '-' : '--';
            var prefixedKey = prefix + key.replace(/^\-+/, '');
            if (options[key] === true) {
                return [prefixedKey];
            } else {
                return [prefixedKey, options[key]];

            }
        }).reduce(_concat, []);
}


function _concat(a, b) {
    return a.concat(b);
}
function _validString(val) {
    return !!val;
}

function _keywords(text) {
    return [].concat(text || [])
        .reduce(_concat, [])
        .map(function (text) {
            return text.split(/\s/g).filter(_validString);
        })
        .reduce(_concat, []);
}

/** @lends execcli */
function execcli(cmdBin, cmdArgs, cmdOptions, callback) {
    var args = argx(arguments);
    cmdBin = args.shift();
    callback = args.pop('function') || argx.noop;
    var opt1 = args.pop('object') || {}, opt2 = args.pop('object');
    var spawnOptions;
    if (opt2) {
        cmdOptions = opt2;
        spawnOptions = opt1;
    } else {
        cmdOptions = opt1;
        spawnOptions = {};
    }
    cmdArgs = args.remain();
    var keywords = _keywords([cmdBin].concat(_optionArgs(cmdOptions)).concat(cmdArgs));
    _spawn(keywords.shift(), keywords, spawnOptions, callback);
}

module.exports = execcli;
