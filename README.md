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
| component |- | string\|ReactNode |  |
| prefix | 带有前缀图标的 input | string\|ReactNode |  |
| prefixProps | 前缀图标属性 | object |  |
| suffix | 带有后缀图标的 input | string\|ReactNode |  |
| suffixProps | 后缀图标属性 | object |  |
| type | 声明 input 类型，同原生 input 标签的 type 属性，见：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#属性)。 | string | `text` |
| onChange | 输入框内容变化时的回调 | function(value,e) | |
| onPressEnter | 按下回车的回调 | function(e) |  |
| allowClear | 可以点击清除图标删除内容 | boolean | |

Input 的其他属性和 React 自带的 [input](https://facebook.github.io/react/docs/events.html#supported-events) 一致。

### FormItem
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| enterButton | 是否有确认按钮，可设为按钮文字。该属性会与 append 冲突。 | boolean\|ReactNode | false |
| onSearch | 点击搜索或按下回车键时的回调 | function(value, event) |  |

其余属性和 Input 一致。

### NativeField
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autosize | 自适应内容高度，可设置为 `true|false` 或对象：`{ minRows: 2, maxRows: 6 }` | boolean\|object | false |

其余属性和 Input 一致。

