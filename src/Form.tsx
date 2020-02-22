import React from "react";
import classnames from "classnames";
import set from "lodash/set";
import get from "lodash/get";
import isFunction from "lodash/isFunction";
import FormContext from "./FormContext";
import { FormItem } from "./FormItem";
import { isEmptyValue } from "./utils";

import {
    FormValue,
    TriggerType,
    ValidationError,
    ValueChangeCallback,
    ValidationCallback,
    Validator,
} from "./types";

export interface IFormProps {
    prefixCls?: string;
    className?: string;
    children?: ((instance: Form) => React.ReactNode) | React.ReactNode;
    style?: React.CSSProperties;
    path2obj?: boolean;
    defaultFormValue?: FormValue;
    getDefaultFieldValue?: (name: string, formValue: FormValue) => any;
    renderControlExtra?: (formItem: FormItem) => React.ReactNode;
    formValue?: FormValue;
    disableValidator?: boolean;
    validators?: Record<string, Validator | Validator[]>;
    validateDelay?: number;
    validateTrigger?:
        | "blur"
        | "change"
        | "none"
        | Array<"blur" | "change" | "none">;
    asyncTestDelay?: number;
    component?: React.ElementType;
    requiredMessage?: string;
    labelWidth?: number;
    labelStyle?: React.CSSProperties;
    labelClassName?: string;
    labelPosition?: "top" | "left";
    labelAlign?: "left" | "right";
    controlStyle?: React.CSSProperties;
    controlClassName?: string;
    clearErrorOnFocus?: boolean;
    inline?: boolean;
    normalizeFieldValue?: () => any;
    onSubmit?: () => any;
    onChange?: (formValue: FormValue) => void;
    getInputProps?: () => any;
}

interface IFormState {
    formError: Record<string, any>;
    validatingFields: Record<string, any>;
    formValue: FormValue;
}

function noop() {}

export class Form extends React.Component<IFormProps, IFormState> {
    static defaultProps = {
        prefixCls: "nex-form",
        className: "",
        style: {},
        //实验性质，有序可能移除
        disableValidator: false,
        validators: {},
        path2obj: true,
        component: "form",
        asyncTestDelay: 16,
        validateDelay: 0,
        validateTrigger: ["change"], //"blur",
        labelPosition: "left",
        labelAlign: "right",
        clearErrorOnFocus: true,
        inline: false,
    };

    static getDerivedStateFromProps(
        nextProps: IFormProps,
        prevState: IFormState
    ) {
        return {
            formValue: nextProps.formValue || prevState.formValue,
        };
    }

    //异步校验加乐观锁
    fieldLocks: Record<string, any> = {};
    formLockId: number = 1;

    fields: FormItem[] = [];
    _validateCb = [];

    state = {
        formError: {},
        validatingFields: {},
        formValue: this.props.defaultFormValue || {},
    };

    addField(field: FormItem) {
        // const { name } = field.props;
        // field._initialValue = this.getValue(name);
        this.fields.push(field);
    }

    removeField(field: FormItem) {
        var idx = this.fields.indexOf(field);
        if (idx !== -1) {
            const name = field.props.name;

            // eslint-disable-next-line
            this.state.formError[name] = null;

            this.fields.splice(idx, 1);
        }
    }

    getInitialFormValue() {
        const initialFormValue = {};

        this.fields.forEach(field => {
            initialFormValue[field.props.name] = field._initialValue;
        });

        return initialFormValue;
    }

    reset(cb) {
        const initialFormValue = this.getInitialFormValue();

        this.fieldLocks = {};
        this.formLockId = 1;
        // eslint-disable-next-line
        this.state.validatingFields = {};
        // eslint-disable-next-line
        this.state.formValue = initialFormValue;
        // eslint-disable-next-line
        this.state.formError = {};
        // this.cleanErrors();

        // this.setState({
        //     formError: {},
        //     validatingFields: {},
        //     formValue: initialFormValue
        // });

        this.setValues({}, cb);
    }

    getInitialValue(name) {
        let initialValue;

        this.fields.forEach(field => {
            if (field.props.name === name) {
                initialValue = field.getInitialValue();
            }
        });

        return initialValue;
    }

