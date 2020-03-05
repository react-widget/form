export type FormValue = Record<string, any>;

export type TriggerType = "change" | "blur" | "none";

export type ValidateTrigger = TriggerType | TriggerType[];

export type ValidationError = { name: string; message: any };

export type ValueChangeCallback = (fromValue: FormValue) => void;

export type ValidationCallback = (
	errors: ValidationError[] | null,
	value: any,
	isAbort?: boolean
) => void;

export type Validator<T = boolean | null | undefined | PromiseLike<any> | any> = (
	value: any,
	formValue: FormValue,
	triggerType: TriggerType
) => T;

export type FormItemChildrenProps = {
	value: any;
	onChange: (value: any, e?: React.SyntheticEvent) => void;
	onFocus: (e: React.FocusEvent) => void;
	onBlur: (e: React.FocusEvent) => void;
	[x: string]: any;
};
