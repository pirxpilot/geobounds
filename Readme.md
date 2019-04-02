[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

# geobounds

Checks if point is in bounds.

## Install

```sh
$ npm install --save geobounds
```

## Usage

```js
var geobounds = require('geobounds');
var bounds = geobounds([
  [[-1, 0], [3, 5]],
  [[100, 20], [115, 80]]
]);

bounds([1, 1]); // true
bounds([4, 1]); // false

```

Bounds can be dynamically extended.

```js
var geobounds = require('geobounds');
var bounds = geobounds();

bounds.extend([0, 1]);
bounds.extend([1, 0]);

bounds.get(); // [[[0, 0], [1, 1]]]

```

## License

MIT © [Damian Krzeminski](https://pirxpilot.me)

[npm-image]: https://img.shields.io/npm/v/geobounds
[npm-url]: https://npmjs.org/package/geobounds

[build-url]: https://github.com/melitele/geobounds/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/actions/workflow/status/melitele/geobounds/check.yaml?branch=main

[deps-image]: https://img.shields.io/librariesio/release/npm/geobounds
[deps-url]: https://libraries.io/npm/geobounds
