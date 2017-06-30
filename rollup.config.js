import alias from 'rollup-plugin-alias'
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs'
import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'

export default {
  entry: 'src/index.js',
  format: 'iife',
  dest: 'source/js/zoek-bootstrap.js',
  plugins: [
    alias({
      app: path.resolve(__dirname, './src'),
      resolve: ['.js', '/index.js']
    }),
    resolve({
      jsnext: true,
      main: true,
      preferBuiltins: false 
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ]
};