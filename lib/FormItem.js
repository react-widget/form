
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _parseInt2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/parse-int"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _FormContext = _interopRequireDefault(require("./FormContext"));

var FormItem =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(FormItem, _React$Component);

  function FormItem(props) {
    var _this;

    (0, _classCallCheck2.default)(this, FormItem);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FormItem).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_validateTimer", null);
    _this.state = {
      error: '',
      valid: false,
      validating: false
    };
    return _this;
  }

  (0, _createClass2.default)(FormItem, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var form = this.context.form;
      var name = this.props.name;

      if (name) {
        form.addField(this);
      }
    }
  }, {
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
      var rules = form.getRule(name);
      var isRequired = false;

      if (rules && rules.length) {
        isRequired = rules.some(function (rule) {
          return rule.required;
        });
      }

      return isRequired;
    }
  }, {
    key: "getValidateTrigger",
    value: function getValidateTrigger() {
      var form = this.context.form;
      var validateTrigger = form.props.validateTrigger;
      var props = this.props;
      return 'validateTrigger' in props ? props.validateTrigger : validateTrigger;
    }
  }, {
    key: "getValidateDelay",
    value: function getValidateDelay() {
      var form = this.context.form;
      var validateDelay = form.props.validateDelay;
      var props = this.props;
      return 'validateDelay' in props ? props.validateDelay : validateDelay;
    }
  }, {
    key: "onFieldBlur",
    value: function onFieldBlur() {
      var form = this.context.form;
      var validateTrigger = this.getValidateTrigger();
      var validateDelay = this.getValidateDelay();
      var name = this.props.name;

      if (validateTrigger === 'blur' && validateDelay > 0) {
        if (this._validateTimer) clearTimeout(this._validateTimer);
        this._validateTimer = setTimeout(function () {
          form.validateField(name);
        }, validateDelay);
      }
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
    value: function onFieldChange(value, e) {
      var form = this.context.form;
      var validateTrigger = this.getValidateTrigger();
      var validateDelay = this.getValidateDelay();
      var name = this.props.name;
      form.setValue(name, value, e);

      if (validateTrigger === 'change' && validateDelay > 0) {
        if (this._validateTimer) clearTimeout(this._validateTimer);
        this._validateTimer = setTimeout(function () {
          form.validateField(name);
        }, validateDelay);
      }
    }
  }, {
    key: "labelStyle",
    value: function labelStyle() {
      var ret = {}; // if (this.parent().props.labelPosition === 'top') return ret;

      var labelWidth = this.props.labelWidth; //|| this.parent().props.labelWidth;

      if (labelWidth) {
        ret.width = (0, _parseInt2.default)(labelWidth);
      }

      return ret;
    }
  }, {
    key: "contentStyle",
    value: function contentStyle() {
      var ret = {}; //    if (this.parent().props.labelPosition === 'top' || this.parent().props.inline) return ret;

      var labelWidth = this.props.labelWidth; // || this.parent().props.labelWidth;

      if (labelWidth) {
        ret.marginLeft = (0, _parseInt2.default)(labelWidth);
      }

      return ret;
    }
  }, {
    key: "fieldValue",
    value: function fieldValue() {
      var model = this.context.model; //const model = this.parent().props.model;

      if (!model || !this.props.name) {
        return;
      }

      return model[this.props.name];
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var form = this.context.form;
      var validating = this.state.validating;
      var _this$props = this.props,
          normalize = _this$props.normalize,
          label = _this$props.label,
          required = _this$props.required,
          className = _this$props.className,
          prefixCls = _this$props.prefixCls,
          name = _this$props.name;
      var error = form.getError(name);

      var children = _react.default.Children.only(this.props.children);

      var _children$props = children.props,
          _onChange = _children$props.onChange,
          _onBlur = _children$props.onBlur;
      var onFieldChange = this.onFieldChange.bind(this);
      var onFieldBlur = this.onFieldBlur.bind(this);

      var InputComponent = _react.default.cloneElement(children, {
        value: this.getValue(),
        onChange: function onChange(value, event) {
          if (normalize) {
            value = normalize(value);
          }

          _onChange && _onChange(value, event);
          onFieldChange(value, event);
        },
        onBlur: function onBlur(e) {
          _onBlur && _onBlur(e);
          onFieldBlur(e);
        }
      });

      return _react.default.createElement("div", {
        className: (0, _classnames2.default)(prefixCls, (_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(className), className), (0, _defineProperty2.default)(_classnames, 'is-error', error), (0, _defineProperty2.default)(_classnames, 'is-validating', validating), (0, _defineProperty2.default)(_classnames, 'is-required', this.isRequired() || required), _classnames))
      }, label && _react.default.createElement("label", {
        className: "".concat(prefixCls, "-label")
      }, label), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-content"),
        style: this.contentStyle()
      }, InputComponent, error && _react.default.createElement("div", {
        className: "".concat(prefixCls, "-error-tip")
      }, error)));
    }
  }]);
  return FormItem;
}(_react.default.Component);

exports.default = FormItem;
(0, _defineProperty2.default)(FormItem, "contextType", _FormContext.default);
(0, _defineProperty2.default)(FormItem, "propTypes", {
  label: _propTypes.default.string,
  labelWidth: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  name: _propTypes.default.string,
  //required: PropTypes.bool,
  //rules: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  normalize: _propTypes.default.func,
  validateDelay: _propTypes.default.number,
  validateTrigger: _propTypes.default.string //change blur none

});
(0, _defineProperty2.default)(FormItem, "defaultProps", {
  prefixCls: 'rw-form-item'
});