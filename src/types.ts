export type FormValue = Record<string, any>;

export type TriggerType = "change" | "blur" | "none";

export type ValidationError = Record<string, any>;

export type ValueChangeCallback = (fromValue: FormValue) => void;

export type ValidationCallback = (
    errors: ValidationError | null,
    value: any,
    state?: boolean
) => void;

export type Validator = (
    value: any,
    formValue: FormValue,
    triggerType: string
) => boolean | null | undefined | PromiseLike<any>;
