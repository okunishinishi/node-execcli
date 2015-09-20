/**
 * Execute cli.
 * @function execcli
 * @param {string} cmdBin - Bin command to execute.
 * @param {Array} cmdArgs - Bin command arguments to execute.
 * @param {object} [options] - Optional settings.
 * @param {string} [options.notfound] - Instruction text when bin not found.
 * @param {function} [callback] - Callback when done.
 * @example
 *
 */

"use strict";

var argx = require('argx'),
    arrayreduce = require('arrayreduce'),
    childProcess = require('child_process'),
    hasbin = require('hasbin'),
    path = require('path'),
    fs = require('fs'),
    _optionArgs = require('./_option_args');

function _spawn(bin, args, options, callback) {
    var spawned = childProcess.spawn(bin, args, options);
    spawned.stdout.pipe(process.stdout);
    spawned.stderr.pipe(process.stderr);
    spawned.on('exit', function (exitCode) {
        var err = exitCode === 0 ? null : new Error('Exit with code: ' + exitCode);
        callback(err);
    })
}

function _notFoundError(bin, instruction) {
    var msg = "Command `" + bin + "` not found.";
    if (instruction) {
        msg = [msg, instruction].join(' ');
    }
    return new Error(msg);
}

/** @lends execcli */
function execcli(cmdBin, cmdArgs, options, callback) {
    var args = argx(arguments);
    callback = args.pop('function') || argx.noop;
    cmdBin = args.shift('string');
    cmdArgs = (args.shift('array') || []).map(function (arg) {
        if (typeof(arg) === 'object') {
            return _optionArgs(arg);
        }
        return arg;
    }).reduce(arrayreduce.arrayConcat(), []);
    options = args.pop('object') || {};

    hasbin(cmdBin, function (hasBinAsIs) {
        fs.exists(path.resolve(cmdBin), function (hasbinAsPath) {
            var valid = hasBinAsIs || hasbinAsPath;
            if (!valid) {
                var error = _notFoundError(cmdBin, options.notfound);
                callback(error);
                return;
            }
            _spawn(cmdBin, cmdArgs, options, callback);
        });
    });
}

execcli._optionArgs = _optionArgs;
execcli._spawn = _spawn;

module.exports = execcli;
