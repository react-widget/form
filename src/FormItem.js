import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import FormContext from "./FormContext";
import FormItemContext from "./FormItemContext";

class FormItem extends React.Component {
    static contextType = FormContext;

    constructor(...args) {
        super(...args);
        const form = this.getForm();

        form.addField(this);
    }

    saveDOM = dom => {
        this._dom = dom;
    };

    getDOM() {
        return this._dom;
    }

    getForm() {
        return this.context.form;
    }

    componentWillUnmount() {
        const form = this.getForm();
        form.removeField(this);
    }

    _validateTimer = null;

    hasValidateTrigger(type = "none") {
        let triggers = this.getProp("validateTrigger", []);

        triggers = Array.isArray(triggers) ? triggers : [triggers];

        return triggers.indexOf(type) !== -1;
    }

    getValidateDelay() {
        const form = this.getForm();
        const { validateDelay } = form.props;
        const props = this.props;

        return "validateDelay" in props ? props.validateDelay : validateDelay;
    }

    hasError() {
        const form = this.getForm();
        const { name } = this.props;

        return form.hasError(name);
    }

    getError() {
        const form = this.getForm();
        const { name } = this.props;

        return form.getError(name);
    }

    cleanError() {
        const form = this.getForm();
        const { name } = this.props;

        return form.cleanError(name);
    }

    setError(message) {
        const form = this.getForm();
        const { name } = this.props;

        return form.setError(name, message);
    }

    isValidating() {
        const form = this.getForm();
        const { name } = this.props;

        return form.isFieldValidating(name);
    }

    validate(callback, triggerType = "none") {
        const form = this.getForm();
        const { name } = this.props;

        form.validateField(name, callback, triggerType);
    }

    getValue() {
        const form = this.getForm();
        const { name } = this.props;

        return form.getValue(name);
    }

    setValue(value, callback) {
        const form = this.getForm();
        const { name } = this.props;

        form.setValue(name, value, callback);
    }

    triggerValidate(triggerType) {
        const validateDelay = this.getValidateDelay();

        if (validateDelay > 0) {
            if (this._validateTimer) clearTimeout(this._validateTimer);
            this._validateTimer = setTimeout(() => {
                this.validate(null, triggerType);
            }, validateDelay);
        } else {
            this.validate(null, triggerType);
        }
    }

    handleChange = (value, callback) => {
        const { name } = this.props;
        const oldValue = this.getValue();

        this.setValue(value, formValue => {
            if (formValue[name] /*newValue*/ === oldValue /*oldValue*/) return;

            callback && callback();

            if (this.hasValidateTrigger("change")) {
                this.triggerValidate("change");
            }
        });
    };

    handleFocus = callback => {
        const clearErrorOnFocus = this.getProp("clearErrorOnFocus");
        callback && callback();

        if (clearErrorOnFocus) {
            if (this._validateTimer) clearTimeout(this._validateTimer);
            this.cleanError();
        }
    };

    handleBlur = callback => {
        callback && callback();

        if (this.hasValidateTrigger("blur")) {
            this.triggerValidate("blur");
        }
    };

    normalizeChildrenProps() {
        let { normalize, name, onChange, onFocus, onBlur } = this.props;
        const form = this.getForm();

        const _normalize = this.getFormProp("normalizeFieldValue");

        if (_normalize && !normalize) {
            normalize = _normalize.bind(null, name);
        }

        const getInputProps = this.getFormProp("getInputProps", () => ({}));

        const customProps = getInputProps(this);
        //valueTrigger 	收集子节点的值的时机 待开发...
        return {
            value: this.getValue(),
            ...customProps,
            onChange: value => {
                const formValue = form.getFormValue();
                const prevValue = this.getValue();

                if (normalize) {
                    value = normalize(value, prevValue, formValue);
                }

                this.handleChange(value, () => {
                    onChange && onChange(value);
                    customProps.onChange && customProps.onChange(value);
                });
            },
            onFocus: e => {
                this.handleFocus(() => {
                    onFocus && onFocus(e);
                    customProps.onFocus && customProps.onFocus(e);
                });
            },
            onBlur: e => {
                this.handleBlur(() => {
                    onBlur && onBlur(e);
                    customProps.onBlur && customProps.onBlur(e);
                });
            }
        };
    }

