#!/usr/bin/env node

"use strict";

var path = require('path'),
    apeReporting = require('ape-reporting');

var basedir = path.resolve(__dirname, '..');
process.chdir(basedir);

async.series([
    function (callback) {
        apeReporting.sendToCodeclimate(basedir + '/coverage/lcov.info', callback);
    }
], function (err) {
    if (err) {
        console.error(err);
    }
});
