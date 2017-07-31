// install packages for cli
// cut down version of https://strongloop.com/strongblog/modular-node-js-express/#easy-setup
const cp = require('child_process')
const { resolve } = require('path')

console.log('Installing cli dependencies')

const cwd = resolve(__dirname, '../packages/cli/') 
cp.spawn('npm', ['i'], { env: process.env, cwd, stdio: 'inherit' })
