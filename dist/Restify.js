'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Singleton = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Bus = require('./Support/Bus');

var _Bus2 = _interopRequireDefault(_Bus);

var _Config = require('./Dto/Config');

var _Config2 = _interopRequireDefault(_Config);

var _axios = require('./Support/axios');

var _axios2 = _interopRequireDefault(_axios);

var _RepositoriesCollection = require('./Support/RepositoriesCollection');

var _RepositoriesCollection2 = _interopRequireDefault(_RepositoriesCollection);

var _Auth = require('./Services/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Restify = function () {
    function Restify(api) {
        _classCallCheck(this, Restify);

        if (api) {
            this.init(api);
        }

        this.bus = new _Bus2.default();
    }

    _createClass(Restify, [{
        key: 'init',
        value: function init(apiData) {
            return this.setConfig(apiData.config).setRepositories(apiData.repositories).mount(window);
        }
    }, {
        key: 'setConfig',
        value: function setConfig(config) {
            this.config = _Config2.default.make(config);

            return this;
        }
    }, {
        key: 'setRepositories',
        value: function setRepositories(repositories) {
            if (!Array.isArray(repositories)) {
                throw new Error('Repositories should be an array.');
            }

            this.repositories = _RepositoriesCollection2.default.make(repositories).mapIntoRepositories().setRequest(this.request).setConfig(this.config);

            return this;
        }
    }, {
        key: 'repository',
        value: function repository(key) {
            var repository = this.repositories.first(function (item) {
                return item.uriKey === key;
            });

            if (!repository) {
                throw new Error('404 Not found repository "' + key + '"');
            }

            return repository;
        }
    }, {
        key: 'mount',
        value: function mount(scope) {
            scope.Restify = this;

            return this;
        }
    }, {
        key: 'uri',
        value: function uri() {
            var suffix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            return this.config.uri(suffix);
        }
    }, {
        key: '$emit',
        value: function $emit(name, data) {
            this.bus.$emit(name, data);

            return this;
        }
    }, {
        key: '$on',
        value: function $on(name, listener) {
            this.bus.$on(name, listener);

            return this;
        }
    }, {
        key: 'useAxiosInstance',
        value: function useAxiosInstance(axios) {
            this.axios = axios;

            return this;
        }
    }, {
        key: 'request',
        value: function request(options) {
            if (this.axios) {
                return options ? this.axios(options) : this.axios;
            }

            if (options !== undefined) {
                return (0, _axios2.default)(options);
            }

            return _axios2.default;
        }
    }, {
        key: 'getRepositories',
        value: function getRepositories() {
            return this.repositories;
        }
    }, {
        key: 'repositoriesKeys',
        value: function repositoriesKeys() {
            return this.getRepositories().map(function (item) {
                return item.uriKey;
            });
        }
    }], [{
        key: 'make',
        value: function make(apiData) {
            return new this(apiData);
        }
    }]);

    return Restify;
}();

Object.assign(Restify.prototype, _Auth2.default);

var Singleton = exports.Singleton = new Restify();

exports.default = Restify;