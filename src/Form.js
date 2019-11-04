import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import set from "lodash/set";
import get from "lodash/get";
import FormContext from "./FormContext";
import { isEmptyValue } from "./utils";

function noop() {}

class Form extends React.Component {
    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            formValue: nextProps.formValue || prevState.formValue
        };
    }

    //异步校验加乐观锁
    fieldLockId = 1;
    formLockId = 1;

    fields = [];
    _validateCb = [];

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
            const name = field.props.name;

            this.state.formError[name] = null;

            this.fields.splice(idx, 1);
        }
    }

    getValue(name) {
        const { getDefaultFieldValue } = this.props;
        const path2obj = this.props.path2obj;
        const formValue = this.state.formValue;

        const value = path2obj ? get(formValue, name) : formValue[name];

        return value === undefined && getDefaultFieldValue
            ? getDefaultFieldValue(name)
            : value;
    }

    setValue(name, value, cb) {
        const { path2obj, onChange } = this.props;
        const formValue = this.state.formValue;

        // TODO: 后面再考虑下特殊场景
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
            onChange(nextFormValue);
        }

        if (cb) {
            this._validateCb.push(cb);
        }
    }

    setValues(obj = {}, cb) {
        const { path2obj, onChange } = this.props;
        const formValue = this.state.formValue;

        const nextFormValue = {
            ...formValue
        };

        Object.keys(obj).forEach(name => {
            const value = obj[name];
            if (path2obj) {
                set(nextFormValue, name, value);
            } else {
                nextFormValue[name] = value;
            }
        });

        if (!("formValue" in this.props)) {
            this.setState({
                formValue: nextFormValue
            });
        }

        if (onChange) {
            onChange(nextFormValue);
        }

        if (cb) {
            this._validateCb.push(cb);
        }
    }

    componentDidUpdate() {
        const formValue = this.state.formValue;
        const validateProcess = this._validateCb;
        this._validateCb = [];
        validateProcess.forEach(cb => {
            cb(formValue);
        });
    }

    componentWillUnmount() {
        this._validateCb = [];
    }

    hasError(name) {
        const { formError } = this.state;

        return formError[name] != null; // null or undefined
    }

    getError(name) {
        const { formError } = this.state;
        return formError[name];
    }

    cleanError(name) {
        const { formError } = this.state;

        if (!this.hasError(name)) {
            return;
        }

        this.setState({
            formError: {
                ...formError,
                [name]: null
            }
        });
    }

    setError(name, message) {
        const { formError } = this.state;
        this.setState({
            formError: {
                ...formError,
                [name]: message
            }
        });
    }

    cleanErrors() {
        this.setState({
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

    getFieldValidatorList(name) {
        const fieldValidators = [];
        this.fields
            .filter(field => field.props.name === name)
            .forEach(field => {
                const fieldProps = field.props;
                if (fieldProps.required) {
                    fieldValidators.unshift(value => {
                        if (isEmptyValue(value)) {
                            return fieldProps.requiredMessage == null
                                ? `${name} check fail`
                                : fieldProps.requiredMessage;
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

    isFieldValidating(name) {
        const validatingFields = this.state.validatingFields;
        return !!validatingFields[name];
    }

    isValidating() {
        const validatingFields = this.state.validatingFields;
        return Object.keys(validatingFields).some(key => validatingFields[key]);
    }

    _validateField(name, callback, triggerType = "none") {
        callback = typeof callback === "function" ? callback : noop;
        const { formValue } = this.state;
        const value = this.getValue(name);
        const validators = this.getFieldValidatorList(name);

        if (!validators.length) {
            callback(null, value);
            return;
        }

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

            callback(errors, value);
        };

        //串行校验
        const startCheck = () => {
            const validator = validators.shift();

            if (!validator) {
                return; //check finish
            }

            const ret = validator(value, formValue, triggerType);
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

    validateField(name, callback, triggerType) {
        callback = typeof callback === "function" ? callback : noop;

        const { asyncTestDelay } = this.props;
        const { formError, validatingFields } = this.state;
        const lockId = ++this.fieldLockId;

        //是否异步探测
        let asyncTimer = setTimeout(() => {
            asyncTimer = null;

            if (lockId !== this.fieldLockId) return;

            this.setState({
                validatingFields: {
                    ...validatingFields,
                    [name]: true
                }
            });
        }, asyncTestDelay);
        // let isAsync = true;

        this._validateField(
            name,
            (errors, value) => {
                if (asyncTimer) {
                    clearTimeout(asyncTimer);
                }
                // isAsync = false;

                if (lockId !== this.fieldLockId) {
                    callback(errors, value, true /* abort state */);
                    return;
                }

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
                        callback(errors, value);
                    }
                );
            },
            triggerType
        );
    }

    validate(callback, triggerType) {
        callback = typeof callback === "function" ? callback : noop;

        const { asyncTestDelay } = this.props;
        const { formValue, formError } = this.state;
        this.fieldLockId++; //validate优先级高于validateField
        const lockId = ++this.formLockId;
        const fields = this.fields;
        const validatingFields = {};
        const allErrors = [];
        let validCounter = 0;

        const updateFormState = () => {
            this.setState({
                formError,
                validatingFields
            });
        };

        const complete = (errors, name) => {
            validCounter--;

            if (errors) {
                formError[name] = errors[0].message;
                allErrors.push(...errors);
            }

            if (validCounter <= 0) {
                if (lockId !== this.formLockId) {
                    callback(
                        allErrors.length ? allErrors : null,
                        formValue,
                        true /* abort state */
                    );
                    return;
                }

                this.setState(
                    {
                        formError,
                        validatingFields: {}
                    },
                    () => {
                        callback(
                            allErrors.length ? allErrors : null,
                            formValue
                        );
                    }
                );
            }
        };

        if (fields.length) {
            //包含多个异步校验的情况下只执行一次
            let hasUpdate = false;
            //校验初始化
            fields.forEach(field => {
                const name = field.props.name;
                validCounter++;
                validatingFields[name] = true;

                if (!(name in formError)) {
                    formError[name] = null;
                }
            });

            //开始进行字段校验
            fields.forEach(field => {
                const name = field.props.name;

                let isAsyncValidate = false;
                //检测是否异步校验
                let asyncTimer = setTimeout(() => {
                    isAsyncValidate = true;
                    asyncTimer = null;

                    if (hasUpdate) return;
                    hasUpdate = true;

                    if (lockId !== this.formLockId) return;

                    updateFormState();
                }, asyncTestDelay);

                this._validateField(
                    name,
                    errors => {
                        validatingFields[name] = false;

                        if (asyncTimer) {
                            clearTimeout(asyncTimer);
                            asyncTimer = null;
                        }

                        //异步校验完成后执行刷新动作
                        if (isAsyncValidate) {
                            updateFormState();
                        }

                        complete(errors, name);
                    },
                    triggerType
                );
            });
        } else {
            callback(null, formValue);
        }
    }

    validateAndScroll(callback, triggerType) {
        callback = typeof callback === "function" ? callback : noop;

        this.validate((errors, formValue, isAbort) => {
            if (errors) {
                const fields = this.fields;
                for (let i = 0; i < fields.length; i++) {
                    const field = fields[i];
                    const name = field.props.name;
                    if (this.hasError(name)) {
                        const dom = field.getDOM();
                        if (dom && dom.scrollIntoView) {
                            dom.scrollIntoView();
                            break;
                        }
                    }
                }
            }

            callback(errors, formValue, isAbort);
        }, triggerType);
    }

    getFormContext() {
        return { form: this };
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

Form.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    path2obj: PropTypes.bool,
    defaultFormValue: PropTypes.object,
    getDefaultFieldValue: PropTypes.func,
    renderFieldExtra: PropTypes.func,
    formValue: PropTypes.object,
    validators: PropTypes.object,
    validateDelay: PropTypes.number,
    validateTrigger: PropTypes.oneOf(["blur", "change"]),
    asyncTestDelay: PropTypes.number,
    component: PropTypes.node,
    labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    labelStyle: PropTypes.object,
    labelClassName: PropTypes.string,
    labelPosition: PropTypes.oneOf(["top", "left"]),
    controlStyle: PropTypes.object,
    controlClassName: PropTypes.string,
    clearErrorOnFocus: PropTypes.bool,
    inline: PropTypes.bool,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    getInputProps: PropTypes.func
};

Form.defaultProps = {
    prefixCls: "nex-form",
    className: "",
    style: {},
    validators: {},
    path2obj: true,
    component: "form",
    asyncTestDelay: 100,
    validateDelay: 0,
    validateTrigger: ["blur", "change"],
    labelPosition: "left",
    clearErrorOnFocus: true,
    inline: false
};

export default Form;
