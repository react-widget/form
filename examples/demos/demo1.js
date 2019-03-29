import React, { Component } from 'react';
import Input from 'react-widget-input';
import Icon from 'react-widget-icon'
import {
    Form,
    FormItem,
    NativeField,
} from '../../src/index';



export default class DEMO extends Component {

    state = {
        formValue: {
            name: '',
            info: {
                gender: '男'
            }
        }
    }

    reset = (e) => {
        e.preventDefault();
        this.setState({
            formValue: {
                name: 'haha',
                info: {
                    gender: '男'
                }
            }
        });

        this.form.cleanErrors();
    }

    onSubmit = (e) => {
        e.preventDefault();

        if (this.form) {
            this.form.validateAndScroll(errors => {
                console.log(errors)
            });
        }
    }

    getRules() {

        return {
            'info.address': {
                type: "email",
                message: "emial 错误..."
            },
            name: {
                required: true,
                message: "必填"
            },
            // name(rule, value, callback) {
            //     setTimeout(() => {
            //         if (value.length < 5) {
            //             callback(('必须多于5个字符'))
            //         } else {
            //             callback()
            //         }
            //     }, 20000)
            // }
        }
    }

    render() {
        const { formValue } = this.state;

        return (
            <div>
                <Form
                    ref={form => this.form = form}
                    formValue={formValue}
                    onChange={(formValue) => this.setState({ formValue })}
                    onSubmit={this.onSubmit}
                    rules={this.getRules()}
                    inline
                    validateTrigger="blur"
                >
                    {form => {
                        return (
                            <div>
                                <FormItem labelFor="12" name="goods" validateTrigger="change" required label="姓名" inline>
                                    <Input
                                        id="12"
                                        allowClear
                                        prepend="http://"
                                        append=".com"
                                        prefix={<Icon type="ios-contact" />}
                                        suffix={<Icon type="ios-contact" />}
                                    />
                                </FormItem>
                                <FormItem name="name" label="姓名" inline>
                                    <Input
                                        allowClear
                                        disabled
                                        prepend="http://"
                                        append=".com"
                                        prefix={<Icon type="ios-contact" />}
                                        suffix={<Icon type="ios-contact" />}
                                    />
                                </FormItem>
                                <FormItem help="必填选项" name="name" label="姓名" inline>
                                    <Input
                                        size="small"
                                        allowClear
                                        prepend="http://"
                                        append=".com"
                                        prefix={<Icon type="ios-contact" />}
                                        suffix={<Icon type="ios-contact" />}
                                    />
                                </FormItem>
                                <FormItem name="name" label="姓名" inline>
                                    <Input size="small" />
                                </FormItem>
                                <FormItem labelWidth={100} name="name" label="姓名">
                                    <Input />
                                </FormItem>
                                <FormItem name="name" labelWidth={100} labelPosition="right" label="姓名" inline>
                                    <Input />
                                </FormItem>
                                <FormItem name="name" label="姓名" inline>
                                    <Input />
                                </FormItem>
                                <FormItem name="name" labelPosition="top" label="姓名" >
                                    <Input />
                                </FormItem>
                                <FormItem name="name" labelPosition="top" label="姓名" inline>
                                    <Input />
                                </FormItem>
                                <FormItem name="name" label="姓名">
                                    <NativeField component="input" />
                                </FormItem>
                                <div>
                                    {
                                        form.isValidatingField('name') ? '数据校验中...' : null
                                    }
                                </div>
                                <FormItem name="info.gender" label="性别">
                                    <NativeField component="input" />
                                </FormItem>
                                <FormItem name="info.age" label="年龄" normalize={v => parseInt(v) || ''}>
                                    <NativeField component="input" />
                                </FormItem>
                                <FormItem name="info.address" label="地址">
                                    <NativeField component="input" />
                                </FormItem>
                                <FormItem name="info.list[0]" label="L1">
                                    <NativeField component="input" />
                                </FormItem>
                                <FormItem name="info.list[1]" label="L2">
                                    <NativeField component="input" />
                                </FormItem>
                                <FormItem name="info.country" label="国籍">
                                    <NativeField component="select">
                                        <option value="中国">中国</option>
                                        <option value="美国">美国</option>
                                        <option value="澳大利亚">澳大利亚</option>
                                    </NativeField>
                                </FormItem>
                                <FormItem name="info.desc" label="备注" alignItems="top">
                                    <NativeField component="textarea" />
                                </FormItem>
                                <pre>
                                    {JSON.stringify(formValue)}
                                </pre>
                                <pre>
                                    {JSON.stringify(form.getError())}
                                </pre>
                                <button>submit</button>
                                <button onClick={this.reset}>reset</button>
                            </div>
                        )
                    }}

                </Form>
            </div >
        );
    }

}
