"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config = function () {
    function Config(config) {
        _classCallCheck(this, Config);

        this.setConfig(config);
    }

    _createClass(Config, [{
        key: "setConfig",
        value: function setConfig(config) {
            this.config = config;

            return this;
        }
    }, {
        key: "uri",
        value: function uri() {
            var suffix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var base = this.config.domain + "/" + this.config.base;

            if (suffix) {
                return base + "/" + suffix;
            }

            return base;
        }
    }, {
        key: "baseUri",
        value: function baseUri() {
            var suffix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var base = "" + this.config.domain;

            if (suffix) {
                return base + "/" + suffix;
            }

            return base;
        }
    }], [{
        key: "make",
        value: function make(config) {
            return new this(config);
        }
    }]);

    return Config;
}();

exports.default = Config;