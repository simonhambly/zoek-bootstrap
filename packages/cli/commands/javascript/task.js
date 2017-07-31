const path = require('path')
const rollup = require('rollup')
const alias = require('rollup-plugin-alias')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const uglify = require('rollup-plugin-uglify')
const { minify } = require('uglify-es')


const localNodeModules = path.resolve(__dirname, '../../node_modules/')

const localPlugin = (name) => path.join(localNodeModules, `babel-plugin-${name}`)
const localPreset = (name) => path.join(localNodeModules, `babel-preset-${name}`)
const localNodeModulesGlob = `${localNodeModules}/**`

const cwd = process.cwd()
const containerNodeModulesGlob = `${path.resolve(cwd, './node_modules')}/**`

module.exports = (source, destination, appAlias, bootstrapAlias) => () => {
  
  return rollup.rollup({
      entry: path.resolve(cwd, source),
      plugins: [
        alias({
          app: path.resolve(cwd, appAlias),
          bootstrap: path.resolve(cwd, bootstrapAlias),
          // add '/index.js' => to mimic standard node.js import behaviour, 
          // this allows imports like some/dir instead of some/dir/index.js
          resolve: ['.js', '/index.js'] 
        }),
        resolve({
          jsnext: true,
          main: true,
          module: true,
          preferBuiltins: false 
        }),
        commonjs({
          include: [localNodeModulesGlob, containerNodeModulesGlob]
        }),
        babel({
          babelrc: false,
          exclude: containerNodeModulesGlob,
          presets: [
              localPreset('flow'),
              [localPreset('env'), {
                "modules": false,
                "targets": {
                  "browsers": ["last 2 versions"]
                }
              }]
            ],
          plugins: [
            localPlugin('external-helpers'),
            localPlugin('transform-object-rest-spread')
          ]
        }),
        uglify({}, minify)
      ]

    })
    .then( bundle => {
      bundle.write({
        dest: destination,
        format: 'iife'
      })
    })
    .catch(error => {
      console.error(error)
    })
}
