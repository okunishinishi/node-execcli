#!/usr/bin/env node

"use strict";

var path = require('path'),
    fs = require('fs'),
    childProcess = require('child_process');

var basedir = path.resolve(__dirname, '..');
process.chdir(basedir);

var codeclimate = require.resolve('codeclimate-test-reporter/bin/codeclimate.js');

childProcess.spawn(codeclimate, {
    stdio: [
        fs.openSync(basedir + '/coverage/lcov.info', 'r'),
        process.stdout,
        process.stderr
    ]
});
