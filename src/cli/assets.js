
exports.assetsOptionBuilder = (yargs) => {
  return  yargs.option('clean', {
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
}

function unpackAssets (argv) {
  if (argv.clean) {
    console.log(`Removing ${argv.to}`)
    remove(argv.to) 
  }

  ensureDir(argv.to)

  const dirs = ['/fonts', '/images']

  dirs.forEach((dir) => {
    console.log(`Unpacking ${dir} to ${argv.to + dir}`)
    copy(argv.from + dir, argv.to + dir, { preserveTimestamps: true })  
  });
}

exports.unpackAssets = unpackAssets