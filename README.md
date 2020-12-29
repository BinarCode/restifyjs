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
//  main.js
import { createRestify } from '@binarcode/restifyjs';

createRestify('https://host.test/api/restify/restifyjs/setup')
```

In the configuration above, the `https://host.test/api/restify/restifyjs/setup` is the fully qualified url to your Laravel Restify based API.

Under the hood package will fetch the configurations from the server, so you don't have to worry about that. Next, you can import the `Restify` in any of yours project files. 

Here is what the package does when `createRestify` is called:

```js
import Restify from '@binarcode/restifyjs'
//...
const config = await fetch('https://host.test/api/restify/restifyjs/setup');

return Restify.init(config);
```

## Get repository

In Restify, every single resource you may have (`users`, `articles` etc.), are called `Repositories`.

Let's get the user repository, and perform some actions:

```js
// Any .vue or .js file
import Restify  from '@binarcode/restifyjs';

const userRepository = Restify.repository('users');

// List matches:
userRepository.matches()

// List related:
userRepository.related()

// List searchables:
userRepository.searchables()
```

## Auth:

```js
// Login:
Restify.login({
    email, password
});


// Register:
Restify.register({
    name, email, password, password_confirmation
});

// Forgot Password:
Restify.forgotPassword({
    email
});

// Reset Password:
Restify.resetPassword({
    email, token, password
})
```

## Repository calls:

```js
const usersRepository = Restify.repsitory('users');

// List:
usersRepository.get();

// Create:
usersRepository.store({
    first_name, last_name, email
});

// Update:
usersRepository.put({
    first_name
});

// Delete:
usersRepository.delete({
    id
});

// Custom:
const axios = usersRepository.request();

// This is a configured axios instance for the usersRepository:
axios.post(`actions?action=verify`, {
    repositories: 'all'
});

Under the hood it will call: `api/restify/users/actions?action=verify`
```