    resetField(name: string, cb) {
        this.cleanError(name);

        let initialValue = this.getInitialValue(name);

        this.fieldLocks[name] = 1;
        // eslint-disable-next-line
        this.state.validatingFields[name] = false;
        // eslint-disable-next-line
        this.state.formError[name] = null;
        // this.cleanError(name);

        this.setValue(name, initialValue, cb);
    }

    getFormValue() {
        return this.state.formValue;
    }

    getValues() {
        return this.state.formValue;
    }

    setValues(obj = {}, cb) {
        const { path2obj, onChange } = this.props;
        const formValue = this.state.formValue;

        const isControlled = "formValue" in this.props;

        const nextFormValue = formValue;

        Object.keys(obj).forEach(name => {
            const value = obj[name];
            if (path2obj) {
                set(nextFormValue, name, value);
            } else {
                nextFormValue[name] = value;
            }
        });

        if (!isControlled) {
            this.setState({
                formValue: nextFormValue,
            });
        }

        if (onChange) {
            onChange(nextFormValue);
        }

        if (cb) {
            this._validateCb.push(cb);
        }
    }

    setFormValue(formValue, cb: ValueChangeCallback) {
        return this.setValues(formValue, cb);
    }

    getValue(name: string) {
        const { getDefaultFieldValue } = this.props;
        const path2obj = this.props.path2obj;
        const formValue = this.state.formValue;

        const value = path2obj ? get(formValue, name) : formValue[name];

        return value === undefined && getDefaultFieldValue
            ? getDefaultFieldValue(name, formValue)
            : value;
    }

    setValue(name: string, value: any, cb: ValueChangeCallback) {
        const { path2obj, onChange } = this.props;
        const formValue = this.state.formValue;

        const isControlled = "formValue" in this.props;

        const nextFormValue = formValue;

        if (path2obj) {
            set(nextFormValue, name, value);
        } else {
            nextFormValue[name] = value;
        }

        if (!isControlled) {
            this.setState({
                formValue: nextFormValue,
            });
        }

        if (onChange) {
            onChange(nextFormValue);
        }

        if (cb) {
            this._validateCb.push(cb);
        }
    }

    getFieldValue(name: string) {
        return this.getValue(name);
    }

