
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread5 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _asyncValidator = _interopRequireDefault(require("async-validator"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _classnames = _interopRequireDefault(require("classnames"));

var _set = _interopRequireDefault(require("lodash/set"));

var _get = _interopRequireDefault(require("lodash/get"));

var _FormContext = _interopRequireDefault(require("./FormContext"));

function createForm(WrappedForm) {
  var _class, _temp;

  //return WrappedForm => {
  return _temp = _class =
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
        formError: {},
        validatingFields: {},
        formValue: _this.props.formDefaultValue || {}
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "fields", []);
      return _this;
    }

    (0, _createClass2.default)(Form, [{
      key: "getRule",
      value: function getRule(name) {
        return this.props.rules[name] || null;
      }
    }, {
      key: "validateField",
      value: function validateField(name, cb) {
        var _this2 = this;

        var formError = this.state.formError;
        var rules = this.getRule(name);

        if (!rules || rules.length === 0) {
          if (cb instanceof Function) {
            cb(null);
          }

          return;
        }

        this.setState({
          validatingFields: (0, _objectSpread5.default)({}, validatingFields, (0, _defineProperty2.default)({}, name, true))
        });
        var descriptor = (0, _defineProperty2.default)({}, name, rules);
        var validator = new _asyncValidator.default(descriptor);
        var data = (0, _defineProperty2.default)({}, name, this.getValue(name));
        validator.validate(data, {
          firstFields: true
        }, function (errors) {
          _this2.setState({
            formError: (0, _objectSpread5.default)({}, formError, (0, _defineProperty2.default)({}, name, errors ? errors[0].message : null)),
            validatingFields: (0, _objectSpread5.default)({}, validatingFields, (0, _defineProperty2.default)({}, name, false))
          }, function () {
            if (cb instanceof Function) {
              cb(errors);
            }
          });
        });
      }
    }, {
      key: "addField",
      value: function addField(field) {
        this.fields.push(field);
      }
    }, {
      key: "removeField",
      value: function removeField(field) {
        var idx = this.fields.indexOf(field);

        if (idx !== -1) {
          this.fields.splice(idx, 1);
        }
      }
    }, {
      key: "getValue",
      value: function getValue(name) {
        var path2obj = this.props.path2obj;
        var formValue = this.state.formValue;

        if (path2obj) {
          return (0, _get.default)(formValue, name);
        }

        return formValue[name];
      }
    }, {
      key: "setValue",
      value: function setValue(name, value, event) {
        var _this$props = this.props,
            path2obj = _this$props.path2obj,
            onChange = _this$props.onChange;
        var formValue = this.state.formValue;
        var nextFormValue = (0, _objectSpread5.default)({}, formValue);

        if (path2obj) {
          (0, _set.default)(nextFormValue, name, value);
        } else {
          nextFormValue[name] = value;
        }

        if (!('formValue' in this.props)) {
          this.setState({
            formValue: nextFormValue
          });
        }

        if (onChange) {
          onChange(nextFormValue, event);
        }

        return this;
      }
    }, {
      key: "getError",
      value: function getError(name) {}
    }, {
      key: "isValidatingField",
      value: function isValidatingField(name) {
        var validatingFields = this.state.validatingFields;
        return !!validatingFields[name];
      }
    }, {
      key: "getFormContext",
      value: function getFormContext() {
        return {
          form: this
        };
      }
    }, {
      key: "render",
      value: function render() {
        return _react.default.createElement(_FormContext.default.Provider, {
          value: this.getFormContext()
        }, _react.default.createElement(WrappedForm, {
          form: this
        }));
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
  }(_react.default.Component), (0, _defineProperty2.default)(_class, "propTypes", {
    path2obj: _propTypes.default.bool,
    formDefaultValue: _propTypes.default.object,
    formValue: _propTypes.default.object,
    onChange: _propTypes.default.func,
    rules: _propTypes.default.object
  }), (0, _defineProperty2.default)(_class, "defaultProps", {
    path2obj: true,
    rules: {}
  }), _temp; //}
}

var _default = createForm;
exports.default = _default;