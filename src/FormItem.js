import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import FormContext from "./FormContext";
export default class FormItem extends React.Component {
    static contextType = FormContext;

    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
            .isRequired,
        label: PropTypes.node,
        labelFor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        labelStyle: PropTypes.object,
        labelPosition: PropTypes.oneOf(["top", "left"]),
        alignItems: PropTypes.oneOf(["top", "center", "bottom"]),
        name: PropTypes.string,
        rules: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array,
            PropTypes.func
        ]),
        validator: PropTypes.func,
        // asyncValidator: PropTypes.func,
        required: PropTypes.bool,
        normalize: PropTypes.func,
        validateDelay: PropTypes.number,
        validateTrigger: PropTypes.string, //change blur none
        inline: PropTypes.bool,
        showMessage: PropTypes.bool,
        help: PropTypes.node,
        style: PropTypes.object
        //extra: PropTypes.node,
    };

    static defaultProps = {
        prefixCls: "nex-form-item"
        // labelPosition: 'left',
        // alignItems: "center",
        // inline: false,
        //showMessage: true,
    };

    constructor(...args) {
        super(...args);
        const { form } = this.context;

        form.addField(this);
    }

    saveDOM = dom => {
        this._dom = dom;
    };

    getDOM() {
        return this._dom;
    }

    componentWillUnmount() {
        const { form } = this.context;
        form.removeField(this);
    }

    isRequired() {
        const { form } = this.context;
        const { name } = this.props;
        let rules = form.getFieldRules(name);
        let isRequired = false;

        if (rules && rules.length) {
            isRequired = rules.some(rule => rule.required);
        }

        return isRequired;
    }

    _validateTimer = null;

    getValidateTrigger() {
        const { form } = this.context;
        const { validateTrigger } = form.props;
        const props = this.props;

        return "validateTrigger" in props
            ? props.validateTrigger
            : validateTrigger;
    }

    getValidateDelay() {
        const { form } = this.context;
        const { validateDelay } = form.props;
        const props = this.props;

        return "validateDelay" in props ? props.validateDelay : validateDelay;
    }

    onFieldBlur = () => {
        const { form } = this.context;
        const validateTrigger = this.getValidateTrigger();
        const validateDelay = this.getValidateDelay();
        const { name } = this.props;

        if (validateTrigger === "blur") {
            if (validateDelay > 0) {
                if (this._validateTimer) clearTimeout(this._validateTimer);
                this._validateTimer = setTimeout(() => {
                    form.validateField(name);
                }, validateDelay);
            } else {
                form.validateField(name);
            }
        }
    };

    getValue() {
        const { name } = this.props;
        const { form } = this.context;

        return form.getValue(name);
    }

    onFieldChange = (value, e) => {
        const { form } = this.context;
        const { name } = this.props;

        form.setValue(name, value, e, () => {
            const validateTrigger = this.getValidateTrigger();
            const validateDelay = this.getValidateDelay();

            if (validateTrigger === "change") {
                if (validateDelay > 0) {
                    if (this._validateTimer) clearTimeout(this._validateTimer);
                    this._validateTimer = setTimeout(() => {
                        form.validateField(name);
                    }, validateDelay);
                } else {
                    form.validateField(name);
                }
            }
        });
    };

    getProp(prop, defaultValue) {
        const { form } = this.context;
        const formProps = form.props;
        const props = this.props;

        return prop in props ? props[prop] : formProps[prop] || defaultValue;
    }

    normalizeChildrenProps() {
        const { form } = this.context;
        let { normalize, name, onChange, onBlur } = this.props;

        const getInputProps =
            form.props.getInputProps ||
            function() {
                return {};
            };

        const customProps = getInputProps(name, this.props);

        return {
            value: this.getValue(),
            ...customProps,
            onChange: (value, e) => {
                if (normalize) {
                    value = normalize(value);
                }

                onChange && onChange(value, e);
                customProps.onChange && customProps.onChange(value, e);

                this.onFieldChange(value, e);
            },
            onBlur: e => {
                onBlur && onBlur(e);
                customProps.onBlur && customProps.onBlur(e);

                this.onFieldBlur(e);
            }
        };
    }

    normalizeChildren() {
        return React.cloneElement(
            React.Children.only(this.props.children),
            this.normalizeChildrenProps()
        );
    }

    render() {
        const { form } = this.context;
        const {
            // normalize,
            label,
            required,
            // labelFor,
            className,
            prefixCls,
            name,
            help,
            style,
            children
            //extra,
        } = this.props;

        const inline = this.getProp("inline");
        const labelPosition = this.getProp("labelPosition");
        const alignItems = this.getProp("alignItems");
        const showMessage = this.getProp("showMessage");

        const error = form.getError(name);
        const validating = form.isValidatingField(name);

        const child =
            typeof children === "function"
                ? children(this.normalizeChildrenProps())
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
                    [`${prefixCls}-error`]: error,
                    [`${prefixCls}-validating`]: validating,
                    [`${prefixCls}-required`]: this.isRequired() || required,
                    [`${prefixCls}-with-help`]: help,
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
                    {!help && showMessage && error ? (
                        <div className={`${prefixCls}-error-tip`}>{error}</div>
                    ) : null}
                    {help ? (
                        <div className={`${prefixCls}-help`}>{help}</div>
                    ) : null}
                </div>
            </div>
        );
    }
}
