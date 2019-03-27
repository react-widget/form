import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FormContext from './FormContext';
export default class FormItem extends React.Component {

    static contextType = FormContext;

    static propTypes = {
        label: PropTypes.string,
        labelFor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        labelPosition: PropTypes.oneOf(['top', 'left', 'right']),
        alignItems: PropTypes.oneOf(['top', 'center', 'bottom']),
        name: PropTypes.string,
        // required: PropTypes.bool,
        normalize: PropTypes.func,
        validateDelay: PropTypes.number,
        validateTrigger: PropTypes.string, //change blur none
        inline: PropTypes.bool,
        showMessage: PropTypes.bool,
    }

    static defaultProps = {
        prefixCls: 'rw-form-item',
        labelPosition: 'left',
        alignItems: "center",
        inline: false,
        showMessage: true,
    }

    componentDidMount() {
        const { form } = this.context;
        const { name } = this.props;

        if (name) {
            form.addField(this);
        }
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

    _validateTimer = null

    getValidateTrigger() {
        const { form } = this.context;
        const { validateTrigger } = form.props;
        const props = this.props;

        return 'validateTrigger' in props ? props.validateTrigger : validateTrigger;
    }

    getValidateDelay() {
        const { form } = this.context;
        const { validateDelay } = form.props;
        const props = this.props;

        return 'validateDelay' in props ? props.validateDelay : validateDelay;
    }

    onFieldBlur() {
        const { form } = this.context;
        const validateTrigger = this.getValidateTrigger();
        const validateDelay = this.getValidateDelay();
        const { name } = this.props;

        if (validateTrigger === 'blur') {
            if (validateDelay > 0) {
                if (this._validateTimer) clearTimeout(this._validateTimer)
                this._validateTimer = setTimeout(() => {
                    form.validateField(name);
                }, validateDelay);
            } else {
                form.validateField(name);
            }
        }
    }

    getValue() {
        const { name } = this.props;
        const { form } = this.context;

        return form.getValue(name);
    }

    onFieldChange(value, e) {
        const { form } = this.context;
        const validateTrigger = this.getValidateTrigger();
        const validateDelay = this.getValidateDelay();
        const { name } = this.props;

        form.setValue(name, value, e);

        if (validateTrigger === 'change') {
            if (validateDelay > 0) {
                if (this._validateTimer) clearTimeout(this._validateTimer)
                this._validateTimer = setTimeout(() => {
                    form.validateField(name);
                }, validateDelay);
            } else {
                form.validateField(name);
            }
        }
    }

    render() {
        const { form } = this.context;
        const {
            normalize,
            label,
            required,
            inline,
            labelFor,
            className,
            labelPosition,
            alignItems,
            labelWidth,
            prefixCls,
            name,
            showMessage
        } = this.props;
        const error = form.getError(name);
        const validating = form.isValidatingField(name);

        const children = React.Children.only(this.props.children);

        const {
            onChange,
            onBlur
        } = children.props;

        const onFieldChange = this.onFieldChange.bind(this);
        const onFieldBlur = this.onFieldBlur.bind(this);

        const InputComponent = React.cloneElement(children, {
            value: this.getValue(),
            onChange: function (value, event) {
                if (normalize) {
                    value = normalize(value);
                }

                onChange && onChange(value, event);

                onFieldChange(value, event)
            },
            onBlur: function (e) {
                onBlur && onBlur(e);
                onFieldBlur(e)
            },
        });

        return (
            <div
                className={classnames(prefixCls, {
                    [`${prefixCls}-inline`]: inline,
                    [`${prefixCls}-position-${labelPosition}`]: labelPosition,
                    [`${prefixCls}-align-items-${alignItems}`]: alignItems !== 'center',
                    [`${prefixCls}-error`]: error,
                    [`${prefixCls}-validating`]: validating,
                    [`${prefixCls}-required`]: this.isRequired() || required,
                    [`${className}`]: className,
                })}
            >
                {
                    label && (
                        <label
                            htmlFor={labelFor}
                            className={`${prefixCls}-label`}
                            style={{
                                width: labelWidth
                            }}
                        >
                            {label}
                        </label>
                    )
                }
                <div className={`${prefixCls}-content`}>
                    {InputComponent}
                    {
                        showMessage && error ? (
                            <div className={`${prefixCls}-error-tip`} >{error}</div>
                        ) : null
                    }
                </div>
            </div>
        )
    }
}