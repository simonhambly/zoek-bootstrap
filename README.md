# Zoek Bootstrap

A standardised look and feel for applications at [zoek.uk](https://zoek.uk)


## Installation

Assuming you have node and npm installed and working, install by running

```sh
$ npm install --save-dev git+https://github.com/simonhambly/zoek-bootstrap.git#v0.2.4
```

(given this for internal use, we see no reason to pollute npm)

### Unpacking assets

zoek-bootstrap contains common assets (namely images and fonts) that need to be copied to your projects public assets. Out of the box the .scss designed to work with bootstrap assets in a folder named bootstrap, something akin to this directory structure:

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

You can unpack the assets using the zoek-bootstrap cli. It's recommended you create a script in `package.json`:

```json
  "bootstrap:assets": "zoek-bootstrap assets --clean --to ./public/bootstrap"
```

and run it to unpack the assets.

```sh
$ npm run bootstrap:assets 
```

Be warned zoek-bootstrap considers bootstrap it's own, so `--clean` removes the whole bootstrap directory, before copying the assets.

## Including in your project

Add this script to `package.json` to automatically include the bootstrap .scss when you build

```json
  "build:css": "node-sass --recursive --include-path ./node_modules/zoek-bootstrap/src --output-style compressed --output ./public/css src/main.scss",
```

Bootstrap's .scss can be included at the start of your main .scss file like so

```scss
@import 'zoek-bootstrap';
```

## Upgrading

Simply amend the version no in package.json run `npm prune && npm install`. Don't forget to unpack the assets again.

## Contributing

See [install instructions and development guide](docs/contributing.md).


© 2017 Copyright Zoek Applications Ltd