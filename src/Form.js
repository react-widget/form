import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AsyncValidator from 'async-validator';
import set from 'lodash/set';
import get from 'lodash/get';
import FormContext from './FormContext';


export default class Form extends React.Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,
        path2obj: PropTypes.bool,
        formDefaultValue: PropTypes.object,
        formValue: PropTypes.object,
        //formError: PropTypes.object,
        validateDelay: PropTypes.number,
        validateTrigger: PropTypes.string, //change blur none
        component: PropTypes.node,
        rules: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
        // labelPosition: PropTypes.oneOf(['right']),
        // labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        // labelSuffix: PropTypes.string,
        // inline: PropTypes.bool,
        onSubmit: PropTypes.func,
        onChange: PropTypes.func,
        validateFieldsAndScroll: PropTypes.bool,
    }

    static defaultProps = {
        prefixCls: 'rw-form',
        className: '',
        style: {},
        path2obj: true,
        component: 'form',
        validateDelay: 0,
        validateFieldsAndScroll: true,// 待实现
        validateTrigger: 'none',
        labelPosition: 'right',
        //  labelSuffix: '',
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            formValue: nextProps.formValue || prevState.formValue,
        }
    }

    fields = []
    _valiateCb = []

    state = {
        formError: {},
        validatingFields: {},
        formValue: this.props.formDefaultValue || {},
    }

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

        if (!('formValue' in this.props)) {
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

    getFieldRules(name) {
        const fieldRules = [];
        this.fields
            .filter(field => field.props.name === name)
            .forEach(field => {
                const fieldProps = field.props;
                let rules = fieldProps.rules || [];
                if (typeof rules === 'function') {
                    rules = [
                        {
                            validator: rules
                        }
                    ]
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
            if (typeof rules === 'function') {
                rules = [
                    {
                        validator: rules
                    }
                ]
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

    validateField(name, cb) {
        const { formError, validatingFields } = this.state;
        const rules = this.getFieldRules(name);

        if (!rules || rules.length === 0) {
            if (cb instanceof Function) {
                cb(null);
            }
            return;
        }

        this.setState({
            validatingFields: {
                ...validatingFields,
                [name]: true,
            }
        });

        const descriptor = { [name]: rules };
        const validator = new AsyncValidator(descriptor);
        const data = { [name]: this.getValue(name) };

        validator.validate(data, { firstFields: true }, errors => {
            this.setState({
                formError: {
                    ...formError,
                    [name]: errors ? errors[0].message : null
                },
                validatingFields: {
                    ...validatingFields,
                    [name]: false,
                },
            }, () => {
                if (cb instanceof Function) {
                    cb(errors);
                }
            });
        });
    }

    validate(callback) {
        const { rules, formValue } = this.props;
        const fields = this.fields;

        if (fields.length === 0 && callback) {
            callback(null);
            return;
        }

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
            this.setState({
                formError,
                validatingFields: {},
            }, () => {
                if (callback instanceof Function) {
                    callback(errors, formValue);
                }
            });

        });
    }

    onFieldChange(name, value) {
        const { formValue } = this.state;

        formValue.set(name, value);
    }

    getFormContext() {
        return {
            form: this,
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
                    {typeof children === 'function' ? children(this) : children}
                </Component>
            </FormContext.Provider>
        )
    }
}

