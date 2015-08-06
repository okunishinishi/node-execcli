#!/usr/bin/env node

/**
 * Run tests.
 */

"use strict";

var path = require('path'),
    nodeunit = require('nodeunit'),
    colorprint = require('colorprint'),
    async = require('async');

var basedir = path.resolve(__dirname, '..');
process.chdir(basedir);

colorprint.notice('Test started...');
async.series([
    function (callback) {
        var reporter = nodeunit['reporters']['default'],
            options = require('nodeunit/bin/nodeunit.json');
        reporter.run(['execcli_test.js'], options, callback);
    }
], function (err) {
    if (err) {
        colorprint.error(err);
    } else {
        colorprint.notice('...test done!');
    }
});
