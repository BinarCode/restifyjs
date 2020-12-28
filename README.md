<p align="center"><img src="http://restify.binarcode.com/assets/img/logo.png"></p>

<p align="center">
    <a href="https://github.com/BinarCode/restifyjs/actions"><img src="https://github.com/BinarCode/restifyjs/workflows/Tests/badge.svg" alt="Build Status"></a>
    <a href="https://badge.fury.io/js/%40binarcode%2Frestifyjs.svg"><img src="https://badge.fury.io/js/%40binarcode%2Frestifyjs.svg" alt="Build Status"></a>
    <a href="https://packagist.org/packages/binaryk/laravel-restify"><img src="https://poser.pugx.org/binaryk/laravel-restify/license.svg" alt="License"></a>
</p>


## Installation

You can install the package via npm / yarn:

```bash
npm install @binarcode/restifyjs
```

## Quick start

Setup package:

```js
import Restify from '@binarcode/restifyjs'
//...
const api = await axios.get('api/restify/restifyjs/setup');

const restify = Restify.init(api);

// Get specific repository:

const userRepository = restify.repository('users');

// List sorts:
userRepository.sorts()

// List matches:
userRepository.matches()

// List related:
userRepository.related()

// List searchables:
userRepository.searchables()
```
