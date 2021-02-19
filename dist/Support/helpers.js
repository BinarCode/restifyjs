'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.collect = collect;
exports.createRestify = createRestify;

var _axios = require('./axios');

var _axios2 = _interopRequireDefault(_axios);

var _Collection = require('./Collection');

var _Collection2 = _interopRequireDefault(_Collection);

var _Restify = require('../Restify');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function collect(items) {
    return _Collection2.default.make(items);
}

function createRestify(config) {
    if (typeof config === 'string') {
        return _axios2.default.get(config).then(function (response) {
            return _Restify.Singleton.init(response.data).mount(window);
        });
    }

    return _Restify.Singleton.init(config).mount(window);
}