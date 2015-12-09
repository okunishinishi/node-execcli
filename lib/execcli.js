/**
 * Execute cli.
 * @function execcli
 * @param {string} cmdBin - Bin command to execute.
 * @param {Array} cmdArgs - Bin command arguments to execute.
 * @param {object} [options] - Optional settings.
 * @param {string} [options.notfound] - Instruction text when bin not found.
 * @parma {string} [options.cwd=process.cwd()] - Working directory path.
 * @param {function} [callback] - Callback when done.
 * @example
 *
 */

"use strict";

const argx = require('argx'),
    arrayreduce = require('arrayreduce'),
    childProcess = require('child_process'),
    hasbin = require('hasbin'),
    path = require('path'),
    fs = require('fs'),
    _optionArgs = require('./_option_args');

function _spawn(bin, args, options, callback) {
    let spawned = childProcess.spawn(bin, args, options);
    spawned.stdout.pipe(process.stdout);
    spawned.stderr.pipe(process.stderr);
    spawned.on('exit', function (exitCode) {
        let err = exitCode === 0 ? null : new Error('Exit with code: ' + exitCode);
        callback(err);
    })
}

function _notFoundError(bin, instruction) {
    let msg = "Command `" + bin + "` not found.";
    if (instruction) {
        msg = [msg, instruction].join(' ');
    }
    return new Error(msg);
}

/** @lends execcli */
function execcli(cmdBin, cmdArgs, options, callback) {
    let args = argx(arguments);
    callback = args.pop('function') || argx.noop;
    cmdBin = args.shift('string');
    cmdArgs = (args.shift('array') || []).map((arg) => {
        if (typeof(arg) === 'object') {
            return _optionArgs(arg);
        }
        return arg;
    }).reduce(arrayreduce.arrayConcat(), []);
    options = args.pop('object') || {};

    let here = process.cwd(),
        cwd = options.cwd || process.cwd();
    process.chdir(cwd);
    hasbin(cmdBin, (hasBinAsIs) => {
        fs.exists(path.resolve(cmdBin), (hasbinAsPath) => {
            let valid = hasBinAsIs || hasbinAsPath;
            if (!valid) {
                let err = _notFoundError(cmdBin, options.notfound);
                process.chdir(here);
                callback(err);
                return;
            }
            _spawn(cmdBin, cmdArgs, options, (err) => {
                process.chdir(here);
                callback(err);
            });
        });
    });
}

execcli._optionArgs = _optionArgs;
execcli._spawn = _spawn;

module.exports = execcli;
