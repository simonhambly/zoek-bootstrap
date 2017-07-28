const chalk = require('chalk')
const gulp = require('gulp')
const sass = require('gulp-sass')
const gutil = require('gulp-util')
const pretty = require('pretty-hrtime')

const optionBuilder = (yargs) => {
  return  yargs.option('output', {
      describe: 'Directory to output the compiled css'
    })
    .option('watch', {
      describe: 'Watch files. Supports glob patterns (in quotes), separate multiple patterns with spaces',
      type: 'array'
    })
    .option('include-path', {
      describe: 'Paths to attempt to resolve your @import declarations. Supports glob patterns (in quotes), separate multiple patterns with spaces',
      type: 'array'
    })
    .require('output', 'Must specify an output directory')
    .demand(1, 'Expected a source scss file.')
}

const buildSass = 'build:sass'
const watchSass = 'watch:sass'

function run (argv) {

  const source = argv._[1]

  gulp.task(buildSass, () => {
    return gulp.src(source)
      .pipe(sass({ 
          outputStyle: 'compressed',
          includePaths: argv['include-paths']
        }
        ).on('error', sass.logError)
      )
      .pipe(gulp.dest(argv.output))
  })

  gulp.task(watchSass, [buildSass], () => {
    return gulp.watch(argv.watch, [buildSass])
  })

  gulp.on('task_start', (e) => {
    gutil.log(`${chalk.cyan(e.task)} started`)
  })

  gulp.on('task_stop', (e) => {
    gutil.log(`${chalk.cyan(e.task)} finished after ${chalk.magenta(pretty(e.hrDuration))}`)
  })

  gulp.start(buildSass)
  if (argv.watch) gulp.start(watchSass)
}

module.exports = {
  optionBuilder,
  run
}