node-execcli
=====

[![Build Status][my_travis_badge_url]][my_travis_url]
[![Code Climate][my_codeclimate_badge_url]][my_codeclimate_url]
[![Code Coverage][my_codeclimate_coverage_badge_url]][my_codeclimate_url]
[![npm version][my_npm_budge_url]][my_npm_url]


Execute cli command as sub process.

Usage
----

```javascript

var execcli = require('execcli');

// Equivalent to execute `ls -l .` from command line.
execcli('ls', ['.', {'l':true}], function (err) {
    /*...*/
});
````

Installation
----

```
$ npm install execcli --save
```

License
-------
This software is released under the [MIT License][my_license_url].

[npm_url]: https://www.npmjs.org/
[my_repo_url]: https://github.com/okunishinishi/node-execcli
[my_travis_url]: http://travis-ci.org/okunishinishi/node-execcli
[my_travis_badge_url]: http://img.shields.io/travis/okunishinishi/node-execcli.svg?style=flat
[my_license_url]: https://github.com/okunishinishi/node-execcli/blob/master/LICENSE
[my_codeclimate_url]: http://codeclimate.com/github/okunishinishi/node-execcli
[my_codeclimate_badge_url]: http://img.shields.io/codeclimate/github/okunishinishi/node-execcli.svg?style=flat
[my_codeclimate_coverage_badge_url]: http://img.shields.io/codeclimate/coverage/github/okunishinishi/node-execcli.svg?style=flat
[my_coverage_url]: http://okunishinishi.github.io/node-execcli/coverage/lcov-report
[my_npm_url]: http://www.npmjs.org/package/execcli
[my_npm_budge_url]: http://img.shields.io/npm/v/execcli.svg?style=flat

