/**
 * Execute CLI command on sub process.
 * @module execcli
 * @version 2.2.1
 */

"use strict";

var execcli = require('./execcli'),
    pkg = require('../package.json');

var lib = execcli.bind(this);
lib.execcli = execcli;
lib.version = pkg.version;

module.exports = lib;
