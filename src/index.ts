import BaseForm from "./Form";
import FormItem from "./FormItem";
import NativeField from "./NativeField";
import FormContext from "./FormContext";
import FormItemContext from "./FormItemContext";
import useForm from "./useForm";
import useFormItem from "./useFormItem";

type BaseFormType = typeof BaseForm;
interface Form extends BaseFormType {
	Item: typeof FormItem;
	useForm: typeof useForm;
	useFormItem: typeof useFormItem;
	Context: typeof FormContext;
	ItemContext: typeof FormItemContext;
	NativeField: typeof NativeField;
}

const Form: Form = BaseForm as Form;

Form.Item = FormItem;
Form.useForm = useForm;
Form.Context = FormContext;
Form.useFormItem = useFormItem;
Form.ItemContext = FormItemContext;
Form.NativeField = NativeField;

export const version = "%VERSION%";

export {
	BaseForm as Form,
	FormItem,
	NativeField,
	FormContext,
	FormItemContext,
	useForm,
	useFormItem,
};

export default Form;
