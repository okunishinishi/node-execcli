/**
 * Execute CLI command on sub process.
 * @module execcli
 * @version 4.0.4
 */

'use strict'

const execcli = require('./execcli')
const npmBin = require('./npm_bin')
const pkg = require('../package.json')

let lib = execcli.bind(this)

Object.assign(lib, {
  execcli,
  npmBin,
  version: pkg.version
})

module.exports = lib
