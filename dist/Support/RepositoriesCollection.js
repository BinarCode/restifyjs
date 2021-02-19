'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Collection2 = require('./Collection');

var _Collection3 = _interopRequireDefault(_Collection2);

var _Repository = require('../Repository/Repository');

var _Repository2 = _interopRequireDefault(_Repository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RepositoriesCollection = function (_Collection) {
    _inherits(RepositoriesCollection, _Collection);

    function RepositoriesCollection() {
        _classCallCheck(this, RepositoriesCollection);

        return _possibleConstructorReturn(this, (RepositoriesCollection.__proto__ || Object.getPrototypeOf(RepositoriesCollection)).apply(this, arguments));
    }

    _createClass(RepositoriesCollection, [{
        key: 'mapIntoRepositories',
        value: function mapIntoRepositories() {
            return this.mapInto(_Repository2.default);
        }
    }, {
        key: 'setConfig',
        value: function setConfig(config) {
            this.map(function (item) {
                return item.setConfig(config);
            });

            return this;
        }
    }, {
        key: 'setRequest',
        value: function setRequest(request) {
            this.map(function (item) {
                return item.setRequest(request);
            });

            return this;
        }
    }]);

    return RepositoriesCollection;
}(_Collection3.default);

exports.default = RepositoriesCollection;