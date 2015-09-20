/**
 * Test for execcli.
 * Runs with nodeunit.
 */

"use strict";

var execcli = require('../lib/execcli');

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
        cwd: __dirname + '/../ci'
    }, function (err) {
        test.ifError(err);
        test.done();
    });
};

exports['Exec not existing.'] = function (test) {
    execcli('__invalid_command_', [{a: true, l: true}, '.'], {
        notfound: 'Please try `foo`.'
    }, function (err) {
        test.ok(!!err);
        test.done();
    });
};