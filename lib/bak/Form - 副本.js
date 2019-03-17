
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _set = _interopRequireDefault(require("lodash/set"));

var _FormContext = _interopRequireDefault(require("./FormContext"));

var _FormValue = _interopRequireDefault(require("./FormValue"));

var Form =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Form, _React$Component);

  function Form() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Form);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Form)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      fields: [],
      formValue: _this.props.formDefaultValue || {}
    });
    return _this;
  }

  (0, _createClass2.default)(Form, [{
    key: "addField",
    value: function addField(field) {
      this.state.fields.push(field);
    }
  }, {
    key: "removeField",
    value: function removeField(field) {
      if (field.props.name) {
        this.state.fields.splice(this.state.fields.indexOf(field), 1);
      }
    }
  }, {
    key: "resetFields",
    value: function resetFields() {
      this.state.fields.forEach(function (field) {
        field.resetField();
      });
    }
  }, {
    key: "validate",
    value: function validate(callback) {
      var fields = this.state.fields;
      var valid = true;
      var count = 0;

      if (fields.length === 0 && callback) {
        callback(true);
        return;
      }

      fields.forEach(function (field) {
        field.validate('', function (errors) {
          if (errors) {
            valid = false;
          }

          if (typeof callback === 'function' && ++count === fields.length) {
            callback(valid);
          }
        });
      });
    }
  }, {
    key: "validateField",
    value: function validateField(name, cb) {
      var fields = this.state.fields;
      var field = fields.filter(function (field) {
        return field.props.name === name;
      })[0];

      if (!field) {
        throw new Error('must call validateField with valid name string!');
      }

      field.validate('', cb);
    }
  }, {
    key: "onFieldChange",
    value: function onFieldChange(name, value, event) {
      var onChange = this.props.onChange;
      var formValue = this.state.formValue;
      var nextFormValue = (0, _objectSpread2.default)({}, formValue);
      (0, _set.default)(nextFormValue, name, value);

      if (!('formValue' in this.props)) {
        this.setState({
          formValue: nextFormValue
        });
      }

      if (onChange) {
        onChange(nextFormValue, event);
      }
    }
  }, {
    key: "getFormContext",
    value: function getFormContext() {
      var rules = this.props.rules;
      return {
        form: this,
        rules: rules,
        addField: this.addField.bind(this),
        removeField: this.removeField.bind(this)
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          prefixCls = _this$props.prefixCls,
          style = _this$props.style,
          className = _this$props.className,
          onSubmit = _this$props.onSubmit,
          Component = _this$props.component,
          children = _this$props.children;
      return _react.default.createElement(_FormContext.default.Provider, {
        value: this.getFormContext()
      }, _react.default.createElement(Component, {
        style: style,
        className: (0, _classnames.default)(prefixCls, className),
        onSubmit: onSubmit
      }, children));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return {
        formValue: nextProps.formValue || prevState.formValue
      };
    }
  }]);
  return Form;
}(_react.default.Component);

exports.default = Form;
(0, _defineProperty2.default)(Form, "propTypes", {
  prefixCls: _propTypes.default.string,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  formDefaultValue: _propTypes.default.object,
  formValue: _propTypes.default.object,
  checkDelay: _propTypes.default.number,
  checkTrigger: _propTypes.default.string,
  //change blur none
  component: _propTypes.default.node,
  model: _propTypes.default.object,
  rules: _propTypes.default.object,
  labelPosition: _propTypes.default.oneOf(['right']),
  labelWidth: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  labelSuffix: _propTypes.default.string,
  inline: _propTypes.default.bool,
  onSubmit: _propTypes.default.func,
  onChange: _propTypes.default.func
});
(0, _defineProperty2.default)(Form, "defaultProps", {
  prefixCls: 'rw-form',
  className: '',
  style: {},
  component: 'form',
  labelPosition: 'right',
  labelSuffix: ''
});