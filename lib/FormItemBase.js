
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _FormContext = _interopRequireDefault(require("./FormContext"));

var FormItemBase =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(FormItemBase, _React$Component);

  function FormItemBase(props) {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, FormItemBase);

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(FormItemBase)).call.apply(_getPrototypeOf2, [this, props].concat(args)));
    var form = _this.context.form;

    if (props.name) {
      form.addField((0, _assertThisInitialized2.default)(_this));
    }

    return _this;
  }

  (0, _createClass2.default)(FormItemBase, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var form = this.context.form;
      form.removeField(this);
    }
  }, {
    key: "isRequired",
    value: function isRequired() {
      var form = this.context.form;
      var name = this.props.name;
      var rules = form.getFieldRules(name);
      var isRequired = false;

      if (rules && rules.length) {
        isRequired = rules.some(function (rule) {
          return rule.required;
        });
      }

      return isRequired;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      var name = this.props.name;
      var form = this.context.form;
      return form.getValue(name);
    }
  }, {
    key: "onFieldChange",
    value: function onFieldChange(value, e) {}
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return FormItemBase;
}(_react.default.Component);

exports.default = FormItemBase;
(0, _defineProperty2.default)(FormItemBase, "contextType", _FormContext.default);
(0, _defineProperty2.default)(FormItemBase, "propTypes", {
  name: _propTypes.default.string,
  rules: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array, _propTypes.default.func]),
  required: _propTypes.default.bool
});
(0, _defineProperty2.default)(FormItemBase, "defaultProps", {});