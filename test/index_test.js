/**
 * Bud file for index.js
 */

"use strict";

const index = require('../lib'),
    assert = require('assert');

describe('index', ()=> {

    it('Eval properties.', (done) => {
        assert.ok(index);
        assert.ok(index.version);
        done();
    });
});
