import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Form } from "../src";
import React from "react";

configure({ adapter: new Adapter() });

test("Form with className", () => {
	const wrapper = mount(<Form className="form-test"></Form>);
	expect(wrapper.html()).toEqual(`<form class="rw-form form-test"></form>`);
});
test("Form with component -1", () => {
	const wrapper = mount(<Form component="div"></Form>);
	expect(wrapper.html()).toEqual(`<div class="rw-form"></div>`);
});
test("Form with component -2", () => {
	function FormComponent(props) {
		return (
			<div>
				<div {...props} />
			</div>
		);
	}
	const wrapper = mount(<Form component={FormComponent}></Form>);
	expect(wrapper.html()).toEqual(`<div><div class=\"rw-form\"></div></div>`);
});
test("Form with style", () => {
	const wrapper = mount(
		<Form
			style={{
				fontSize: 12,
			}}
		></Form>
	);
	expect(wrapper.html()).toEqual(`<form style="font-size: 12px;" class="rw-form"></form>`);
});
