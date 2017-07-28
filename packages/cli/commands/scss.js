const sass = require('gulp-sass')
const gulp = require('../gulp')

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
    const watch = argv.watch.lenth ? argv.watch : ['./**/*.scss']
    return gulp.watch(watch, [buildSass])
  })

  gulp.start(buildSass)
  if (argv.watch) gulp.start(watchSass)
}

module.exports = {
  optionBuilder,
  run
}