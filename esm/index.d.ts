import React from "react";

declare namespace ReactWidgetForm {
    type ValidateTriggerType = "change" | "blur" | "none";

    type Validator = (
        value: any,
        formValue: {}
    ) => boolean | string | Error | Promise;

    interface FormProps {
        children: ((form: Form) => React.ReactNode) | React.ReactNode;
        prefixCls?: string;
        className?: string;
        style?: React.CSSProperties;
        path2obj?: boolean;
        defaultFormValue?: {};
        formValue?: {};
        getDefaultFieldValue?: (name: string) => any;
        renderFieldExtra?: (
            component: FormItem,
            name: string
        ) => React.ReactNode;
        validators?: {
            [name: string]: Validator | Validator[];
        };
        validateDelay?: number;
        validateTrigger?: ValidateTriggerType | ValidateTriggerType[];
        asyncTestDelay?: number;
        component?: React.ElementType;
        labelWidth?: string | number;
        labelClassName?: string;
        labelStyle?: React.CSSProperties;
        labelPosition?: "top" | "left";
        controlStyle?: React.CSSProperties;
        controlClassName?: string;
        clearErrorOnFocus?: boolean;
        inline?: boolean;
        onSubmit?: (e: React.SyntheticEvent) => void;
        onChange?: (formValue: {}) => void;
        getInputProps?: (component: FormItem, name: string) => {};
    }
    interface FormItemProps {
        children:
            | ((props: FormItemChildProps, item: FormItem) => React.ReactNode)
            | React.ReactNode;
        prefixCls?: string;
        name?: string;
        className?: string;
        style?: React.CSSProperties;
        validator?: Validator | Validator[];
        label?: React.ReactNode;
        labelFor?: string;
        labelWidth?: string | number;
        labelClassName?: string;
        labelStyle?: React.CSSProperties;
        labelPosition?: "top" | "left";
        controlStyle?: React.CSSProperties;
        controlClassName?: string;
        required?: boolean;
        requiredMessage?: string;
        clearErrorOnFocus?: boolean;
        normalize?: (value: any) => any;
        renderExtra?: (component: FormItem) => React.ReactNode;
        validateDelay?: number;
        validateTrigger?: ValidateTriggerType | ValidateTriggerType[];
        inline?: boolean;
        onChange?: (value: any) => void;
        onFocus?: (e: React.SyntheticEvent) => void;
        onBlur?: (e: React.SyntheticEvent) => void;
    }

    interface FormItemChildProps {
        value: any;
        onChange: (value: any) => void;
        onFocus: (e: React.SyntheticEvent) => void;
        onBlur: (e: React.SyntheticEvent) => void;
        [propName: string]: any;
    }

    type InvalidError = {
        name: string;
        message: any;
    };

    interface NativeInputProps {
        component: React.ElementType;
        onChange?: (value: any) => void;
        inputRef?: (dom: any) => void;
        [propName: string]: any;
    }

    export class Form extends React.Component<FormProps, {}> {
        getValue(name: string): any;
        setValue(
            name: string,
            value: any,
            callback: (formValue: {}) => void
        ): void;
        setValues(formValue: {}, callback: (formValue: {}) => void): void;
        hasError(name: string): boolean;
        getError(name: string): any;
        cleanError(name: string): void;
        setError(name: string): void;
        cleanErrors(): void;
        setErrors(errors: {}): void;
        isFieldValidating(name: string): boolean;
        isValidating(): boolean;
        validateField(
            name: string,
            callback: (
                errors: null | InvalidError[],
                formValue: {},
                isAbort: true | undefined
            ) => void,
            triggerType: ValidateTriggerType
        ): boolean;
        validate(
            callback: (
                errors: null | InvalidError[],
                formValue: {},
                isAbort: true | undefined
            ) => void,
            triggerType: ValidateTriggerType
        ): boolean;
        validateAndScroll(
            callback: (
                errors: null | InvalidError[],
                formValue: {},
                isAbort: true | undefined
            ) => void,
            triggerType: ValidateTriggerType
        ): boolean;
    }
    export class FormItem extends React.Component<FormItemProps, {}> {
        getDOM(): any;
        getForm(): Form;
        getValue(): any;
        setValue(value: any, callback: (formValue: {}) => void): void;
        hasError(): boolean;
        getError(): any;
        cleanError(): void;
        setError(message: any): void;
        isValidating(): boolean;
        validate(
            callback: (
                errors: null | InvalidError[],
                formValue: {},
                isAbort: true | undefined
            ) => void,
            triggerType: ValidateTriggerType
        ): boolean;
    }
    export class NativeInput extends React.Component<NativeInputProps, {}> {}
}

declare const FormContext: React.Context<ReactWidgetForm.Form>;
declare const FormItemContext: React.Context<ReactWidgetForm.FormItem>;
declare const Form = ReactWidgetForm.Form;
declare const FormItem = ReactWidgetForm.FormItem;
declare const NativeInput = ReactWidgetForm.NativeInput;
declare const useForm = () => ReactWidgetForm.Form;
declare const useFormItem = () => ReactWidgetForm.FormItem;

export { FormContext, FormItemContext, Form, FormItem, NativeInput };