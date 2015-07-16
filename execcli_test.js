/**
 * Test for execli.
 * Runs with nodeunit.
 */

"use strict";

var execcli = require('./execcli');

exports['Exec cli.'] = function (test) {
    execcli('ls', '.', {a: true, l: true}, function (err) {
        test.ifError(err);
        test.done();
    });
};
