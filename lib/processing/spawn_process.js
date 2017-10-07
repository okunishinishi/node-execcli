/**
 * @function spawnProcess
 */
'use strict'

const childProcess = require('child_process')

/** @lends spawnProcess */
async function spawnProcess (bin, args, options = {}) {
  const {
    suppressOut = false
  } = options
  return new Promise((resolve, reject) => {
    const spawned = childProcess.spawn(bin, args, options)
    if (!suppressOut) {
      spawned.stdout.pipe(process.stdout)
      spawned.stderr.pipe(process.stderr)
    }
    spawned.on('exit', function (exitCode) {
      let err = exitCode === 0 ? null : new Error(`Exit with code: ${exitCode}`)
      err ? reject(err) : resolve()
    })
    return spawned
  })
}

module.exports = spawnProcess
