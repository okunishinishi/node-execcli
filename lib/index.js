/**
 * Execute CLI command on sub process.
 * @module execcli
 * @version 2.3.0
 */

"use strict";

var execcli = require('./execcli'),
    npmBin = require('./npm_bin'),
    pkg = require('../package.json');

var lib = execcli.bind(this);
lib.execcli = execcli;
lib.npmBin = npmBin;
lib.version = pkg.version;

module.exports = lib;
