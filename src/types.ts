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

export type Validator = (
    value: any,
    formValue: FormValue,
    triggerType: string
) => boolean | null | undefined | PromiseLike<any> | any;

export type FormItemChildrenProps = {
    value: any;
    onChange: (value: any) => void;
    onFocus: (e: React.FocusEvent) => void;
    onBlur: (e: React.FocusEvent) => void;
    [x: string]: any;
};
