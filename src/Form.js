import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import AsyncValidator from "async-validator";
import set from "lodash/set";
import get from "lodash/get";
import FormContext from "./FormContext";
import { isEmptyValue } from "./utils";

AsyncValidator.warning = function() {};

export default class Form extends React.Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,
        path2obj: PropTypes.bool,
        defaultFormValue: PropTypes.object,
        formValue: PropTypes.object,
        validators: PropTypes.object,
        validateDelay: PropTypes.number,
        validateTrigger: PropTypes.string, //change blur none
        component: PropTypes.node,
        rules: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array,
            PropTypes.func
        ]),
        labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        labelPosition: PropTypes.oneOf(["top", "left"]),
        alignItems: PropTypes.oneOf(["top", "center", "bottom"]),
        inline: PropTypes.bool,
        onSubmit: PropTypes.func,
        onChange: PropTypes.func,
        validateFieldsAndScroll: PropTypes.bool,
        showMessage: PropTypes.bool,
        getInputProps: PropTypes.func
    };

    static defaultProps = {
        prefixCls: "nex-form",
        className: "",
        style: {},
        rules: {},
        validators: {},
        path2obj: true,
        component: "form",
        validateDelay: 0,
        validateTrigger: "none",
        labelPosition: "left",
        alignItems: "center",
        inline: false,
        showMessage: true
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            formValue: nextProps.formValue || prevState.formValue
        };
    }

    fields = [];
    _valiateCb = [];

    state = {
        formError: {},
        validatingFields: {},
        formValue: this.props.defaultFormValue || {}
    };

    addField(field) {
        this.fields.push(field);
    }

    removeField(field) {
        var idx = this.fields.indexOf(field);
        if (idx !== -1) {
            this.fields.splice(idx, 1);
        }
    }

    getValue(name) {
        const path2obj = this.props.path2obj;
        const formValue = this.state.formValue;
        if (path2obj) {
            return get(formValue, name);
        }
        return formValue[name];
    }

    setValue(name, value, event, cb) {
        const { path2obj, onChange } = this.props;
        const formValue = this.state.formValue;

        const nextFormValue = {
            ...formValue
        };

        if (path2obj) {
            set(nextFormValue, name, value);
        } else {
            nextFormValue[name] = value;
        }

        if (!("formValue" in this.props)) {
            this.setState({
                formValue: nextFormValue
            });
        }

        if (onChange) {
            onChange(nextFormValue, event);
        }

        if (cb) {
            this._valiateCb.push(cb);
        }

        return this;
    }

    componentDidUpdate() {
        const formValue = this.state.formValue;
        const validateProcess = this._valiateCb;
        this._valiateCb = [];
        validateProcess.forEach(cb => {
            cb(formValue);
        });
    }

    componentWillUnmount() {
        this._valiateCb = [];
    }

    getError(name) {
        const { formError } = this.state;
        if (!arguments.length) return formError;
        return formError[name];
    }

    cleanErrors() {
        this.setState({
            validatingFields: {},
            formError: {}
        });
    }

    setErrors(errors) {
        const { formError } = this.state;
        this.setState({
            ...formError,
            ...errors
        });
    }

    getFieldValidator(name) {
        const fieldValidators = [];
        this.fields
            .filter(field => field.props.name === name)
            .forEach(field => {
                const fieldProps = field.props;
                if (fieldProps.required) {
                    fieldValidators.unshift(value => {
                        if (isEmptyValue(value)) {
                            return fieldProps.requiredMessage;
                        }
                    });
                }

                if (fieldProps.validator) {
                    fieldValidators.push(
                        ...(Array.isArray(fieldProps.validator)
                            ? fieldProps.validator
                            : [fieldProps.validator])
                    );
                }
            });

        const validator = this.props.validators[name];

        if (validator) {
            fieldValidators.push(
                ...(Array.isArray(validator) ? validator : [validator])
            );
        }

        return fieldValidators.filter(v => typeof v === "function");
    }

    getFieldRules(name) {
        const fieldRules = [];
        this.fields
            .filter(field => field.props.name === name)
            .forEach(field => {
                const fieldProps = field.props;
                let rules = fieldProps.rules || [];
                if (typeof rules === "function") {
                    rules = [
                        {
                            validator: rules
                        }
                    ];
                } else if (!Array.isArray(rules)) {
                    rules = [rules];
                }
                if (fieldProps.required) {
                    rules.unshift({
                        required: true
                    });
                }

                fieldRules.push(...rules);
            });

        let rules = this.props.rules[name] || [];
        if (rules) {
            if (typeof rules === "function") {
                rules = [
                    {
                        validator: rules
                    }
                ];
            } else if (!Array.isArray(rules)) {
                rules = [rules];
            }
        }

        return rules ? fieldRules.concat(rules) : fieldRules;
    }

    isValidatingField(name) {
        const validatingFields = this.state.validatingFields;
        return !!validatingFields[name];
    }

    _validateField(name, callback) {
        const value = this.getValue(name);
        const validators = this.getFieldValidator(name);

        const cb = (errors = null) => {
            if (errors === null && validators.length) {
                startCheck();
                return;
            }

            if (errors !== null) {
                if (!Array.isArray(errors)) {
                    errors = [errors];
                }

                errors = errors.map(error => {
                    let message = error;

                    if (error instanceof Error) {
                        message = error.message;
                    }

                    return {
                        name,
                        message
                    };
                });
            }

            if (typeof callback === "function") {
                callback(errors, value);
            }
        };

        const startCheck = () => {
            const validator = validators.shift();

            if (!validator) {
                return; //check finish
            }

            const ret = validator(value);
            if (ret === true) {
                cb();
            } else if (ret === false) {
                cb(`${name} fails`);
            } else if (ret && ret.then) {
                //thenable
                ret.then(() => cb(), e => cb(e));
            } else {
                cb(ret);
            }
        };

        startCheck();
    }

    validateField(name, callback) {
        const { formError, validatingFields } = this.state;
        //是否异步探测
        let isAsync = true;

        this._validateField(name, (errors, value) => {
            isAsync = false;

            this.setState(
                {
                    formError: {
                        ...formError,
                        [name]: errors ? errors[0].message : null
                    },
                    validatingFields: {
                        ...validatingFields,
                        [name]: false
                    }
                },
                () => {
                    if (typeof callback === "function") {
                        callback(errors, value);
                    }
                }
            );
        });

        if (isAsync) {
            this.setState({
                validatingFields: {
                    ...validatingFields,
                    [name]: true
                }
            });
        }
    }

    validate(callback) {
        const { formValue } = this.state;
        const fields = this.fields;
        const rules = {};

        if (fields.length === 0 && callback) {
            callback(null, formValue);
            return;
        }

        fields.forEach(field => {
            const name = field.props.name;
            if (!name || name in rules) return;
            const fieldRules = this.getFieldRules(name);
            if (fieldRules && fieldRules.length) {
                rules[name] = fieldRules;
            }
        });

        const validatingFields = {};

        const validator = new AsyncValidator(rules);
        const data = {};
        Object.keys(rules).forEach(key => {
            data[key] = get(formValue, key);
            validatingFields[key] = true;
        });

        this.setState({
            validatingFields
        });

        validator.validate(data, { firstFields: true }, errors => {
            const formError = {};
            if (errors) {
                errors.forEach(error => {
                    formError[error.field] = error.message;
                });
            }
            this.setState(
                {
                    formError,
                    validatingFields: {}
                },
                () => {
                    if (callback instanceof Function) {
                        callback(errors, formValue);
                    }
                }
            );
        });
    }

    validateAndScroll(callback) {
        this.validate((errors, formValue) => {
            if (errors) {
                let field;
                const formError = this.state.formError;
                const fields = this.fields;
                fields.forEach(f => {
                    const name = f.props.name;
                    if (!name) return;
                    if (!field && name in formError) {
                        field = f;
                    }
                });

                if (field) {
                    const dom = field.getDOM();

                    if (dom && dom.scrollIntoView) {
                        dom.scrollIntoView();
                    }
                }
            }

            callback(errors, formValue);
        });
    }

    onFieldChange(name, value) {
        const { formValue } = this.state;

        formValue.set(name, value);
    }

    getFormContext() {
        return {
            form: this
        };
    }

    render() {
        const {
            prefixCls,
            style,
            className,
            onSubmit,
            component: Component,
            children
        } = this.props;

        return (
            <FormContext.Provider value={this.getFormContext()}>
                <Component
                    style={style}
                    className={classnames(prefixCls, className)}
                    onSubmit={onSubmit}
                >
                    {typeof children === "function" ? children(this) : children}
                </Component>
            </FormContext.Provider>
        );
    }
}
