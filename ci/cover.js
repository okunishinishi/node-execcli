#!/usr/bin/env node

/**
 * Run coverage
 */

"use strict";

var path = require('path');

var basedir = path.resolve(__dirname, '..');
process.chdir(basedir);

require('istanbul/lib/cli').runToCompletion([
    'cover',
    require.resolve('./test.js'),
    '--dir', 'coverage'
]);