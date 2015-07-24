/**
 * Execute cli.
 * @function execcli
 * @param {string} cmdBin - Bin command to execute.
 * @param {string} [cmdArgs] - Bin command arguments to execute.
 * @param {object} [cmdOptions] - Optional settings.
 * @param {function} callback - Callback when done.
 */

"use strict";

var argx = require('argx'),
    stringcase = require('stringcase'),
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
            var prefixedKey = prefix + stringcase.spinalcase(key).replace(/^\-+/, '');
            if (options[key] === true) {
                return [prefixedKey];
            } else {
                return [prefixedKey, options[key]];

            }
        }).reduce(function (a, b) {
            return a.concat(b);
        }, []);
}


/** @lends execcli */
function execcli(cmdBin, cmdArgs, cmdOptions, callback) {
    var args = argx(arguments);
    cmdBin = args.shift();
    callback = args.pop('function') || argx.noop;
    cmdOptions = args.pop('object') || {};
    cmdArgs = args.remain();

    _spawn(cmdBin, _optionArgs(cmdOptions).concat(cmdArgs), {}, callback);
}

execcli._optionArgs = _optionArgs;
execcli._spawn = _spawn;

module.exports = execcli;
