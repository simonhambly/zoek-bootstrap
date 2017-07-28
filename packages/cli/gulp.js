const chalk = require('chalk')
const gulp = require('gulp')
const gutil = require('gulp-util')
const pretty = require('pretty-hrtime')

gulp.on('task_start', (e) => {
  gutil.log(`${chalk.cyan(e.task)} started`)
})

gulp.on('task_stop', (e) => {
  gutil.log(`${chalk.cyan(e.task)} finished after ${chalk.magenta(pretty(e.hrDuration))}`)
})

module.exports = gulp