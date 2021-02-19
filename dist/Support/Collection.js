'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Collection = function () {
    function Collection(items) {
        _classCallCheck(this, Collection);

        this.items = this.getArrayableItems(items);
    }

    _createClass(Collection, [{
        key: 'firstWhere',
        value: function firstWhere(property) {
            var operator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
            var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

            return this.first(function (item) {
                // Assuming that property is value in this case.
                if (operator === undefined && value === undefined) {
                    if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item.hasOwnProperty(property)) {
                        return item[property] === property;
                    }

                    return item === property;
                }

                // Assuming that operator is value in this case.
                if (operator !== undefined && value === undefined) {
                    if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item.hasOwnProperty(property)) {
                        return item[property] === operator;
                    }
                }

                var retrieved = void 0;

                if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item.hasOwnProperty(property)) {
                    retrieved = item[property];
                } else {
                    retrieved = value;
                }

                switch (operator) {
                    default:
                    case '=':
                    case '==':
                        return retrieved == value;
                    case '!=':
                    case '<>':
                        return retrieved != value;
                    case '<':
                        return retrieved < value;
                    case '>':
                        return retrieved > value;
                    case '<=':
                        return retrieved <= value;
                    case '>=':
                        return retrieved >= value;
                    case '===':
                        return retrieved === value;
                    case '!==':
                        return retrieved !== value;
                }
            });
        }
    }, {
        key: 'first',
        value: function first(callback) {
            var $default = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if (typeof callback !== 'function') {
                if (Array.isArray(this.items) && this.items.length) {
                    return this.items[0];
                }

                return $default;
            }

            var items = this.items.filter(function (item) {
                return callback(item);
            });

            if (items.length) {
                return items[0];
            }

            return $default;
        }
    }, {
        key: 'getArrayableItems',
        value: function getArrayableItems(items) {
            if (!items) {
                return [];
            }

            if (Array.isArray(items)) {
                return items;
            }

            return [items];
        }
    }, {
        key: 'count',
        value: function count() {
            return this.items.length || 0;
        }
    }, {
        key: 'map',
        value: function map(callable) {
            return this.items.map(function (item) {
                return callable(item);
            });
        }
    }, {
        key: 'mapInto',
        value: function mapInto($class) {
            return new this.constructor(this.map(function (item) {
                return new $class(item);
            }));
        }
    }, {
        key: 'all',
        value: function all() {
            return this.items;
        }
    }], [{
        key: 'make',
        value: function make(items) {
            return new this(items);
        }
    }]);

    return Collection;
}();

exports.default = Collection;