/**
 * Bud file for index.js
 */

"use strict";

const index = require('../lib');

describe('index', ()=> {

    it('Eval properties.', (done) => {
        assert.ok(index);
        assert.ok(index.version);
        done();
    });
});
