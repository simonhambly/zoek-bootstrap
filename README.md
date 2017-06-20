# Installing

```sh
$ npm install --save-dev patternlab-node
$ npm install --save-dev edition-node-gulp
$ npm install --save-dev starterkit-mustache-base styleguidekit-assets-default styleguidekit-mustache-default
```

There's a bug in the patternlab-core* that expects patternlab-node to have a subdirectory of node_modules.

As a quick fix, run this

```sh
$ mkdir -p node_modules/patternlab-core/node_modules
```

*Exception thrown line 41 of pattern_engines.js