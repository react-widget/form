
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _parseInt2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/parse-int"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _asyncValidator = _interopRequireDefault(require("async-validator"));

var FormItem =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(FormItem, _React$Component);
  (0, _createClass2.default)(FormItem, [{
    key: "style",
    value: function style() {
      return this.props.style || [];
    }
  }, {
    key: "classNames",
    value: function classNames() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (0, _classnames.default)(args);
    }
  }, {
    key: "className",
    value: function className() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return this.classNames.apply(this, args.concat([this.props.className]));
    }
  }]);

  function FormItem(props) {
    var _this;

    (0, _classCallCheck2.default)(this, FormItem);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FormItem).call(this, props));
    _this.state = {
      error: '',
      valid: false,
      validating: false
    };
    return _this;
  }

  (0, _createClass2.default)(FormItem, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        form: this
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var name = this.props.name;

      if (name) {
        this.parent().addField(this);
        this.initialValue = this.getInitialValue();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.parent().removeField(this);
    }
  }, {
    key: "parent",
    value: function parent() {
      return this.context.component;
    }
  }, {
    key: "isRequired",
    value: function isRequired() {
      var rules = this.getRules();
      var isRequired = false;

      if (rules && rules.length) {
        rules.every(function (rule) {
          if (rule.required) {
            isRequired = true;
            return false;
          }

          return true;
        });
      }

      return isRequired;
    }
  }, {
    key: "onFieldBlur",
    value: function onFieldBlur() {
      this.validate('blur');
    }
  }, {
    key: "onFieldChange",
    value: function onFieldChange() {
      var _this2 = this;

      if (this.validateDisabled) {
        this.validateDisabled = false;
        return;
      }

      setTimeout(function () {
        _this2.validate('change');
      });
    }
  }, {
    key: "validate",
    value: function validate(trigger, cb) {
      var _this3 = this;

      var rules = this.getFilteredRule(trigger);

      if (!rules || rules.length === 0) {
        if (cb instanceof Function) {
          cb();
        }

        return true;
      }

      this.setState({
        validating: true
      });
      var descriptor = (0, _defineProperty2.default)({}, this.props.name, rules);
      var validator = new _asyncValidator.default(descriptor);
      var model = (0, _defineProperty2.default)({}, this.props.name, this.fieldValue());
      validator.validate(model, {
        firstFields: true
      }, function (errors) {
        _this3.setState({
          error: errors ? errors[0].message : '',
          validating: false,
          valid: !errors
        }, function () {
          if (cb instanceof Function) {
            cb(errors);
          }
        });
      });
    }
  }, {
    key: "getInitialValue",
    value: function getInitialValue() {
      var value = this.parent().props.model[this.props.name];

      if (value === undefined) {
        return value;
      } else {
        return JSON.parse((0, _stringify.default)(value));
      }
    }
  }, {
    key: "resetField",
    value: function resetField() {
      var _this$state = this.state,
          valid = _this$state.valid,
          error = _this$state.error;
      valid = true;
      error = '';
      this.setState({
        valid: valid,
        error: error
      });
      var value = this.fieldValue();

      if ((0, _isArray.default)(value) && value.length > 0) {
        this.validateDisabled = true;
        this.parent().props.model[this.props.name] = [];
      } else if (value) {
        this.validateDisabled = true;
        this.parent().props.model[this.props.name] = this.initialValue;
      }
    }
  }, {
    key: "getRules",
    value: function getRules() {
      var formRules = this.parent().props.rules;
      var selfRuels = this.props.rules;
      formRules = formRules ? formRules[this.props.name] : [];
      return [].concat(selfRuels || formRules || []);
    }
  }, {
    key: "getFilteredRule",
    value: function getFilteredRule(trigger) {
      var rules = this.getRules();
      return rules.filter(function (rule) {
        return !rule.trigger || rule.trigger.indexOf(trigger) !== -1;
      });
    }
  }, {
    key: "labelStyle",
    value: function labelStyle() {
      var ret = {};
      if (this.parent().props.labelPosition === 'top') return ret;
      var labelWidth = this.props.labelWidth || this.parent().props.labelWidth;

      if (labelWidth) {
        ret.width = (0, _parseInt2.default)(labelWidth);
      }

      return ret;
    }
  }, {
    key: "contentStyle",
    value: function contentStyle() {
      var ret = {};
      if (this.parent().props.labelPosition === 'top' || this.parent().props.inline) return ret;
      var labelWidth = this.props.labelWidth || this.parent().props.labelWidth;

      if (labelWidth) {
        ret.marginLeft = (0, _parseInt2.default)(labelWidth);
      }

      return ret;
    }
  }, {
    key: "fieldValue",
    value: function fieldValue() {
      var model = this.parent().props.model;

      if (!model || !this.props.name) {
        return;
      }

      return model[this.props.name];
    }
  }, {
    key: "render",
    value: function render() {
      var _this$className;

      var _this$state2 = this.state,
          error = _this$state2.error,
          validating = _this$state2.validating;
      var _this$props = this.props,
          label = _this$props.label,
          required = _this$props.required,
          className = _this$props.className;

      var children = _react.default.Children.only(this.props.children);

      var _children$props = children.props,
          _onChange = _children$props.onChange,
          _onBlur = _children$props.onBlur;
      var onFieldChange = this.onFieldChange.bind(this);
      var onFieldBlur = this.onFieldBlur.bind(this);
      return _react.default.createElement("div", {
        style: this.style(),
        className: this.className('nex-form-item', (_this$className = {}, (0, _defineProperty2.default)(_this$className, "".concat(className), className), (0, _defineProperty2.default)(_this$className, 'is-error', error !== ''), (0, _defineProperty2.default)(_this$className, 'is-validating', validating), (0, _defineProperty2.default)(_this$className, 'is-required', this.isRequired() || required), _this$className))
      }, label && _react.default.createElement("label", {
        className: "nex-form-item-label",
        style: this.labelStyle()
      }, label + this.parent().props.labelSuffix), _react.default.createElement("div", {
        className: "nex-form-inner-wrapper",
        style: this.contentStyle()
      }, _react.default.cloneElement(children, {
        onChange: function onChange() {
          for (var _len3 = arguments.length, a = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            a[_key3] = arguments[_key3];
          }

          _onChange && _onChange.call.apply(_onChange, [this].concat(a));
          onFieldChange.apply(void 0, a);
        },
        onBlur: function onBlur() {
          for (var _len4 = arguments.length, a = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            a[_key4] = arguments[_key4];
          }

          _onBlur && _onBlur.call.apply(_onBlur, [this].concat(a));
          onFieldBlur.apply(void 0, a);
        }
      }), error && _react.default.createElement("div", {
        className: "nex-form-item-error"
      }, error)));
    }
  }]);
  return FormItem;
}(_react.default.Component);

exports.default = FormItem;
(0, _defineProperty2.default)(FormItem, "contextTypes", {
  component: _propTypes.default.any
});
(0, _defineProperty2.default)(FormItem, "childContextTypes", {
  form: _propTypes.default.any
});
(0, _defineProperty2.default)(FormItem, "propTypes", {
  label: _propTypes.default.string,
  labelWidth: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  name: _propTypes.default.string,
  required: _propTypes.default.bool,
  rules: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array])
});