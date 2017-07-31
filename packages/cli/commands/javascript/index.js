const gulp = require('../../gulp')
const buildTask = require('./task')

const optionBuilder = (yargs) => {
  return yargs.option('watch', {
      describe: 'Watch files. Supports glob patterns (in quotes), separate multiple patterns with spaces',
      type: 'array'
    })
    .option('app-alias', {
      describe: "path to map to 'app' alias in imports (e.g. const x import 'app/x')",
      type: 'string',
      default: './src'
    })
    .require('output-file', 'Must specify an output file')
    .demand(1, 'Expected a source javascript file.')
}

const buildjs = 'build:js'
const watchjs = 'watch:js'

function run (argv) {

  const source = argv._[1]

  gulp.task(buildjs, buildTask(source, argv.outputFile, argv.appAlias))

  gulp.task(watchjs, [buildjs], () => {
    const watch = argv.watch.lenth ? argv.watch : ['./src/**/*.js']
    return gulp.watch(watch, [buildjs])
  })

  gulp.start(buildjs)
  if (argv.watch) gulp.start(watchjs)
}

module.exports = {
  optionBuilder,
  run
}