(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{128:function(e,t,a){},129:function(e,t,a){},130:function(e,t,a){},180:function(e,t,a){"use strict";a.r(t);var r=a(0),i=a.n(r),l=a(92),n=a.n(l),s=(a(128),a(129),a(130),a(12),a(83),a(27),a(4)),o=a.n(s),m=(a(45),a(31)),h=a.n(m),u=a(32),c=a.n(u),d=(a(133),a(86),a(134),a(26),a(136),a(15)),p=a.n(d),g=a(55),f=a.n(g),E=a(93),V=a.n(E),b=a(20),v=a.n(b),F=i.a.createContext({form:{}});function y(){}class C extends i.a.Component{constructor(e,t){super(e,t),this.fieldLocks={},this.formLockId=1,this._isFormValidating=!1,this.fields=[],this._validateCb=[],this.handleSubmit=e=>{e.preventDefault()},this.state={formError:{},validatingFields:{},formValue:e.defaultFormValue||{}}}static getDerivedStateFromProps(e,t){return{formValue:e.formValue||t.formValue}}addField(e){this.fields.push(e)}removeField(e){var t=this.fields.indexOf(e);if(-1!==t){const a=e.props.name;this.state.formError[a]=null,this.fields.splice(t,1)}}getFieldByName(e){const t=this.fields;for(let a=0;a<t.length;a++)if(e===t[a].props.name)return t[a];return null}getInitialFormValue(){const e={};return this.fields.forEach(t=>{e[t.props.name]=t._initialValue}),e}reset(e){const t=this.getInitialFormValue();this.fieldLocks={},this.formLockId=1,this._isFormValidating=!1,this.state.validatingFields={},this.state.formValue=t,this.state.formError={},this.setValues({},e)}getInitialValue(e){let t;return this.fields.forEach(a=>{a.props.name===e&&(t=a.getInitialValue())}),t}resetField(e,t){this.cleanError(e);let a=this.getInitialValue(e);this.fieldLocks[e]=1,this.state.validatingFields[e]=!1,this.state.formError[e]=null,this.setValue(e,a,t)}getFormValue(){return this.state.formValue}getValues(){return this.state.formValue}setValues(e={},t){const a=this.props,r=a.path2obj,i=a.onChange,l=this.state.formValue,n="formValue"in this.props,s=l;Object.keys(e).forEach(t=>{const a=e[t];r?f()(s,t,a):s[t]=a}),n||this.setState({formValue:s}),i&&i(s),t&&this._validateCb.push(t)}setFormValue(e,t){return this.setValues(e,t)}getValue(e){const t=this.props.getDefaultFieldValue,a=this.props.path2obj,r=this.state.formValue,i=a?V()(r,e):r[e];return void 0===i&&t?t(e,r):i}setValue(e,t,a){const r=this.props,i=r.path2obj,l=r.onChange,n=this.state.formValue,s="formValue"in this.props,o=n;i?f()(o,e,t):o[e]=t,s||this.setState({formValue:o}),l&&l(o),a&&this._validateCb.push(a)}getFieldValue(e){return this.getValue(e)}setFieldValue(e,t,a){return this.setValue(e,t,a)}componentDidUpdate(){const e=this.state.formValue,t=this._validateCb;this._validateCb=[],t.forEach(t=>{t(e)})}componentWillUnmount(){this._validateCb=[]}isDisableValidator(e){return arguments.length?this.isDisableValidatorField(e):this.props.disableValidator}isDisableValidatorField(e){const t=this.getFieldByName(e);return!t||t.getProp("disableValidator",!1)}hasError(e){if(this.isDisableValidatorField(e))return!1;return null!=this.state.formError[e]}getError(e){if(this.isDisableValidatorField(e))return null;return this.state.formError[e]}getErrors(){return this.isDisableValidator()?{}:this.state.formError}cleanError(e){const t=this.state.formError;this.hasError(e)&&this.setState({formError:Object.assign({},t,{[e]:null})})}setError(e,t){if(this.isDisableValidatorField(e))return;const a=this.state.formError;this.setState({formError:Object.assign({},a,{[e]:t})})}cleanErrors(){this.setState({formError:{}})}setErrors(e){const t=this.state.formError;this.setState({formError:Object.assign({},t,{},e)})}getFieldValidatorList(e){const t=[];this.fields.filter(t=>t.props.name===e).forEach(a=>{if(a.getProp("disableValidator"))return;const r=a.props;r.required&&t.unshift(t=>!function(e){return void 0===e||null===e||(!(!Array.isArray(e)||e.length)||"string"===typeof e&&!e)}(t)||a.getProp("requiredMessage",e+" check fail")),r.validator&&t.push(...Array.isArray(r.validator)?r.validator:[r.validator])});const a=this.props.validators[e];return a&&t.push(...Array.isArray(a)?a:[a]),t.filter(e=>"function"===typeof e)}isFieldValidating(e){if(this.isDisableValidatorField(e))return!1;return!!this.state.validatingFields[e]}isValidating(){if(this.props.disableValidator)return!1;if(this._isFormValidating)return!0;const e=this.state.validatingFields;return Object.keys(e).some(t=>e[t])}_validateField(e,t,a="none"){t="function"===typeof t?t:y;const r=this.state.formValue,i=this.getValue(e),l=this.getFieldValidatorList(e);if(!l.length)return void t(null,i);const n=(a=null)=>{null===a&&l.length?s():(null!==a&&(Array.isArray(a)||(a=[a]),a=a.map(t=>{let a=t;return t instanceof Error&&(a=t.message),{name:e,message:a}})),t(a,i))},s=()=>{const t=l.shift();if(!t)return;const s=t(i,r,a);!0===s?n():!1===s?n(e+" check fail"):s&&s.then?s.then(()=>n(),e=>n(e)):n(s)};s()}validateField(e,t,a){const r=t||y,i=this.props.asyncTestDelay,l=this.state,n=l.formError,s=l.validatingFields;if(this._isFormValidating)return;this.fieldLocks[e]=this.fieldLocks[e]||1;const o=++this.fieldLocks[e];let m=setTimeout(()=>{m=null,o!==this.fieldLocks[e]||this.isDisableValidatorField(e)||this.setState({validatingFields:Object.assign({},s,{[e]:!0}),formError:Object.assign({},n,{[e]:null})})},i);this._validateField(e,(t,a)=>{m&&clearTimeout(m),o!==this.fieldLocks[e]||this.isDisableValidatorField(e)?r(t,a,!0):this.setState({formError:Object.assign({},n,{[e]:t?t[0].message:null}),validatingFields:Object.assign({},s,{[e]:!1})},()=>{r(t,a)})},a)}validate(e){e="function"===typeof e?e:y;const t={};let a=null,r=!1;const i=this.props.asyncTestDelay,l=this.state.formValue;this.fieldLocks={};const n=++this.formLockId,s=this.fields,o={},m=[];let h=0;this._isFormValidating=!0;const u=()=>{n!==this.formLockId||this.isDisableValidator()||this.setState({formError:t,validatingFields:o})},c=(i,s)=>{if(h--,i&&!this.isDisableValidatorField(s)&&(t[s]=i[0].message,m.push(...i)),h<=0){if(r=!0,a&&(clearTimeout(a),a=null),n!==this.formLockId||this.isDisableValidator())return void e(m.length?m:null,l,!0);this._isFormValidating=!1,this.setState({formError:t,validatingFields:{}},()=>{e(m.length?m:null,l)})}};s.length?(s.forEach(e=>{const t=e.props.name;h++,o[t]=!0}),s.forEach(e=>{const t=e.props.name;let a=!1,r=setTimeout(()=>{a=!0,r=null},i);this._validateField(t,e=>{o[t]=!1,r&&(clearTimeout(r),r=null),a&&u(),c(e,t)})}),a=setTimeout(()=>{a=null,r||u()},i)):e(null,l)}validateAndScroll(e){const t=this.props.scrollIntoView,a="function"===typeof e?e:y;this.validate((e,r,i)=>{if(e){const e=this.fields;for(let a=0;a<e.length;a++){const r=e[a],i=r.props.name;if(this.hasError(i)){const e=r.getDOM();if(t){t(e);break}if(e&&e.scrollIntoView){e.scrollIntoView();break}}}}a(e,r,i)})}getFormContext(){return{form:this}}render(){const e=this.props,t=e.prefixCls,a=e.style,r=e.className,l=e.onSubmit,n=e.component,s=e.children;return i.a.createElement(F.Provider,{value:this.getFormContext()},i.a.createElement(n,{style:a,className:p()(t,r),onSubmit:l||this.handleSubmit},v()(s)?s(this):s))}}C.defaultProps={prefixCls:"rw-form",className:"",style:{},disableValidator:!1,validators:{},path2obj:!0,component:"form",asyncTestDelay:16,validateDelay:0,validateTrigger:["change"],labelPosition:"left",labelAlign:"right",clearErrorOnFocus:!0,inline:!1};var D=C,x=i.a.createContext({formItem:{}});let P=1;class S extends i.a.Component{constructor(e,t){super(e,t),this._fid=P++,this._validateTimer=null,this.saveDOM=e=>{this._dom=e},this.handleChange=(e,t)=>{this.setValue(e,e=>{t&&t(),this.hasValidateTrigger("change")&&this.triggerValidate("change")})},this.handleFocus=e=>{const t=this.getProp("clearErrorOnFocus");e&&e(),t&&(this._validateTimer&&clearTimeout(this._validateTimer),this.cleanError())},this.handleBlur=e=>{e&&e(),this.hasValidateTrigger("blur")&&this.triggerValidate("blur")};const a=this.getForm();this._initialValue=this.getValue(),a.addField(this)}getInitialValue(){return this._initialValue}getDOM(){return this._dom}getForm(){return this.context.form}componentWillUnmount(){this.getForm().removeField(this)}hasValidateTrigger(e="none"){let t=this.getProp("validateTrigger")||[];return-1!==(Array.isArray(t)?t:[t]).indexOf(e)}getValidateDelay(){const e=this.getForm().props.validateDelay,t=this.props;return"validateDelay"in t?t.validateDelay:e}reset(e){const t=this.getForm(),a=this.props.name;t.resetField(a,e)}hasError(){const e=this.getForm(),t=this.props.name;return e.hasError(t)}getError(){const e=this.getForm(),t=this.props.name;return e.getError(t)}cleanError(){const e=this.getForm(),t=this.props.name;return e.cleanError(t)}setError(e){const t=this.getForm(),a=this.props.name;return t.setError(a,e)}isValidating(){const e=this.getForm(),t=this.props.name;return e.isFieldValidating(t)}validate(e,t="none"){const a=this.getForm(),r=this.props.name;a.validateField(r,e,t)}getValue(){const e=this.getForm(),t=this.props.name;return e.getValue(t)}setValue(e,t){const a=this.getForm(),r=this.props.name;a.setValue(r,e,t)}triggerValidate(e){const t=this.getValidateDelay();t>0?(this._validateTimer&&clearTimeout(this._validateTimer),this._validateTimer=setTimeout(()=>{this.validate(null,e)},t)):this.validate(null,e)}normalizeChildrenProps(){let e=this.props,t=e.normalize,a=e.name,r=e.onChange,i=e.onFocus,l=e.onBlur;const n=this.getForm(),s=this.getFormProp("normalizeFieldValue",(e,t)=>t);t||(t=s.bind(null,a));const o=this.getFormProp("getInputProps",()=>({}))(this);return Object.assign({value:this.getValue()},o,{onChange:(e,a)=>{const i=n.getFormValue(),l=this.getValue();t&&(e=t(e,l,i)),this.handleChange(e,()=>{r&&r(e,a),o.onChange&&o.onChange(e)})},onFocus:e=>{this.handleFocus(()=>{i&&i(e),o.onFocus&&o.onFocus(e)})},onBlur:e=>{this.handleBlur(()=>{l&&l(e),o.onBlur&&o.onBlur(e)})}})}normalizeChildren(e){return i.a.isValidElement(e)?i.a.cloneElement(i.a.Children.only(e),this.normalizeChildrenProps()):e}getFormProp(e,t){const a=this.getForm().props;return e in a?a[e]:t}getProp(e,t){const a=this.getForm().props,r=this.props;return e in r?r[e]:e in a?a[e]:t}getFormItemContext(){return{formItem:this}}getPrefixCls(){return this.getForm().props.prefixCls}render(){const e=this.props,t=e.name,a=e.label,r=e.labelFor,l=e.showRequiredMark,n=e.required,s=e.className,o=e.style,m=e.renderExtra,h=e.children,u=this.getPrefixCls()+"-item",c=this.getProp("disableValidator"),d=this.getProp("inline"),g=this.getProp("labelPosition"),f=this.getProp("labelAlign"),E=this.getFormProp("renderControlExtra",e=>null),V=this.hasError(),b=this.isValidating(),F=v()(h)?h(this.normalizeChildrenProps(),this):this.normalizeChildren(h);return i.a.createElement(x.Provider,{value:this.getFormItemContext()},i.a.createElement("div",{"data-name":t,style:o,ref:this.saveDOM,className:p()(u,{[u+"-inline"]:d,[u+"-"+g]:g,"has-error":V,"is-validating":b,"is-required":(n||l)&&!c,[""+s]:s})},a&&i.a.createElement("label",{htmlFor:r,className:p()({[u+"-label"]:!0,[u+"-label-left"]:"left"===f&&"left"===g},this.getProp("labelClassName")),style:Object.assign({width:this.getProp("labelWidth")},this.getProp("labelStyle",{}))},a),i.a.createElement("div",{className:p()(u+"-control",this.getProp("controlClassName")),style:this.getProp("controlStyle",{})},F,(()=>m?m(this):E(this))())))}}S.contextType=F,S.defaultProps={showRequiredMark:!1,name:"",validateDelay:0};var T=S;var _=function(e){const t=e.component,a=void 0===t?"input":t,r=e.value,l=e.inputRef,n=e.onChange,s=c()(e,["component","value","inputRef","onChange"]);return i.a.createElement(a,Object.assign({ref:l,onChange:e=>{const t=e.target.value;n&&n(t,e)},value:r},s))};const k=D;k.Item=T,k.useForm=()=>i.a.useContext(F).form,k.Context=F,k.useFormItem=()=>i.a.useContext(x).formItem,k.ItemContext=x,k.NativeField=_;function I(e){let t=e.type,a=void 0===t?"text":t,r=e.component,l=void 0===r?"input":r,n=e.children,s=c()(e,["type","component","children"]);return i.a.createElement(T,h()({},s,{style:{marginBottom:24}}),i.a.createElement(_,{component:l,type:a,children:n}))}class w extends r.Component{constructor(...e){super(...e),o()(this,"state",{formValue:{username:"\u9ed8\u8ba4",password:"",password2:"",email:""}}),o()(this,"reset",e=>{e.preventDefault(),this.form&&this.form.reset(()=>{console.log(23)})}),o()(this,"onSubmit",e=>{e.preventDefault(),this.form&&this.form.validateAndScroll(e=>{console.log(e)})}),o()(this,"renderFieldExtra",e=>i.a.createElement("div",{style:{position:"absolute",color:"red",top:"100%"}},e.isValidating()?"\u6821\u9a8c\u4e2d...":e.getError()))}render(){const e=this.state.formValue;return i.a.createElement("div",null,i.a.createElement(D,{labelWidth:80,getDefaultFieldValue:()=>"",requiredMessage:"\u4e0d\u80fd\u4e3a\u7a7a",ref:e=>(this.form=e,window._form=e),labelAlign:"right",formValue:e,onChange:e=>this.setState({formValue:e}),onSubmit:this.onSubmit,renderControlExtra:this.renderFieldExtra},i.a.createElement("div",null,i.a.createElement(I,{required:!0,validateDelay:200,labelPosition:"top",name:"A1",label:"A1:"}),i.a.createElement(I,{required:!0,name:"username",label:"\u7528\u6237\u540d:"}),i.a.createElement(I,{required:!0,name:"password",label:"\u767b\u5f55\u5bc6\u7801:"}),i.a.createElement(I,{required:!0,name:"password2",label:"\u5bc6\u7801\u786e\u8ba4:"}),i.a.createElement(I,{required:!0,name:"email",label:"\u90ae\u7bb1\u5730\u5740:",validator:(e,t,a)=>(console.log(a),new Promise((e,t)=>{setTimeout(e,2e3)}))}),i.a.createElement("button",null,"submit"),i.a.createElement("button",{onClick:this.reset},"reset"))))}}function O(e){return i.a.createElement(_,h()({},e,{className:"",type:"text",style:{height:32,padding:"4px 7px"},component:"input"}))}class N extends r.Component{constructor(...e){super(...e),o()(this,"state",{formValue:{name:"",info:{gender:"\u7537"}}}),o()(this,"reset",e=>{e.preventDefault(),this.setState({formValue:{name:"haha",info:{gender:"\u7537"}}}),this.form.cleanErrors()}),o()(this,"onSubmit",e=>{e.preventDefault(),this.form&&this.form.validateAndScroll(e=>{console.log(e)})}),o()(this,"renderFieldExtra",e=>i.a.createElement("div",{style:{color:"red",top:"100%"}},e.isValidating()?"\u6821\u9a8c\u4e2d...":e.getError()))}getRules(){return{"info.address":function(){return!1},name:function(e){return""!==e||"\u4e0d\u80fd\u4e3a\u7a7a"}}}render(){const e=this.state.formValue;return i.a.createElement("div",null,i.a.createElement(D,{getDefaultFieldValue:()=>"",ref:e=>this.form=e,formValue:e,validators:this.getRules(),onChange:e=>this.setState({formValue:e}),onSubmit:this.onSubmit,renderControlExtra:this.renderFieldExtra,validateTrigger:"blur",inline:!0},t=>i.a.createElement("div",null,i.a.createElement(T,{labelFor:"12",name:"goods",validateTrigger:"change",required:!0,label:"\u59d3\u540d",inline:!0},i.a.createElement(O,null)),i.a.createElement(T,{name:"name",label:"\u59d3\u540d",inline:!0},i.a.createElement(O,null)),i.a.createElement(T,{help:"\u5fc5\u586b\u9009\u9879",name:"name2",label:"\u59d3\u540d",inline:!0},i.a.createElement(O,null)),i.a.createElement(T,{name:"name3",label:"\u59d3\u540d",inline:!0},i.a.createElement(O,{size:"small"})),i.a.createElement(T,{labelWidth:100,name:"name4",label:"\u59d3\u540d"},i.a.createElement(O,null)),i.a.createElement(T,{name:"name5",labelWidth:100,label:"\u59d3\u540d",inline:!0},i.a.createElement(O,null)),i.a.createElement(T,{name:"name6",label:"\u59d3\u540d",inline:!0},i.a.createElement(O,null)),i.a.createElement(T,{name:"name7",labelPosition:"top",label:"\u59d3\u540d"},i.a.createElement(O,null)),i.a.createElement(T,{name:"name8",labelPosition:"top",label:"\u59d3\u540d",inline:!0},i.a.createElement(O,null)),i.a.createElement(T,{name:"name9",label:"\u59d3\u540d"},i.a.createElement(_,{component:"input"})),i.a.createElement("div",null,t.isFieldValidating("name9")?"\u6570\u636e\u6821\u9a8c\u4e2d...":null),i.a.createElement(T,{name:"info.gender",label:"\u6027\u522b"},i.a.createElement(_,{component:"input"})),i.a.createElement(T,{name:"info.age",label:"\u5e74\u9f84",normalize:e=>parseInt(e)||""},i.a.createElement(_,{component:"input"})),i.a.createElement(T,{name:"info.address",label:"\u5730\u5740"},i.a.createElement(_,{component:"input"})),i.a.createElement(T,{name:"info.list[0]",label:"L1",validator:e=>new Promise((t,a)=>{setTimeout(e?t:()=>a("\u6821\u9a8c\u5931\u8d25"),2e3)})},i.a.createElement(_,{component:"input"})),i.a.createElement("div",null,t.isFieldValidating("info.list[0]")?"\u6570\u636e\u6821\u9a8c\u4e2d...":null),i.a.createElement(T,{name:"info.list[1]",label:"L2",validator:e=>new Promise((t,a)=>{setTimeout(e?t:()=>a("\u6821\u9a8c\u5931\u8d25"),2e3)})},i.a.createElement(_,{component:"input"})),i.a.createElement("div",null,t.isFieldValidating("info.list[1]")?"\u6570\u636e\u6821\u9a8c\u4e2d...":null),i.a.createElement(T,{name:"info.country",label:"\u56fd\u7c4d"},i.a.createElement(_,{component:"select"},i.a.createElement("option",{value:"\u4e2d\u56fd"},"\u4e2d\u56fd"),i.a.createElement("option",{value:"\u7f8e\u56fd"},"\u7f8e\u56fd"),i.a.createElement("option",{value:"\u6fb3\u5927\u5229\u4e9a"},"\u6fb3\u5927\u5229\u4e9a"))),i.a.createElement(T,{name:"info.desc",label:"\u5907\u6ce8",alignItems:"top"},i.a.createElement(_,{component:"textarea"})),t.isValidating()?"\u8868\u5355\u6821\u9a8c\u4e2d...":null,i.a.createElement("pre",null,JSON.stringify(e)),i.a.createElement("pre",null,JSON.stringify(t.getError())),i.a.createElement("button",null,"submit"),i.a.createElement("button",{onClick:this.reset},"reset"))))}}var A=[{label:"\u57fa\u672c\u529f\u80fd1",component:w},{label:"\u57fa\u672c\u529f\u80fd2",component:N}];class L extends r.Component{constructor(...e){super(...e),o()(this,"state",{current:A[0]})}onDemoChange(e,t){this.setState({current:e})}render(){const e=this.state.current;return i.a.createElement("div",{className:"container"},i.a.createElement("div",{className:"slider"},A.map((t,a)=>i.a.createElement("div",{className:e===t?"active":"",onClick:this.onDemoChange.bind(this,t)},t.label))),i.a.createElement("div",{className:"content"},e?i.a.createElement(e.component,null):null))}}n.a.render(i.a.createElement(L,null),document.getElementById("demo"))},94:function(e,t,a){a(95),e.exports=a(180)}},[[94,1,2]]]);