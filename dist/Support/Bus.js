"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bus = function () {
    function Bus() {
        _classCallCheck(this, Bus);

        this._events = {};
    }

    _createClass(Bus, [{
        key: "$on",
        value: function $on(name, listener) {
            if (!this._events[name]) {
                this._events[name] = [];
            }

            this._events[name].push(listener);
        }
    }, {
        key: "removeListener",
        value: function removeListener(name, listenerToRemove) {
            if (!this._events[name]) {
                throw new Error("Can't remove a listener. Event \"" + name + "\" doesn't exits.");
            }

            var filterListeners = function filterListeners(listener) {
                return listener !== listenerToRemove;
            };

            this._events[name] = this._events[name].filter(filterListeners);
        }
    }, {
        key: "$emit",
        value: function $emit(name, data) {
            if (!this._events[name]) {
                throw new Error("Can't $emit an event. Event \"" + name + "\" doesn't exits.");
            }

            var fireCallbacks = function fireCallbacks(callback) {
                callback(data);
            };

            this._events[name].forEach(fireCallbacks);
        }
    }]);

    return Bus;
}();

exports.default = Bus;