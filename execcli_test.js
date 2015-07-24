/**
 * Test for execli.
 * Runs with nodeunit.
 */

"use strict";

var execcli = require('./execcli');

exports['Optional args.'] = function (test) {
    var args = execcli._optionArgs({
        'fooBar': 'bazQuz',
        '--quz-buz': '123'
    });
    test.deepEqual(args, ['--foo-bar', 'bazQuz', '--quz-buz', '123']);
    test.done();
};

exports['Exec cli.'] = function (test) {
    execcli('ls', '.', {a: true, l: true}, function (err) {
        test.ifError(err);
        test.done();
    });
};
