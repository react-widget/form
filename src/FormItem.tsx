import React from "react";
import isFunction from "lodash/isFunction";
import classnames from "classnames";
import FormContext from "./FormContext";
import FormItemContext from "./FormItemContext";

type FormValue = Record<string, any>;

type CommonProps =
    | "validateTrigger"
    | "clearErrorOnFocus"
    | "disableValidator"
    | "inline"
    | "labelPosition"
    | "labelAlign"
    | "renderControlExtra"
    | "labelClassName"
    | "labelWidth"
    | "labelStyle"
    | "controlClassName"
    | "controlStyle"
    | "requiredMessage";

export interface IFormItemProps {
    prefixCls?: string;
    children?:
        | ((props: IFormItemProps, instance: FormItem) => React.ReactNode)
        | React.ReactNode; //PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
    name?: string; //PropTypes.string;
    style?: React.CSSProperties;
    className?: string;
    disableValidator?: boolean;
    label?: React.ReactNode;
    labelFor?: string; //PropTypes.oneOfType([string PropTypes.number]),
    labelWidth?: string | number; //PropTypes.oneOfType([string PropTypes.number]),
    labelStyle?: React.CSSProperties;
    labelClassName?: string;
    labelPosition?: "top" | "left"; //PropTypes.oneOf(["top", "left"]),
    labelAlign?: "left" | "right"; //PropTypes.oneOf(["left", "right"]),
    controlStyle?: {};
    controlClassName?: string;
    validator?: () => boolean; //PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
    showRequiredMark?: boolean;
    required?: boolean;
    requiredMessage?: string;
    clearErrorOnFocus?: boolean;
    normalize?: (value: any, prevValue: any, formValue: FormValue) => void;
    renderExtra?: (instance: FormItem) => React.ReactNode;
    validateDelay?: number;
    validateTrigger?:
        | "blur"
        | "change"
        | "none"
        | ("blur" | "change" | "none")[]; // onBlur onChange
    inline?: boolean;
    renderControlExtra: () => React.ReactNode;
    onChange: (value: any) => void;
    onFocus: (e: React.FocusEvent) => void;
    onBlur: (e: React.FocusEvent) => void;
}

let fid = 1;

export class FormItem extends React.Component<IFormItemProps> {
    static contextType = FormContext;

    static defaultProps = {
        prefixCls: "nex-form-item",
        showRequiredMark: false,
    };

    _initialValue?: any;
    context!: React.ContextType<typeof FormContext>;
    _dom: HTMLDivElement;
    _fid: number = fid++;
    _validateTimer: NodeJS.Timeout | null = null;

    constructor(props: IFormItemProps) {
        super(props);
        const form = this.getForm();

        this._initialValue = this.getValue();

        //组件id
        // this._fid = fid++;

        form.addField(this);
    }

    getInitialValue() {
        return this._initialValue;
    }

    // getInitialValue() {
    //     const { name } = this.props;
    //     const form = this.getForm();

    //     return form.getInitialValue(name);
    // }

    saveDOM = (dom: HTMLDivElement) => {
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

    hasValidateTrigger(type = "none") {
        let validateTrigger = this.getProp("validateTrigger", []);

        let triggers: string[] = Array.isArray(validateTrigger)
            ? validateTrigger
            : [validateTrigger];

        return triggers.indexOf(type) !== -1;
    }

    getValidateDelay() {
        const form = this.getForm();
        const { validateDelay } = form.props;
        const props = this.props;

        return "validateDelay" in props ? props.validateDelay : validateDelay;
    }

    reset(cb) {
        const form = this.getForm();
        const { name } = this.props;
        form.resetField(name, cb);
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
        this.setValue(value, formValue => {
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

    normalizeChildrenProps(): IFormItemProps {
        let { normalize, name, onChange, onFocus, onBlur } = this.props;
        const form = this.getForm();

        const _normalize = this.getFormProp("normalizeFieldValue");

        if (_normalize && !normalize) {
            normalize = _normalize.bind(null, name);
        }

        const getInputProps = this.getFormProp("getInputProps", () => ({}));

        const customProps = getInputProps(this);
        //valueTrigger 	收集子节点的值的时机，暂不开发...
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
            },
        };
    }

    normalizeChildren(children) {
        return React.cloneElement(
            React.Children.only(children),
            this.normalizeChildrenProps()
        );
    }

    getFormProp(prop, defaultValue?) {
        const form = this.getForm();
        const formProps = form.props;

        return prop in formProps ? formProps[prop] : defaultValue;
    }

    getProp<T extends CommonProps>(prop: T, defaultValue?: IFormItemProps[T]) {
        const form = this.getForm();
        const formProps = form.props;
        const props = this.props;

        return prop in props
            ? props[prop]
            : prop in formProps
            ? formProps[prop]
            : defaultValue;
    }

    getFormItemContext() {
        return { formItem: this };
    }

    render() {
        const {
            name,
            label,
            labelFor,
            showRequiredMark,
            required,
            className,
            prefixCls,
            style,
            renderExtra,
            children,
        } = this.props;
        //实验性质，有可能移除
        const disableValidator = this.getProp("disableValidator");
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

        const child = isFunction(children)
            ? children(this.normalizeChildrenProps(), this)
            : this.normalizeChildren(children);

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
                        [`is-required`]:
                            (required || showRequiredMark) && !disableValidator,
                        [`${className}`]: className,
                    })}
                >
                    {label && (
                        <label
                            htmlFor={labelFor}
                            className={classnames(
                                {
                                    [`${prefixCls}-label`]: true,
                                    [`${prefixCls}-label-left`]:
                                        labelAlign === "left" &&
                                        labelPosition === "left",
                                },
                                this.getProp("labelClassName")
                            )}
                            style={{
                                width: this.getProp("labelWidth"),
                                ...this.getProp("labelStyle", {}),
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

export default FormItem;
