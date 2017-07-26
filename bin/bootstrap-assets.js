#!/usr/bin/env node
const yargs = require('yargs')
const { 
  copySync: copy,
  ensureDirSync: ensureDir, 
  removeSync: remove
} = require('fs-extra')

const argv = yargs.usage('Usage: $0 path/to/destination/dir [options]')
  .option('clean', {
    describe: 'Remove destination folder before copying assets',
    type: 'boolean'
  })
  .option('to', {
    describe: 'Dir to copy bootstrap assets into'
  })
  .option('from', {
    describe: 'Location to copy assets from',
    default: './node_modules/zoek-bootstrap/src'
  })
  .require('to', 'Must specify a location to copy assets to')
  .help('help')
  .alias('help', 'h')
  .argv

if (argv.clean) {
 remove(argv.to) 
}

ensureDir(argv.to)

const dirs = ['/fonts', '/images']

dirs.forEach((dir) => {
  copy(argv.from + dir, argv.to + dir, { preserveTimestamps: true })  
});