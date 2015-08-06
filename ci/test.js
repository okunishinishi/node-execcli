#!/usr/bin/env node

/**
 * Run tests.
 */

"use strict";

var path = require('path'),
    apeTesting = require('ape-testing'),
    colorprint = require('colorprint'),
    async = require('async');

var basedir = path.resolve(__dirname, '..');
process.chdir(basedir);

colorprint.notice('Test started...');
async.series([
    function (callback) {
        apeTesting.runNodeunit([
            'execcli_test.js'
        ], callback);
    }
], function (err) {
    if (err) {
        colorprint.error(err);
    } else {
        colorprint.notice('...test done!');
    }
});
