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

exports['Exec cli with spawn options.'] = function (test) {
    execcli('ls', '.', {a: true, l: true}, {
        cwd: __dirname + '/ci'
    }, function (err) {
        test.ifError(err);
        test.done();
    });
};
