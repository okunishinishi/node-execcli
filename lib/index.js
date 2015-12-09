/**
 * Execute CLI command on sub process.
 * @module execcli
 * @version 3.0.0
 */

"use strict";

const execcli = require('./execcli'),
    npmBin = require('./npm_bin'),
    pkg = require('../package.json');

let lib = execcli.bind(this);
lib.execcli = execcli;
lib.npmBin = npmBin;
lib.version = pkg.version;

module.exports = lib;
