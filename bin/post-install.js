// install packages for cli
// cut down version of https://strongloop.com/strongblog/modular-node-js-express/#easy-setup
const cp = require('child_process')
const { resolve } = require('path')

console.log('Installing cli dependencies')

const cwd = resolve(__dirname, '../packages/cli/') 

const opts = { env: process.env, cwd, stdio: 'inherit' }
if (process.platform === 'win32') opts.shell = true

cp.spawn('npm', ['install', '--no-optional'], opts)
