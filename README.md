# Zoek Bootstrap

A standardised look and feel for applications at [zoek.uk](https://zoek.uk). Contains all the source .scss and .js and the build tools you need to get them incorporated into your project.


## Installation

Assuming you have node and npm installed and working, install by running

```sh
$ npm install --save-dev git+https://github.com/simonhambly/zoek-bootstrap.git#v0.2.4
```

(given this is for internal use, we see no reason to pollute npm)

On windows, you might need to install some build tools - see [node-gyp](https://github.com/nodejs/node-gyp#installation)

## Quickstart

Include these scripts in your package.json (adjusting your source and out locations as needed):

```json
  "bootstrap:assets": "zoek-bootstrap assets --clean --to ./public/bootstrap",
  "build:css": "zoek-bootstrap sass --output ./public/css src/main.scss"
  "build:js": "zoek-bootstrap js --output-file ./public/js src/index.js"
  "build:all": "npm run build:css && npm:run build:js",
  "watch:css": "npm run build:css -- --watch",
  "watch:js": "npm run build:js -- --watch",
  "watch:all": "concurrently --kill-all --raw 'npm run watch:css' 'npm run watch:js'"
```

Then run:

```sh
$ npm install --save-dev concurrently
$ npm run bootstrap:assets
$ npm run watch:all
```

This builds your project css and js, with the build tools watching `./src` for further changes.

## In depth

### Including the common bootstrap assets

zoek-bootstrap contains common assets (namely images and fonts) that need to be copied to your projects public assets. Out of the box the .scss is designed to work with bootstrap assets in a folder named bootstrap, and a sibling to the css folder. It expects something like this directory structure:

```
project-public-folder
├── _bootstrap
|   ├──_fonts
|   |  └── ...
|   └──_images
|      └── ...
├── _js
|   └── project.js
├── _styles
|   └── project.css
```

**Be warned zoek-bootstrap considers bootstrap it's own, so `--clean` removes the whole bootstrap directory, before copying the assets.**

### Including the bootstrap .scss

Bootstrap's .scss can be included at the start of your main .scss file like so

```scss
@import 'zoek-bootstrap';
```

### Including bootstrap .js

Todo...

### On the build server

Run:

```sh
$ npm run build:css
$ npm run build:js
```

If you project root directory gets deployed then run

```sh
$ npm prune --production
```

## CLI

See `zoek-bootstrap --help` for more details

## Upgrading

Simply amend the version no in package.json run `npm prune && npm install`. Don't forget to unpack the assets again.

## Styleguide

Patternlab is being used for the style guide. Use this as a reference for the HTML needed to work with zoek-bootstrap. Clone this repo and run:

```sh
$ npm run install:deps
$ npm build:all
$ cd ./packages/patternlab
$ npm start
```

## Contributing

See [install instructions and development guide](docs/contributing.md).


© 2017 Copyright Zoek Applications Ltd