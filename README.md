# Form

`npm install --save react-widget-form`

## Props

### Form
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | 组件CSS样式前缀 | string | rw-form |
| className | 组件className属性 | string | - |
| style | 组件style属性 | React.CSSProperties | - |
| path2obj | 是否启用lodash.get、是否启用lodash.set来获取、设置formValue的值 | boolean | true |
| defaultFormValue | 表单默认数据 | object | {} |
| formValue | 表单数据`受控` | object |  |
| validateDelay |- | number |  |
| validateTrigger |- | string |  |
| validateFieldsAndScroll |- | string |  |
| showMessage |- | string |  |
| component | 表单默认元素 | React.Element | form  |
| rules | 验证规则 | object\|array\|function | null  |
| labelWidth | 表单标签域宽度 | number\|string | - |
| labelPosition | 表单标签域位置 | `top` `left` `right` | left |
| alignItems | 表单控制表单项的alignItems的属性 | string | center |
| inline | 行内表单模式 | function(value,e) | |
| onSubmit | 只有当原生表单的onSubmit事件 | function(e) |  |
| onChange | 按下回车的回调 | function(formValue, e) |  |
| getFormItemInputProps | 自定义表单输入框控件的属性 | function(e) |  |


### FormItem
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| - | - | - | - |
| - | - | - |

### NativeField
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| component | 接收`value` `onChange(e)`的控件 | React.Element | input |

其余属性传递给component。

