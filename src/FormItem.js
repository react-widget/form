import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import FormContext from "./FormContext";
export default class FormItem extends React.Component {
    static contextType = FormContext;

    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
            .isRequired,
        name: PropTypes.string,
        style: PropTypes.object,
        className: PropTypes.string,
        label: PropTypes.node,
        labelFor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        labelStyle: PropTypes.object,
        labelPosition: PropTypes.oneOf(["top", "left"]),
        alignItems: PropTypes.oneOf(["top", "center", "bottom"]),
        validator: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
        required: PropTypes.bool,
        clearErrorOnFocus: PropTypes.bool,
        normalize: PropTypes.func,
        renderExtra: PropTypes.func,
        validateDelay: PropTypes.number,
        validateTrigger: PropTypes.string, //change blur none
        inline: PropTypes.bool
    };

    static defaultProps = {
        prefixCls: "nex-form-item"
    };

    constructor(...args) {
        super(...args);
        const form = this.context;

        form.addField(this);
    }

    saveDOM = dom => {
        this._dom = dom;
    };

    getDOM() {
        return this._dom;
    }

    componentWillUnmount() {
        const form = this.context;
        form.removeField(this);
    }

    _validateTimer = null;

    getValidateTrigger() {
        const form = this.context;
        const { validateTrigger } = form.props;
        const props = this.props;

        return "validateTrigger" in props
            ? props.validateTrigger
            : validateTrigger;
    }

    getValidateDelay() {
        const form = this.context;
        const { validateDelay } = form.props;
        const props = this.props;

        return "validateDelay" in props ? props.validateDelay : validateDelay;
    }

    hasError() {
        const form = this.context;
        const { name } = this.props;

        return form.hasError(name);
    }

    getError() {
        const form = this.context;
        const { name } = this.props;

        return form.getError(name);
    }

    cleanError() {
        const form = this.context;
        const { name } = this.props;

        return form.cleanError(name);
    }

    setError(message) {
        const form = this.context;
        const { name } = this.props;

        return form.setError(name, message);
    }

    isValidating() {
        const form = this.context;
        const { name } = this.props;

        return form.isFieldValidating(name);
    }

    validate(callback) {
        const form = this.context;
        const { name } = this.props;

        form.validateField(name, callback);
    }

    getValue() {
        const form = this.context;
        const { name } = this.props;

        return form.getValue(name);
    }

    setValue(value, callback) {
        const form = this.context;
        const { name } = this.props;

        form.setValue(name, value, callback);
    }

    triggerValidate() {
        const validateDelay = this.getValidateDelay();

        if (validateDelay > 0) {
            if (this._validateTimer) clearTimeout(this._validateTimer);
            this._validateTimer = setTimeout(() => {
                this.validate();
            }, validateDelay);
        } else {
            this.validate();
        }
    }

    handleChange = (value, callback) => {
        const { name } = this.props;
        this.setValue(value, formValue => {
            if (formValue[name] /*newValue*/ === value /*oldValue*/) return;

            const validateTrigger = this.getValidateTrigger();

            callback && callback();

            if (validateTrigger === "change") {
                this.triggerValidate();
            }
        });
    };

    handleFocus = callback => {
        const clearErrorOnFocus = this.getProp("clearErrorOnFocus");
        callback && callback();

        if (clearErrorOnFocus) {
            this.cleanError();
        }
    };

    handleBlur = callback => {
        const validateTrigger = this.getValidateTrigger();

        callback && callback();

        if (validateTrigger === "blur") {
            this.triggerValidate();
        }
    };

    normalizeChildrenProps() {
        const form = this.context;
        let { normalize, name, onChange, onFocus, onBlur } = this.props;

        const getInputProps = form.props.getInputProps;

        const customProps = getInputProps
            ? getInputProps(name, this.props)
            : {};

        return {
            value: this.getValue(),
            ...customProps,
            onChange: value => {
                if (normalize) {
                    value = normalize(value);
                }

                // onChange && onChange(value);
                // customProps.onChange && customProps.onChange(value);

                this.handleChange(value, () => {
                    onChange && onChange(value);
                    customProps.onChange && customProps.onChange(value);
                });
            },
            onFocus: e => {
                // onFocus && onFocus(e);
                // customProps.onFocus && customProps.onFocus(e);

                this.handleFocus(() => {
                    onFocus && onFocus(e);
                    customProps.onFocus && customProps.onFocus(e);
                });
            },
            onBlur: e => {
                // onBlur && onBlur(e);
                // customProps.onBlur && customProps.onBlur(e);

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

    getFormProps(prop, defaultValue) {
        const form = this.context;
        const formProps = form.props;

        return formProps[prop] || defaultValue;
    }

    getProp(prop, defaultValue) {
        const form = this.context;
        const formProps = form.props;
        const props = this.props;

        return prop in props ? props[prop] : formProps[prop] || defaultValue;
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
        const alignItems = this.getProp("alignItems");
        const renderFieldExtra = this.getFormProps("renderFieldExtra");
        const renderContextExtra = () => {
            if (renderExtra) {
                return renderExtra(this);
            }

            if (renderFieldExtra) {
                return renderFieldExtra(name, this);
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
            <div
                style={style}
                ref={this.saveDOM}
                className={classnames(prefixCls, {
                    [`${prefixCls}-inline`]: inline,
                    [`${prefixCls}-position-${labelPosition}`]: labelPosition,
                    [`${prefixCls}-align-items-${alignItems}`]:
                        alignItems !== "center",
                    [`${prefixCls}-error`]: hasError,
                    [`${prefixCls}-validating`]: isValidating,
                    [`${prefixCls}-required`]: required,
                    [`${className}`]: className
                })}
            >
                {label && (
                    <label
                        htmlFor={this.getProp("labelFor")}
                        className={classnames(
                            `${prefixCls}-label`,
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
                <div className={`${prefixCls}-content`}>
                    {child}
                    {renderContextExtra()}
                </div>
            </div>
        );
    }
}
