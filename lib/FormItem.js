
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

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

  function FormItem() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, FormItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(FormItem)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "saveDOM", function (dom) {
      _this._dom = dom;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_validateTimer", null);
    return _this;
  }

  (0, _createClass2.default)(FormItem, [{
    key: "getDOM",
    value: function getDOM() {
      return this._dom;
    }
  }, {
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

      if (validateTrigger === 'blur') {
        if (validateDelay > 0) {
          if (this._validateTimer) clearTimeout(this._validateTimer);
          this._validateTimer = setTimeout(function () {
            form.validateField(name);
          }, validateDelay);
        } else {
          form.validateField(name);
        }
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
      var _this2 = this;

      var form = this.context.form;
      var name = this.props.name;
      form.setValue(name, value, e, function () {
        var validateTrigger = _this2.getValidateTrigger();

        var validateDelay = _this2.getValidateDelay();

        if (validateTrigger === 'change') {
          if (validateDelay > 0) {
            if (_this2._validateTimer) clearTimeout(_this2._validateTimer);
            _this2._validateTimer = setTimeout(function () {
              form.validateField(name);
            }, validateDelay);
          } else {
            form.validateField(name);
          }
        }
      });
    }
  }, {
    key: "getLabelProps",
    value: function getLabelProps() {
      var form = this.context.form;
      var formProps = form.props;
      var props = this.props;
      return {
        inline: 'inline' in props ? props.inline : formProps.inline,
        labelPosition: 'labelPosition' in props ? props.labelPosition : formProps.labelPosition,
        labelWidth: 'labelWidth' in props ? props.labelWidth : formProps.labelWidth,
        alignItems: 'alignItems' in props ? props.alignItems : formProps.alignItems,
        showMessage: 'showMessage' in props ? props.showMessage : formProps.showMessage
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var form = this.context.form;
      var _this$props = this.props,
          normalize = _this$props.normalize,
          label = _this$props.label,
          required = _this$props.required,
          labelFor = _this$props.labelFor,
          className = _this$props.className,
          prefixCls = _this$props.prefixCls,
          name = _this$props.name,
          help = _this$props.help;

      var _this$getLabelProps = this.getLabelProps(),
          inline = _this$getLabelProps.inline,
          labelPosition = _this$getLabelProps.labelPosition,
          labelWidth = _this$getLabelProps.labelWidth,
          alignItems = _this$getLabelProps.alignItems,
          showMessage = _this$getLabelProps.showMessage;

      var error = form.getError(name);
      var validating = form.isValidatingField(name);

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
        ref: this.saveDOM,
        className: (0, _classnames2.default)(prefixCls, (_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-inline"), inline), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-position-").concat(labelPosition), labelPosition), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-align-items-").concat(alignItems), alignItems !== 'center'), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-error"), error), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-validating"), validating), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-required"), this.isRequired() || required), (0, _defineProperty2.default)(_classnames, "".concat(prefixCls, "-with-help"), help), (0, _defineProperty2.default)(_classnames, "".concat(className), className), _classnames))
      }, label && _react.default.createElement("label", {
        htmlFor: labelFor,
        className: "".concat(prefixCls, "-label"),
        style: {
          width: labelWidth
        }
      }, label), _react.default.createElement("div", {
        className: "".concat(prefixCls, "-content")
      }, InputComponent, !help && showMessage && error ? _react.default.createElement("div", {
        className: "".concat(prefixCls, "-error-tip")
      }, error) : null, help ? _react.default.createElement("div", {
        className: "".concat(prefixCls, "-help")
      }, help) : null));
    }
  }]);
  return FormItem;
}(_react.default.Component);

exports.default = FormItem;
(0, _defineProperty2.default)(FormItem, "contextType", _FormContext.default);
(0, _defineProperty2.default)(FormItem, "propTypes", {
  label: _propTypes.default.string,
  labelFor: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  labelWidth: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  labelPosition: _propTypes.default.oneOf(['top', 'left', 'right']),
  alignItems: _propTypes.default.oneOf(['top', 'center', 'bottom']),
  name: _propTypes.default.string,
  rules: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array, _propTypes.default.func]),
  required: _propTypes.default.bool,
  normalize: _propTypes.default.func,
  validateDelay: _propTypes.default.number,
  validateTrigger: _propTypes.default.string,
  //change blur none
  inline: _propTypes.default.bool,
  showMessage: _propTypes.default.bool,
  help: _propTypes.default.node //extra: PropTypes.node,

});
(0, _defineProperty2.default)(FormItem, "defaultProps", {
  prefixCls: 'rw-form-item' // labelPosition: 'left',
  // alignItems: "center",
  // inline: false,
  //showMessage: true,

});