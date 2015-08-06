/**
 * Test for execcli.
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
    execcli('ls', [{a: true, l: true}, '.'], function (err) {
        test.ifError(err);
        test.done();
    });
};

exports['Exec cli with spawn options.'] = function (test) {
    execcli('ls', [{a: true, l: true}, '.'], {
        cwd: __dirname + '/ci'
    }, function (err) {
        test.ifError(err);
        test.done();
    });
};
