import Form from "./Form";
import FormItem from "./FormItem";
import NativeField from "./NativeField";
import FormContext from "./FormContext";

export { Form, FormItem, NativeField, FormContext };

Form.Item = FormItem;
Form.NativeField = NativeField;
Form.Context = FormContext;

export default Form;
