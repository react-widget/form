# Form

`npm install --save react-widget-form`

```ts
import {
    Form,
    FormItem,
    NativeInput,
    FormContext,
    FormItemContext,
    useForm,
    useFormItem
}  from 'react-widget-form'

```

## Props

### Types

```ts
type ValidateTriggerType = "change" | "blur" | "none";

type Validator = (
    value: any,
    formValue: {},
    triggerType: ValidateTriggerType
) => boolean | string | Error | Promise;

type InvalidError = {
    name: string;
    message: any;
};

```

### Form

```ts
children: ((form: Form) => React.ReactNode) | React.ReactNode;
prefixCls?: string;
className?: string;
style?: React.CSSProperties;
path2obj?: boolean;
defaultFormValue?: {};
formValue?: {};
getDefaultFieldValue?: (name: string) => any;
renderFieldExtra?: (
    component: FormItem
) => React.ReactNode;
validators?: {
    [name: string]: Validator | Validator[];
};
requiredMessage?: string;
validateDelay?: number;
validateTrigger?: ValidateTriggerType | ValidateTriggerType[];
asyncTestDelay?: number;
component?: React.ElementType;
labelWidth?: string | number;
labelClassName?: string;
labelStyle?: React.CSSProperties;
labelPosition?: "top" | "left";
labelAlign?: "left" | "right";
controlStyle?: React.CSSProperties;
controlClassName?: string;
clearErrorOnFocus?: boolean;
inline?: boolean;
normalizeFieldValue?: (value: any, prevValue: any, formValue: {}) => any;
onSubmit?: (e: React.SyntheticEvent) => void;
onChange?: (formValue: {}) => void;
getInputProps?: (component: FormItem) => {};
```

### FormItem

```ts
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
labelAlign?: "left" | "right";
controlStyle?: React.CSSProperties;
controlClassName?: string;
showRequiredMark?: boolean;
required?: boolean;
requiredMessage?: string;
clearErrorOnFocus?: boolean;
normalize?: (value: any, prevValue: any, formValue: {}) => any;
renderExtra?: (component: FormItem) => React.ReactNode;
validateDelay?: number;
validateTrigger?: ValidateTriggerType | ValidateTriggerType[];
inline?: boolean;
onChange?: (value: any) => void;
onFocus?: (e: React.SyntheticEvent) => void;
onBlur?: (e: React.SyntheticEvent) => void;
```

FormItem的会覆盖child的部分属性，覆盖属性如下:

如果child的值发生改变必须要调用`onChange`来更新`Form`的状态，同样child发生`focus` `blur`最好也要调用`onFocus` `onBlur`

- 【重要】 `onChange` 会触发 `validateTrigger` 及 Form的`onChange`
- `onFocus` 会触发`clearErrorOnFocus`行为
- `onBlur` 会触发`validateTrigger`行为

```ts
{
    value: any;
    onChange: (value: any) => void;
    onFocus: (e: React.SyntheticEvent) => void;
    onBlur: (e: React.SyntheticEvent) => void;
    [propName: string]: any;
}
```

由于FormItem的`onChange`接收的是一个值，所以不能直接使用原生表单组件或其他并非直接提供值的组件，例如：
```jsx
//这是错误的，onChange会将Event当作值赋值给formValue，可能导致预期不一致
//ERROR
<FormItem name="email">
    <input type="text" />
</FormItem>

//正确写法一：
<FormItem name="email">
    {
        (props) => {
            
            return <input {...props} type="text" onChange={e => props.onChange(e.target.value)} />
        } 
    }
</FormItem>

//正确写法二：
function Input(props){
    return <input {...props} type="text" onChange={e => props.onChange(e.target.value)} /> 
}
<FormItem name="email">
    <Input />
</FormItem>

//正确写法三，使用NativeInput：
<FormItem name="email">
    <NativeInput component="input" />
</FormItem>
```


### NativeInput

```ts
component: React.ElementType;
onChange?: (value: any) => void;
inputRef?: (dom: any) => void;
[others: string]: any;
```

> others 会传递给component组件

`NativeInput`是为了解决`onChange`返回事件的情况下做了简单的处理，封装代码如下:
```js
export default function NativeInput(props) {
    const {
        component: Component = "input",
        value,
        inputRef,
        onChange,
        ...others
    } = props;

    const onInputChange = e => {
        const value = e.target.value;
        onChange && onChange(value, e);
    };

    return (
        <Component
            ref={inputRef}
            onChange={onInputChange}
            value={value}
            {...others}
        />
    );
}

```

## Methods

### Form
```ts
{
    getValue(name: string): any;
    getInitialFormValue(): {};
    reset(cb: () => void): void;
    getInitialValue(name: string): any;
    resetField(cb: () => void): void;
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
        callback: (errors: null | InvalidError[], formValue: {},isAbort: true | undefined) => void,
        triggerType: ValidateTriggerType
    ): boolean;
    validate(
        callback: (errors: null | InvalidError[], formValue: {},isAbort: true | undefined) => void,
        triggerType: ValidateTriggerType
    ): boolean;
    validateAndScroll(
        callback: (errors: null | InvalidError[], formValue: {},isAbort: true | undefined) => void,
        triggerType: ValidateTriggerType
    ): boolean;
}
```

### FormItem 
```ts
{
    getDOM(): any;
    getForm(): Form;
    getInitialValue(): any;
    reset(cb: () => void): void;
    getValue(): any;
    setValue(value: any, callback: (formValue: {}) => void): void;
    hasError(): boolean;
    getError(): any;
    cleanError(): void;
    setError(message: any): void;
    isValidating(): boolean;
    validate(
        callback: (errors: null | InvalidError[], formValue: {},isAbort: true | undefined) => void,
        triggerType: ValidateTriggerType
    ): boolean;
}
```

## hooks

- useForm
- useFormItem


## 基础样式

```scss
$form-item-cls: nex-form-item;

.#{$form-item-cls} {
    display: flex;

    &-inline {
        display: inline-flex;
    }

    &-label {
        text-align: right;
        flex: none;
    }

    &-label-left {
        text-align: left;
    }

    &-top {
        display: block;
    }

    &-top.#{$form-item-cls}-inline {
        display: inline-block;
        vertical-align: top;
    }

    &-top &-label {
        text-align: left;
        display: block;
    }

    &-control {
        position: relative;
        flex: 1;
    }

    &.is-required &-label:before {
        content: "*";
        display: inline-block;
        margin-right: 4px;
        font-family: SimSun;
        color: red;
    }
}


```



