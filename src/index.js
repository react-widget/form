import Form from "./Form";
import FormItem from "./FormItem";
import NativeInput from "./NativeInput";
import FormContext from "./FormContext";
import FormItemContext from "./FormItemContext";
import useForm from "./useForm";
import useFormItem from "./useFormItem";

export {
    Form,
    FormItem,
    NativeInput,
    NativeInput as NativeField,
    FormContext,
    FormItemContext,
    useForm,
    useFormItem,
};

Form.Item = FormItem;
Form.NativeInput = NativeInput;
Form.NativeField = NativeInput;
Form.Context = FormContext;
Form.ItemContext = FormItemContext;

export default Form;
