# Contributing

## Installing

Run the following to install zoek-bootstrap's dependencies and the styleguide dependencies

```sh
$ npm run bootstrap
```


## Development

### Running styleguide

[Patternlab](http://patternlab.io/) is used as the styleguide it can be built by:

```sh
$ cd ./packages/patternlab
$ npm run build:scaffolding-css
$ npm run build:patternlab
```

Start pattern lab, and have it monitor for changes by:

```sh
$ npm start
```

## CSS & JS

Bootstraps css and js are designed to be consumed by the downstream projects so there is no build as such, however you need to build them to work with patternlab. Run the following build and output into the patternlab `public` 

```sh
$ npm run build:css
$ npm run build:js
```

Or use the following to watch for changes and automatically build both css and js

```sh
$ npm run build:dev
```

### Updating images

After you've updated any bootstrap images, then run the following to copy them to pattern lab

```sh
$ npm run bootstrap:assets
```


## Pattern lab installation notes

Included here for reference, there is no need to perform any of these tasks

```sh
$ npm install --save-dev patternlab-node
$ npm install --save-dev edition-node-gulp
$ npm install --save-dev starterkit-mustache-base styleguidekit-assets-default styleguidekit-mustache-default
```

To enable local install of gulp, add this to `./package.json`

```json
  "scripts": {
    "gulp": "gulp"
  }
```

## Copy the default gulpfile and config from the editions

```sh
cp node_modules/edition-node-gulp/gulpfile.js .
cp node_modules/edition-node-gulp/patternlab-config.json .
```

## Install the a starter kit

Install the default mustache

```sh
npm run gulp -- patternlab:loadstarterkit --kit starterkit-mustache-bas
```

## npm scripts

```json
  "scripts": {
    "gulp": "gulp",
    "start": "gulp patternlab:serve"
  }
```


## Fix that bug
There's a bug in the patternlab-core* that expects patternlab-node to have a subdirectory of node_modules.

As a quick fix, run this

```sh
$ mkdir -p node_modules/patternlab-core/node_modules
```

*Exception thrown line 41 of pattern_engines.js — should really raise an github issue for this...

