import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AsyncValidator from 'async-validator';
import FormContext from './FormContext';
export default class FormItem extends React.Component {

    static contextType = FormContext;

    static propTypes = {
        label: PropTypes.string,
        labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
        required: PropTypes.bool,
        rules: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        normalize: PropTypes.func,
    }

    static defaultProps = {
        prefixCls: 'rw-form-item'
    }

    constructor(props) {
        super(props);

        this.state = {
            error: '',
            valid: false,
            validating: false
        }
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
        let rules = form.getRule(name);
        let isRequired = false;

        if (rules && rules.length) {
            isRequired = rules.some(rule => rule.required);
        }

        return isRequired;
    }

    _validateTimer = null

    onFieldBlur() {
        const { form } = this.context;
        const { checkTrigger, checkDelay } = form.props;
        const { name } = this.props;
        if (checkTrigger === 'blur' && checkDelay > 0) {
            if (this._validateTimer) clearTimeout(this._validateTimer)
            this._validateTimer = setTimeout(() => {
                form.validateField(name);
            }, checkDelay)
        }
    }

    getValue() {
        const { name } = this.props;
        const { form } = this.context;

        return form.getValue(name);
    }

    onFieldChange(value, e) {
        const { form } = this.context;
        const { checkTrigger } = form.props;
        const { name } = this.props;

        form.setValue(name, value, e);

        if (checkTrigger === 'change' && checkDelay > 0) {
            if (this._validateTimer) clearTimeout(this._validateTimer)
            this._validateTimer = setTimeout(() => {
                form.validateField(name);
            }, checkDelay)
        }
    }

    labelStyle() {
        const ret = {};

        // if (this.parent().props.labelPosition === 'top') return ret;

        const labelWidth = this.props.labelWidth //|| this.parent().props.labelWidth;

        if (labelWidth) {
            ret.width = parseInt(labelWidth);
        }

        return ret;
    }

    contentStyle() {
        const ret = {};

        //    if (this.parent().props.labelPosition === 'top' || this.parent().props.inline) return ret;

        const labelWidth = this.props.labelWidth// || this.parent().props.labelWidth;

        if (labelWidth) {
            ret.marginLeft = parseInt(labelWidth);
        }

        return ret;
    }

    fieldValue() {
        const { model } = this.context;
        //const model = this.parent().props.model;
        if (!model || !this.props.name) { return; }
        return model[this.props.name];
    }

    render() {
        const { form } = this.context;
        const { validating } = this.state;
        const { normalize, label, required, className, prefixCls, name } = this.props;
        const error = form.getError(name)

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
                    [`${className}`]: className,
                    'is-error': error,
                    'is-validating': validating,
                    'is-required': this.isRequired() || required
                })}
            >
                {
                    label && (
                        <label className="nex-form-item-label">
                            {label}
                        </label>
                    )
                }
                <div className="nex-form-inner-wrapper" style={this.contentStyle()}>
                    {InputComponent}
                    {
                        error && <div className="nex-form-item-error">{error}</div>
                    }
                </div>
            </div>
        )
    }
}