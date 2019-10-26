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
        renderFieldExtra?: (name: string) => React.ReactNode;
        validators?: {
            [name: string]: Validator | Validator[];
        };
        validateDelay?: number;
        validateTrigger?: ValidateTriggerType | ValidateTriggerType[];
        asyncTestDelay?: number;
        component?: React.ElementType;
        labelWidth?: string | number;
        labelStyle?: React.CSSProperties;
        labelPosition?: "top" | "left";
        alignItems?: "top" | "center" | "bottom";
        clearErrorOnFocus?: boolean;
        inline?: boolean;
        onSubmit?: (e: React.SyntheticEvent) => void;
        onChange?: (formValue: {}) => void;
        getInputProps?: (name: string) => {};
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
        labelStyle?: React.CSSProperties;
        labelPosition?: "top" | "left";
        alignItems?: "top" | "center" | "bottom";
        required?: boolean;
        requiredMessage?: string;
        clearErrorOnFocus?: boolean;
        normalize?: (value: any) => any;
        renderExtra?: (formItem: FormItem) => React.ReactNode;
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

    interface NativeFieldProps {
        component: React.ElementType;
        onChange?: (value: any) => void;
        inputRef?: (dom: any) => void;
        [propName: string]: any;
    }

    export class Form extends React.Component<FormProps, {}> {}
    export class FormItem extends React.Component<FormItemProps, {}> {}
    export class NativeField extends React.Component<NativeFieldProps, {}> {}
}

declare const FormContext;
declare const Form = ReactWidgetForm.Form;
declare const FormItem = ReactWidgetForm.FormItem;
declare const NativeField = ReactWidgetForm.NativeField;

export { FormContext, Form, FormItem, NativeField };
