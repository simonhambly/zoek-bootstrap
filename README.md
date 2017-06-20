# Installing

```sh
$ npm install --save-dev patternlab-node
$ npm install --save-dev edition-node-gulp
$ npm install --save-dev starterkit-mustache-base styleguidekit-assets-default styleguidekit-mustache-default
```

To enable local install of gulp, add this to `./package.json`

```json
  "scripts": {
    "gulp": "gulp --"
  }
```

## Copy the default gruntfile and config from the editions

```sh
cp node_modules/edition-node-gulp/gulpfile.js .
cp node_modules/edition-node-gulp/patternlab-config.json .

```

## Fix that bug
There's a bug in the patternlab-core* that expects patternlab-node to have a subdirectory of node_modules.

As a quick fix, run this

```sh
$ mkdir -p node_modules/patternlab-core/node_modules
```

*Exception thrown line 41 of pattern_engines.js