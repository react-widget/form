import React, { Component } from "react";

import { Form, FormItem, NativeInput } from "../../src/index";

function Input(props) {
    return (
        <NativeInput
            {...props}
            className=""
            type="text"
            style={{
                height: 32,
                padding: "4px 7px"
            }}
            component="input"
        />
    );
}

export default class DEMO extends Component {
    state = {
        formValue: {
            name: "",
            info: {
                gender: "男"
            }
        }
    };

    reset = e => {
        e.preventDefault();
        this.setState({
            formValue: {
                name: "haha",
                info: {
                    gender: "男"
                }
            }
        });

        this.form.cleanErrors();
    };

    onSubmit = e => {
        e.preventDefault();

        if (this.form) {
            this.form.validateAndScroll(errors => {
                console.log(errors);
            });
        }
    };

    getRules() {
        return {
            "info.address": function() {
                return false;
            },
            name: function(value) {
                return value === "" ? "不能为空" : true;
            }
        };
    }

    renderFieldExtra = component => {
        return (
            <div
                style={{
                    color: "red",
                    top: "100%"
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
                    getDefaultFieldValue={() => ""}
                    ref={form => (this.form = form)}
                    formValue={formValue}
                    validators={this.getRules()}
                    onChange={formValue => this.setState({ formValue })}
                    onSubmit={this.onSubmit}
                    renderFieldExtra={this.renderFieldExtra}
                    validateTrigger="blur"
                    inline
                >
                    {form => {
                        return (
                            <div>
                                <FormItem
                                    labelFor="12"
                                    name="goods"
                                    validateTrigger="change"
                                    required
                                    label="姓名"
                                    inline
                                >
                                    <Input />
                                </FormItem>
                                <FormItem name="name" label="姓名" inline>
                                    <Input />
                                </FormItem>
                                <FormItem
                                    help="必填选项"
                                    name="name"
                                    label="姓名"
                                    inline
                                >
                                    <Input />
                                </FormItem>
                                <FormItem name="name" label="姓名" inline>
                                    <Input size="small" />
                                </FormItem>
                                <FormItem
                                    labelWidth={100}
                                    name="name"
                                    label="姓名"
                                >
                                    <Input />
                                </FormItem>
                                <FormItem
                                    name="name"
                                    labelWidth={100}
                                    label="姓名"
                                    inline
                                >
                                    <Input />
                                </FormItem>
                                <FormItem name="name" label="姓名" inline>
                                    <Input />
                                </FormItem>
                                <FormItem
                                    name="name"
                                    labelPosition="top"
                                    label="姓名"
                                >
                                    <Input />
                                </FormItem>
                                <FormItem
                                    name="name"
                                    labelPosition="top"
                                    label="姓名"
                                    inline
                                >
                                    <Input />
                                </FormItem>
                                <FormItem name="name" label="姓名">
                                    <NativeInput component="input" />
                                </FormItem>
                                <div>
                                    {form.isFieldValidating("name")
                                        ? "数据校验中..."
                                        : null}
                                </div>
                                <FormItem name="info.gender" label="性别">
                                    <NativeInput component="input" />
                                </FormItem>
                                <FormItem
                                    name="info.age"
                                    label="年龄"
                                    normalize={v => parseInt(v) || ""}
                                >
                                    <NativeInput component="input" />
                                </FormItem>
                                <FormItem name="info.address" label="地址">
                                    <NativeInput component="input" />
                                </FormItem>
                                <FormItem
                                    name="info.list[0]"
                                    label="L1"
                                    validator={value => {
                                        return new Promise(
                                            (resolve, reject) => {
                                                setTimeout(
                                                    value
                                                        ? resolve
                                                        : () =>
                                                              reject(
                                                                  "校验失败"
                                                              ),
                                                    2000
                                                );
                                            }
                                        );
                                    }}
                                >
                                    <NativeInput component="input" />
                                </FormItem>
                                <div>
                                    {form.isFieldValidating("info.list[0]")
                                        ? "数据校验中..."
                                        : null}
                                </div>
                                <FormItem
                                    name="info.list[1]"
                                    label="L2"
                                    validator={value => {
                                        return new Promise(
                                            (resolve, reject) => {
                                                setTimeout(
                                                    value
                                                        ? resolve
                                                        : () =>
                                                              reject(
                                                                  "校验失败"
                                                              ),
                                                    1000
                                                );
                                            }
                                        );
                                    }}
                                >
                                    <NativeInput component="input" />
                                </FormItem>
                                <div>
                                    {form.isFieldValidating("info.list[1]")
                                        ? "数据校验中..."
                                        : null}
                                </div>
                                <FormItem name="info.country" label="国籍">
                                    <NativeInput component="select">
                                        <option value="中国">中国</option>
                                        <option value="美国">美国</option>
                                        <option value="澳大利亚">
                                            澳大利亚
                                        </option>
                                    </NativeInput>
                                </FormItem>
                                <FormItem
                                    name="info.desc"
                                    label="备注"
                                    alignItems="top"
                                >
                                    <NativeInput component="textarea" />
                                </FormItem>
                                {form.isValidating() ? "表单校验中..." : null}
                                <pre>{JSON.stringify(formValue)}</pre>
                                <pre>{JSON.stringify(form.getError())}</pre>
                                <button>submit</button>
                                <button onClick={this.reset}>reset</button>
                            </div>
                        );
                    }}
                </Form>
            </div>
        );
    }
}
