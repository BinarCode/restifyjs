'use strict';

var _Repository2 = require('./Repository');

var _Repository3 = _interopRequireDefault(_Repository2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResourceRepository = function (_Repository) {
  _inherits(ResourceRepository, _Repository);

  function ResourceRepository() {
    _classCallCheck(this, ResourceRepository);

    return _possibleConstructorReturn(this, (ResourceRepository.__proto__ || Object.getPrototypeOf(ResourceRepository)).apply(this, arguments));
  }

  return ResourceRepository;
}(_Repository3.default);