'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instance = _axios2.default.create();

instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    var status = error.response.status;

    // Show the user a 500 error

    if (status >= 500) {
        Restify.$emit('error', error.response.data.message);
    }

    // Handle Token Timeouts
    if (status === 419) {
        Restify.$emit('token-expired');
    }

    return Promise.reject(error);
});

exports.default = instance;