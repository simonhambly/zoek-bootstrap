const path = require('path')
const rollup = require('rollup')
const alias = require('rollup-plugin-alias')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const uglify = require('rollup-plugin-uglify')


const localNodeModules = path.resolve(__dirname, '../../node_modules/')
const localNodeModulesGlob = `${localNodeModules}/**`

const localPlugin = (name) => path.join(localNodeModules, `babel-plugin-${name}`)
const localPreset = (name) => path.join(localNodeModules, `babel-preset-${name}`)
  

module.exports = (source, destination, appAlias) => () => {

  const cwd = process.cwd()
  
  return rollup.rollup({
      entry: path.resolve(cwd, source),
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
          include: localNodeModulesGlob
        }),
        babel({
          babelrc: false,
          exclude: localNodeModulesGlob,
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
