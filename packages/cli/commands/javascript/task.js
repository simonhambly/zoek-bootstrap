const path = require('path')
const rollup = require('rollup')
const alias = require('rollup-plugin-alias')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const uglify = require('rollup-plugin-uglify')


module.exports = (source, destination, appAlias) => () => {

  const cwd = process.cwd()
  const entry = path.resolve(cwd, source)
  const cliNodeModules = path.resolve(cwd, './packages/cli/node_modules/')

  return rollup.rollup({
      entry: source,
      plugins: [
        alias({
          app: path.resolve(cwd, appAlias),
          // add '/index.js' => to mimic standard node.js import behaviour, 
          // this allows imports like some/dir instead of some/dir/index.js
          resolve: ['.js', '/index.js'] 
        }),
        resolve({
          jsnext: true,
          main: true,
          preferBuiltins: false 
        }),
        commonjs({
          include: path.resolve(cwd, 'node_modules/**')
        }),
        babel({
          babelrc: false,
          exclude: path.resolve(cwd, 'node_modules/**'),
          presets: [
              path.resolve(cliNodeModules, 'babel-preset-flow'),
              [path.resolve(cliNodeModules, 'babel-preset-env'), {
                "modules": false,
                "targets": {
                  "browsers": ["last 2 versions"]
                }
              }]
            ],
          plugins: [
            path.resolve(cliNodeModules, 'babel-plugin-external-helpers'),
            path.resolve(cliNodeModules, 'babel-plugin-transform-object-rest-spread')
          ]
        }),
        uglify()
      ]

    })
    .then( bundle => {
      bundle.write({
        dest: destination,
        format: 'iife'
      })
    })
}
