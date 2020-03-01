import React, { Component } from "react";

import { Form, FormItem, NativeField, FormContext } from "../../lib/index";

function FormItemField({
    type = "text",
    component = "input",
    children,
    ...resetProps
}) {
    return (
        <FormItem
            {...resetProps}
            style={{
                marginBottom: 24,
            }}
        >
            <NativeField
                component={component}
                type={type}
                children={children}
            />
        </FormItem>
    );
}

export default class DEMO extends Component {
    state = {
        formValue: {
            username: "默认",
            password: "",
            password2: "",
            email: "",
        },
    };

    reset = e => {
        e.preventDefault();
        if (this.form) {
            this.form.reset(() => {
                console.log(23);
                // this.forceUpdate();
            });
        }
        // this.setState({
        //     formValue: {
        //         username: "",
        //         password: "",
        //         password2: "",
        //         email: ""
        //     }
        // });

        // this.form.cleanErrors();
    };

    onSubmit = e => {
        e.preventDefault();

        if (this.form) {
            this.form.validateAndScroll(errors => {
                console.log(errors);
            });
        }
    };

    renderFieldExtra = component => {
        return (
            <div
                style={{
                    position: "absolute",
                    color: "red",
                    top: "100%",
                }}
            >
                {component.isValidating() ? "校验中..." : component.getError()}
            </div>
        );
    };

    render() {
        const { formValue } = this.state;

        return (
            <div>
                <Form
                    // disableValidator
                    labelWidth={80}
                    // validateTrigger={["change", "blur"]}
                    getDefaultFieldValue={() => ""}
                    requiredMessage="不能为空"
                    ref={form => ((this.form = form), (window._form = form))}
                    labelAlign="right"
                    formValue={formValue}
                    onChange={formValue => this.setState({ formValue })}
                    onSubmit={this.onSubmit}
                    renderControlExtra={this.renderFieldExtra}
                >
                    <div>
                        <FormItemField
                            required
                            validateDelay={200}
                            labelPosition="top"
                            name="A1"
                            label="A1:"
                        />
                        <FormItemField
                            required
                            name="username"
                            label="用户名:"
                        />
                        <FormItemField
                            required
                            name="password"
                            label="登录密码:"
                        />
                        <FormItemField
                            required
                            name="password2"
                            label="密码确认:"
                        />
                        <FormItemField
                            required
                            name="email"
                            label="邮箱地址:"
                            validator={(value, formValue, triggerType) => {
                                console.log(triggerType);
                                return new Promise((resolve, reject) => {
                                    setTimeout(resolve, 2000);
                                });
                            }}
                        />
                        <button>submit</button>
                        <button onClick={this.reset}>reset</button>
                    </div>
                    {/* {form => {
                        return (
                            <div>
                                <FormItemField
                                    required
                                    validateDelay={200}
                                    labelPosition="top"
                                    name="A1"
                                    label="A1:"
                                />
                                <FormItemField
                                    required
                                    name="username"
                                    label="用户名:"
                                />
                                <FormItemField
                                    required
                                    name="password"
                                    label="登录密码:"
                                />
                                <FormItemField
                                    required
                                    name="password2"
                                    label="密码确认:"
                                />
                                <FormItemField
                                    required
                                    name="email"
                                    label="邮箱地址:"
                                    validator={value => {
                                        return new Promise(
                                            (resolve, reject) => {
                                                setTimeout(resolve, 2000);
                                            }
                                        );
                                    }}
                                />
                                <button>submit</button>
                                <button onClick={this.reset}>reset</button>
                            </div>
                        );
                    }} */}
                </Form>
            </div>
        );
    }
}
