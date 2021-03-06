/**
 * Test for execcli.
 * Runs with mocha.
 */

'use strict'

const execcli = require('../lib/execcli')
const assert = require('assert')

describe('execcli', () => {
  it('Optional args.', (done) => {
    let args = execcli._optionArgs({
      'fooBar': 'bazQuz',
      '--quz-buz': '123'
    })
    assert.deepEqual(args, ['--foo-bar', 'bazQuz', '--quz-buz', '123'])
    done()
  })

  it('Exec cli.', (done) => {
    execcli('ls', [{a: true, l: true}, '.'], function (err) {
      assert.ifError(err)
      done()
    })
  })

  it('Exec cli with promise.', async () => {
    await execcli('ls', [{a: true, l: true}, '.'])
  })

  it('Exec cli with spawn options.', (done) => {
    execcli('ls', [{a: true, l: true}, '.'], {}, (err) => {
      assert.ifError(err)
      done()
    })
  })

  it('Exec cli spawn working directory.', (done) => {
    execcli('ls', [{a: true, l: true}, '.'], {
      cwd: `${__dirname}/../ci`
    }, (err) => {
      assert.ifError(err)
      done()
    })
  })

  it('Exec not existing.', (done) => {
    execcli('__invalid_command_', [{a: true, l: true}, '.'], {
      notfound: 'Please try `foo`.'
    }).catch((err) => {
      assert.ok(!!err)
      done()
    })
  })
})

/* global describe, it */
