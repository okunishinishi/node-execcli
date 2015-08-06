#!/usr/bin/env node

/**
 * Run coverage
 */

"use strict";

var path = require('path'),
    async = require('async'),
    apeCovering = require('ape-covering');

var basedir = path.resolve(__dirname, '..');
process.chdir(basedir);

async.series([
    function (callback) {
        var test = require.resolve('./test');
        apeCovering.measureCoverage(test, [], {
            dir: 'coverage'
        }, callback);
    }
], function (err) {
    if (err) {
        console.error(err);
    }
});