    setFieldValue(name: string, value: any, cb: ValueChangeCallback) {
        return this.setValue(name, value, cb);
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

    hasError(name: string) {
        const { formError } = this.state;

        return formError[name] != null; // null or undefined
    }

    getError(name: string) {
        const { formError } = this.state;
        return formError[name];
    }

    cleanError(name: string) {
        const { formError } = this.state;

        if (!this.hasError(name)) {
            return;
        }

        this.setState({
            formError: {
                ...formError,
                [name]: null,
            },
        });
    }

    setError(name: string, message: any) {
        const { formError } = this.state;
        this.setState({
            formError: {
                ...formError,
                [name]: message,
            },
        });
    }

    cleanErrors() {
        this.setState({
            formError: {},
        });
    }

    setErrors(errors: Record<string, any>) {
        const { formError } = this.state;
        this.setState({
            ...formError,
            ...errors,
        });
    }

    getFieldValidatorList(name: string): Validator[] {
        const fieldValidators = [];
        this.fields
            .filter(field => field.props.name === name)
            .forEach(field => {
                const disableValidator = field.getProp("disableValidator");
                if (disableValidator) return;

                const fieldProps = field.props;

                if (fieldProps.required) {
                    fieldValidators.unshift(value => {
                        if (isEmptyValue(value)) {
                            return field.getProp(
                                "requiredMessage",
                                `${name} check fail`
                            );
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

    isFieldValidating(name: string) {
        const validatingFields = this.state.validatingFields;
        return !!validatingFields[name];
    }

    isValidating() {
        const validatingFields = this.state.validatingFields;
        return Object.keys(validatingFields).some(key => validatingFields[key]);
    }

    _validateField(
        name: string,
        callback: ValidationCallback,
        triggerType = "none"
    ) {
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
                        message,
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

            // 校验方法返回 true undefined null 代表校验成功，校验失败则直接返回失败信息
            const ret = validator(value, formValue, triggerType);
            if (ret === true) {
                cb();
            } else if (ret === false) {
                cb(`${name} check fail`);
            } else if (ret && ret.then) {
                ret.then(
                    () => cb(),
                    (e: any) => cb(e)
                );
            } else {
                cb(ret);
            }
        };

        startCheck();
    }

    validateField(
        name: string,
        callback: ValidationCallback,
        triggerType: TriggerType
    ) {
        callback = typeof callback === "function" ? callback : noop;

        const { asyncTestDelay } = this.props;
        const { formError, validatingFields } = this.state;

        this.fieldLocks[name] = this.fieldLocks[name] || 1;

        const lockId = ++this.fieldLocks[name];

        //是否异步检测
        let asyncTimer = setTimeout(() => {
            asyncTimer = null;

            if (lockId !== this.fieldLocks[name]) return;

            this.setState({
                validatingFields: {
                    ...validatingFields,
                    [name]: true,
                },
                formError: {
                    ...formError,
                    [name]: null,
                },
            });
        }, asyncTestDelay);

        this._validateField(
            name,
            (errors, value) => {
                if (asyncTimer) {
                    clearTimeout(asyncTimer);
                }

                if (lockId !== this.fieldLocks[name]) {
                    callback(errors, value, true /* abort state */);
                    return;
                }

                this.setState(
                    {
                        formError: {
                            ...formError,
                            [name]: errors ? errors[0].message : null,
                        },
                        validatingFields: {
                            ...validatingFields,
                            [name]: false,
                        },
                    },
                    () => {
                        callback(errors, value);
                    }
                );
            },
            triggerType
        );
    }

    validate(callback: ValidationCallback, triggerType: TriggerType) {
        callback = typeof callback === "function" ? callback : noop;
        const formError = {};
        let asyncUpdateTimer = null;
        let hasRunComplete = false;
        const { asyncTestDelay } = this.props;
        const { formValue } = this.state;
        this.fieldLocks = {}; //validate优先级高于validateField
        const lockId = ++this.formLockId;
        const fields = this.fields;
        const validatingFields = {};
        const allErrors = [];
        let validCounter = 0;

        const updateFormState = () => {
            if (lockId !== this.formLockId) return;

            this.setState({
                formError,
                validatingFields,
            });
        };

        const complete = (errors, name) => {
            validCounter--;

            if (errors) {
                formError[name] = errors[0].message;
                allErrors.push(...errors);
            }

            if (validCounter <= 0) {
                hasRunComplete = true;
                if (asyncUpdateTimer) {
                    clearTimeout(asyncUpdateTimer);
                    asyncUpdateTimer = null;
                }

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
                        validatingFields: {},
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
            //校验初始化
            fields.forEach(field => {
                const name = field.props.name;
                validCounter++;
                validatingFields[name] = true;

                // if (!(name in formError)) {
                //     formError[name] = null;
                // }
            });

            //开始进行字段校验
            fields.forEach(field => {
                const name = field.props.name;

                let isAsyncValidate = false;
                //检测是否异步校验
                let asyncTimer = setTimeout(() => {
                    isAsyncValidate = true;
                    asyncTimer = null;
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

            //如果校验方法中存在异步校验则先显示同步校验的信息及异步状态
            asyncUpdateTimer = setTimeout(() => {
                asyncUpdateTimer = null;
                //如果不存在异步校验，hasRunComplete会为true
                if (hasRunComplete) return;
                updateFormState();
            }, asyncTestDelay);
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

    handleSubmit = e => {
        e.preventDefault();
    };

    render() {
        const {
            prefixCls,
            style,
            className,
            onSubmit,
            component: Component,
            children,
        } = this.props;

        return (
            <FormContext.Provider value={this.getFormContext()}>
                <Component
                    style={style}
                    className={classnames(prefixCls, className)}
                    onSubmit={onSubmit || this.handleSubmit}
                >
                    {isFunction(children) ? children(this) : children}
                </Component>
            </FormContext.Provider>
        );
    }
}

export default Form;