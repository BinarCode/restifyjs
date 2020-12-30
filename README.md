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

await createRestify('https://host.test/api/restify/restifyjs/setup')
```

In the configuration above, the `https://host.test/api/restify/restifyjs/setup` is the fully qualified url to your
Laravel Restify based API.

Under the hood package will fetch the configurations from the server, so you don't have to worry about that. Next, you
can import the `Restify` in any of yours project files.

Here is what the package does when `createRestify` is called:

```js
import Restify from '@binarcode/restifyjs'
//...
const config = await fetch('https://host.test/api/restify/restifyjs/setup');

return Restify.init(config);
```

The `createRestify` accept an object as well instead of the URL, so you can fetch the configuration using your
custom `axios` instance, and give the configuration object:

```js
const config = await axios.get('...');

createRestify(config);
```

After creating you call `createRestify`, the `Restify` singleton is available gloabally, however you can mount on your
own on window object using `mount`:

```js
createRestify(config).mount(window);
```

## Axios instance

RestifyJS has its own `axios` instance to made requests. However, you can use your own `axios` instance by using:

```js
Restify.useAxiosInstance(axiosInstance);
```

## Using in vue

This is the setup you can use in your `vue 3` application:

```js
import { createApp } from 'vue'
import App from './App.vue'
import axios from './utils/axios';
import { createRestify } from '@binarcode/restifyjs';

createRestify('http://restify-app.test/api/restify/restifyjs/setup').then(Restify => {
    Restify.useAxiosInstance(axios);

    createApp(App).mount('#app');
})
```

And this basic setup for the `vue 2`:

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from '@/modules/common/apiConfig'
import { createRestify } from '@binarcode/restifyjs';


createRestify('http://restify-app.test/api/restify/restifyjs/setup').then(Restify => {
    Restify.useAxiosInstance(axios);

    window.app = new Vue({
        router,
        render: h => h(App)
    }).$mount('#app')
})
```

## Get repository

In Restify, every single resource you may have (`users`, `articles` etc.), is called `Repository`.

You can list all available repositories keys using:

```js
Restify.repositoriesKeys();
```

You also have access to the repository collection using:

```js
Restify.getRepositories()
```

Let's get the user repository, and perform some actions:

```js
// Any .vue or .js file
import Restify from '@binarcode/restifyjs';

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

// (Optional) Verify user email:
// `userId` and `emailHash` will be send via email when `register` users if verification enabled.
Restify.verify(userId, emailHash)
```

Requests above returns a promise you can await.

## Repository calls:

```js
const usersRepository = Restify.repository('users');

// List with related posts:
await usersRepository.get({related: 'posts'});

// Show with related post:
await usersRepository.show(id, {related: 'posts'});

// Create:
await usersRepository.store({
    first_name, last_name, email
});

// Update:
await usersRepository.update(id, {
    first_name
});

// Delete:
await usersRepository.delete(id);
```

Sure enough you can perform these actions in a custom way. You can get the base repository url using: 

```js
usersRepository.uri('actions')
```

This will return you back the FQDN: 

`http://restify-app.test/api/restify/users/actions`

### Actions

Actions are the main feature to modify your resources. Let's assume you have a `Post`, and you have to publish it using the `itemAction`: 

```js
Restify.repository('posts').itemAction(id, 'publish');
```

Publish multiple posts `posts` using `action` instead of `itemAction`, but in this case you have to pass the list of ids you want this action to be performed:

```js
Restify.repository('posts').action('publish', {
    repositories: [1, 2, 3]
});
```

## Events

RestifyJS provides an event bus, so you can listen for some events.

The `error` event happens when any request fails with `500` status code:

```js
Restify.$on('error', message => console.warn(message));
```
