'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('../Support/helpers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Repository = function () {
    function Repository(definition) {
        _classCallCheck(this, Repository);

        this.$sort = [];
        this.$search = [];
        this.$match = [];
        this.$related = [];
        this.$actions = [];

        if (typeof definition === 'string') {
            return this.uriKey = definition;
        }

        if ((typeof definition === 'undefined' ? 'undefined' : _typeof(definition)) === 'object') {
            if (!definition.hasOwnProperty('uriKey')) {
                throw new Error('Invalid repository definition.');
            }

            return this.setUriKey(definition.uriKey).setName(definition.name).setSorts(definition.sort).setMatches(definition.match).setRelated(definition.related).setSearcheables(definition.searchables).setActions(definition.actions);
        }
    }

    _createClass(Repository, [{
        key: 'setUriKey',
        value: function setUriKey(uriKey) {
            this.uriKey = uriKey;

            return this;
        }
    }, {
        key: 'setName',
        value: function setName(name) {
            this.name = name;

            return this;
        }
    }, {
        key: 'setConfig',
        value: function setConfig(config) {
            this.config = config;

            return this;
        }
    }, {
        key: 'setRequest',
        value: function setRequest(request) {
            this.request = request;

            return this;
        }
    }, {
        key: 'sorts',
        value: function sorts() {
            return this.$sort || [];
        }
    }, {
        key: 'matches',
        value: function matches() {
            return this.$match || [];
        }
    }, {
        key: 'searchables',
        value: function searchables() {
            return this.$search || [];
        }
    }, {
        key: 'related',
        value: function related() {
            var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            return this.$related || [];
        }
    }, {
        key: 'setSorts',
        value: function setSorts(sort) {
            this.$sort = sort;

            return this;
        }
    }, {
        key: 'setMatches',
        value: function setMatches(match) {
            this.$match = match;

            return this;
        }
    }, {
        key: 'setSearcheables',
        value: function setSearcheables(search) {
            this.$search = search;

            return this;
        }
    }, {
        key: 'setActions',
        value: function setActions(actions) {
            this.$actions = actions;

            return this;
        }
    }, {
        key: 'setRelated',
        value: function setRelated(related) {
            this.$related = related;

            return this;
        }
    }, {
        key: 'uri',
        value: function uri() {
            var suffix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            return this.config.uri(suffix ? this.uriKey + '/' + suffix : this.uriKey);
        }
    }, {
        key: 'get',
        value: function get() {
            var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return Restify.request().get(this.uri(), {
                params: query
            });
        }
    }, {
        key: 'show',
        value: function show(key) {
            var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return Restify.request().get(this.uri(key), {
                params: query
            });
        }
    }, {
        key: 'store',
        value: function store(data) {
            return Restify.request().post(this.uri(), data);
        }
    }, {
        key: 'update',
        value: function update(key, data) {
            return Restify.request().post(this.uri(key), data);
        }
    }, {
        key: 'delete',
        value: function _delete(key) {
            return Restify.request().delete(this.uri(key));
        }
    }, {
        key: 'itemAction',
        value: function itemAction(id, key, data) {
            return Restify.request().post(this.uri(id + '/actions?action=' + key), data);
        }
    }, {
        key: 'action',
        value: function action(key, data) {
            var action = this.getAction(key);

            if (!action) {
                throw new Error('Action ' + key + ' is not defined.');
            }

            return Restify.request().post(this.uri('actions?action=' + key), data);
        }
    }, {
        key: 'getAction',
        value: function getAction(key) {
            if (key) {
                return (0, _helpers.collect)(this.$actions).firstWhere('uriKey', key);
            }

            return this.$actions;
        }
    }], [{
        key: 'make',
        value: function make(item) {
            return new this(item);
        }
    }]);

    return Repository;
}();

exports.default = Repository;