    normalizeChildren() {
        return React.cloneElement(
            React.Children.only(this.props.children),
            this.normalizeChildrenProps()
        );
    }

    getFormProp(prop, defaultValue) {
        const form = this.getForm();
        const formProps = form.props;

        return formProps[prop] || defaultValue;
    }

    getProp(prop, defaultValue) {
        const form = this.getForm();
        const formProps = form.props;
        const props = this.props;

        return prop in props ? props[prop] : formProps[prop] || defaultValue;
    }

    getFormItemContext() {
        return Object.create(this);
    }

    render() {
        const {
            name,
            label,
            required,
            className,
            prefixCls,
            style,
            renderExtra,
            children
        } = this.props;
        const inline = this.getProp("inline");
        const labelPosition = this.getProp("labelPosition");
        const labelAlign = this.getProp("labelAlign");
        const _renderControlExtra = this.getFormProp("renderControlExtra");
        const renderControlExtra = () => {
            if (renderExtra) {
                return renderExtra(this);
            }

            if (_renderControlExtra) {
                return _renderControlExtra(this);
            }

            return null;
        };

        const hasError = this.hasError();
        const isValidating = this.isValidating();

        const child =
            typeof children === "function"
                ? children(this.normalizeChildrenProps(), this)
                : this.normalizeChildren();

        return (
            <FormItemContext.Provider value={this.getFormItemContext()}>
                <div
                    style={style}
                    ref={this.saveDOM}
                    className={classnames(prefixCls, {
                        [`${prefixCls}-inline`]: inline,
                        [`${prefixCls}-${labelPosition}`]: labelPosition,
                        [`has-error`]: hasError,
                        [`is-validating`]: isValidating,
                        [`is-required`]: required,
                        [`${className}`]: className
                    })}
                >
                    {label && (
                        <label
                            htmlFor={this.getProp("labelFor")}
                            className={classnames(
                                {
                                    [`${prefixCls}-label`]: true,
                                    [`${prefixCls}-label-left`]:
                                        labelAlign === "left" &&
                                        labelPosition === "left"
                                },
                                this.getProp("labelClassName")
                            )}
                            style={{
                                width: this.getProp("labelWidth"),
                                ...this.getProp("labelStyle", {})
                            }}
                        >
                            {label}
                        </label>
                    )}
                    <div
                        className={classnames(
                            `${prefixCls}-control`,
                            this.getProp("controlClassName")
                        )}
                        style={this.getProp("controlStyle", {})}
                    >
                        {child}
                        {renderControlExtra()}
                    </div>
                </div>
            </FormItemContext.Provider>
        );
    }
}

FormItem.propTypes = {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
    name: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    label: PropTypes.node,
    labelFor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    labelStyle: PropTypes.object,
    labelClassName: PropTypes.string,
    labelPosition: PropTypes.oneOf(["top", "left"]),
    labelAlign: PropTypes.oneOf(["left", "right"]),
    controlStyle: PropTypes.object,
    controlClassName: PropTypes.string,
    validator: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
    required: PropTypes.bool,
    requiredMessage: PropTypes.string,
    clearErrorOnFocus: PropTypes.bool,
    normalize: PropTypes.func,
    renderExtra: PropTypes.func,
    validateDelay: PropTypes.number,
    validateTrigger: PropTypes.oneOf(["blur", "change"]), // onBlur onChange
    inline: PropTypes.bool
};

FormItem.defaultProps = {
    prefixCls: "nex-form-item"
};

export default FormItem;
