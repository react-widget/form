import React from "react";
import isFunction from "lodash/isFunction";
import classnames from "classnames";
import FormContext, { IFormContext } from "./FormContext";
import FormItemContext from "./FormItemContext";
import { FormProps } from "./Form";

import {
	FormValue,
	TriggerType,
	ValidateTrigger,
	ValueChangeCallback,
	ValidationCallback,
	Validator,
	FormItemChildrenProps,
} from "./types";

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

export interface FormItemProps {
	showRequiredMark: boolean;
	name: string;
	validateDelay: number;
	children?:
		| ((props: FormItemChildrenProps, instance: FormItem) => React.ReactNode)
		| React.ReactNode;

	style?: React.CSSProperties;
	className?: string;
	disableValidator?: boolean;
	label?: React.ReactNode;
	labelFor?: string;
	labelWidth?: number;
	labelStyle?: React.CSSProperties;
	labelClassName?: string;
	labelPosition?: "top" | "left";
	labelAlign?: "left" | "right";
	controlStyle?: React.CSSProperties;
	controlClassName?: string;
	validator?: Validator | Validator[];

	required?: boolean;
	requiredMessage?: string;
	clearErrorOnFocus?: boolean;
	normalize?: (value: any, prevValue: any, formValue: FormValue) => any;
	renderExtra?: (instance: FormItem) => React.ReactNode;
	validateTrigger?: ValidateTrigger;
	inline?: boolean;
	renderControlExtra?: () => React.ReactNode;
	onChange?: (value: any, e?: React.SyntheticEvent) => void;
	onFocus?: (e: React.FocusEvent) => void;
	onBlur?: (e: React.FocusEvent) => void;
}

const defaultProps: FormItemProps = {
	showRequiredMark: false,
	name: "",
	validateDelay: 0,
};

let fid = 1;

export class FormItem extends React.Component<FormItemProps> {
	static contextType = FormContext;

	static defaultProps = defaultProps;

	readonly props: Readonly<FormItemProps>;

	_initialValue?: any;
	context: IFormContext;
	_dom: HTMLDivElement;
	_fid: number = fid++;
	_validateTimer: number | null = null;

	constructor(props: FormItemProps, context?: any) {
		super(props, context);
		const form = this.getForm();

		this._initialValue = this.getValue();

		//组件id
		// this._fid = fid++;

		form.addField(this);
	}

	getInitialValue() {
		return this._initialValue;
	}

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
		let validateTrigger = this.getProp("validateTrigger") || [];

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

	reset(cb?: ValueChangeCallback) {
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

	setError(message: any) {
		const form = this.getForm();
		const { name } = this.props;

		return form.setError(name, message);
	}

	isValidating() {
		const form = this.getForm();
		const { name } = this.props;

		return form.isFieldValidating(name);
	}

	validate(callback?: ValidationCallback | null, triggerType: TriggerType = "none") {
		const form = this.getForm();
		const { name } = this.props;

		form.validateField(name, callback, triggerType);
	}

	getValue() {
		const form = this.getForm();
		const { name } = this.props;

		return form.getValue(name);
	}

	setValue(value: any, callback?: ValueChangeCallback) {
		const form = this.getForm();
		const { name } = this.props;

		form.setValue(name, value, callback);
	}

	triggerValidate(triggerType: TriggerType) {
		const validateDelay = this.getValidateDelay();

		if (validateDelay > 0) {
			if (this._validateTimer) clearTimeout(this._validateTimer);
			this._validateTimer = (setTimeout(() => {
				this.validate(null, triggerType);
			}, validateDelay) as unknown) as number;
		} else {
			this.validate(null, triggerType);
		}
	}

	handleChange = (value: any, callback?: () => void) => {
		this.setValue(value, formValue => {
			callback && callback();

			if (this.hasValidateTrigger("change")) {
				this.triggerValidate("change");
			}
		});
	};

	handleFocus = (callback?: () => void) => {
		const clearErrorOnFocus = this.getProp("clearErrorOnFocus");
		callback && callback();

		if (clearErrorOnFocus) {
			if (this._validateTimer) clearTimeout(this._validateTimer);
			this.cleanError();
		}
	};

	handleBlur = (callback?: () => void) => {
		callback && callback();

		if (this.hasValidateTrigger("blur")) {
			this.triggerValidate("blur");
		}
	};

	normalizeChildrenProps(): FormItemChildrenProps {
		let { normalize, name, onChange, onFocus, onBlur } = this.props;
		const form = this.getForm();

		const _normalize = this.getFormProp(
			"normalizeFieldValue",
			(_: string, value: any) => value
		);

		if (!normalize) {
			normalize = _normalize.bind(null, name);
		}

		const getInputProps = this.getFormProp("getInputProps", () => ({}));

		const customProps = getInputProps(this);
		//valueTrigger 	收集子节点的值的时机，暂不开发...
		return {
			value: this.getValue(),
			...customProps,
			onChange: (value, e?: React.SyntheticEvent) => {
				const formValue = form.getFormValue();
				const prevValue = this.getValue();

				if (normalize) {
					value = normalize(value, prevValue, formValue);
				}

				this.handleChange(value, () => {
					onChange && onChange(value, e);
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

	normalizeChildren(children: React.ReactNode) {
		return !React.isValidElement(children)
			? children
			: React.cloneElement(React.Children.only(children), this.normalizeChildrenProps());
	}

	getFormProp<T extends keyof FormProps>(prop: T, defaultValue: Required<FormProps>[T]) {
		const form = this.getForm();
		const formProps = form.props as Required<FormProps>;

		return prop in formProps ? formProps[prop] : defaultValue;
	}

	getProp<T extends CommonProps>(prop: T, defaultValue?: FormItemProps[T]) {
		const form = this.getForm();
		const formProps = form.props;
		const props = this.props;

		return prop in props ? props[prop] : prop in formProps ? formProps[prop] : defaultValue;
	}

	getFormItemContext(this: FormItem) {
		return { formItem: this };
	}

	getPrefixCls() {
		const form = this.getForm();
		return form.props.prefixCls;
	}

	render() {
		const {
			name,
			label,
			labelFor,
			showRequiredMark,
			required,
			className,
			style,
			renderExtra,
			children,
		} = this.props;

		const prefixCls = this.getPrefixCls() + "-item";

		const disableValidator = this.getProp("disableValidator");
		const inline = this.getProp("inline");
		const labelPosition = this.getProp("labelPosition");
		const labelAlign = this.getProp("labelAlign");
		const _renderControlExtra = this.getFormProp("renderControlExtra", (_: any) => null);
		const renderControlExtra = () => {
			if (renderExtra) {
				return renderExtra(this);
			}

			return _renderControlExtra(this);
		};

		const hasError = this.hasError();
		const isValidating = this.isValidating();

		const child = isFunction(children)
			? children(this.normalizeChildrenProps(), this)
			: this.normalizeChildren(children);

		return (
			<FormItemContext.Provider value={this.getFormItemContext()}>
				<div
					data-name={name}
					style={style}
					ref={this.saveDOM}
					className={classnames(prefixCls, {
						[`${prefixCls}-inline`]: inline,
						[`${prefixCls}-${labelPosition}`]: labelPosition,
						[`has-error`]: hasError,
						[`is-validating`]: isValidating,
						[`is-required`]: (required || showRequiredMark) && !disableValidator,
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
										labelAlign === "left" && labelPosition === "left",
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
