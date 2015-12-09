#!/usr/bin/env node

/**
 * Measure test coverage.
 */

"use strict";

process.chdir(__dirname + '/..');

var apeTasking = require('ape-tasking'),
    apeCovering = require('ape-covering');

apeTasking.runTasks('cover', [
    (callback) => {
        apeCovering.measureCoverage('ci/test.js', [], {
            dir: 'coverage'
        }, callback);
    }
], true);
