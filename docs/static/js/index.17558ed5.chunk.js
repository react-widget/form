(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{105:function(e,t,n){n(106),e.exports=n(195)},138:function(e,t,n){},139:function(e,t,n){},140:function(e,t,n){},195:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(102),l=n.n(i),o=(n(138),n(139),n(140),n(58),n(94),n(26),n(27),n(28),n(4)),s=n.n(o),u=(n(11),n(5),n(12)),c=n.n(u),m=n(8),f=n.n(m),d=(n(54),n(38)),h=n.n(d),p=n(39),g=n.n(p),v=(n(146),n(147),n(96),n(148),n(149),n(97),n(32),n(150),n(151),n(22)),E=n.n(v),b=n(103),V=n.n(b),F=n(104),y=n.n(F),C=n(29),D=n.n(C),P=a.a.createContext({form:{}});function x(){}var O=function(e){c()(n,e);var t;t=n;function n(t,n){var r;return(r=e.call(this,t,n)||this).fieldLocks=Object.create(null),r.formLockId=1,r._isFormValidating=!1,r.fields=[],r._validateCb=[],r.handleSubmit=function(e){e.preventDefault()},r.state={formError:Object.create(null),validatingFields:Object.create(null),formValue:t.defaultFormValue||{}},r}n.getDerivedStateFromProps=function(e,t){return{formValue:e.formValue||t.formValue}};var r=n.prototype;return r.addField=function(e){this.fields.push(e)},r.removeField=function(e){var t=this.fields.indexOf(e);if(-1!==t){var n=e.props.name;this.state.formError[n]=null,this.fields.splice(t,1)}},r.getFieldByName=function(e){for(var t=this.fields,n=0;n<t.length;n++)if(e===t[n].props.name)return t[n];return null},r.getInitialFormValue=function(){var e={};return this.fields.forEach((function(t){e[t.props.name]=t._initialValue})),e},r.reset=function(e){var t=this.getInitialFormValue();this.fieldLocks=Object.create(null),this.formLockId=1,this._isFormValidating=!1,this.state.validatingFields=Object.create(null),this.state.formError=Object.create(null),this.setValues(t,e)},r.getInitialValue=function(e){var t;return this.fields.forEach((function(n){n.props.name===e&&(t=n.getInitialValue())})),t},r.resetField=function(e,t){this.cleanError(e);var n=this.getInitialValue(e);this.fieldLocks[e]=1,this.state.validatingFields[e]=!1,this.state.formError[e]=null,this.setValue(e,n,t)},r.getFormValue=function(){return this.state.formValue},r.getValues=function(){return this.state.formValue},r.setValues=function(e,t){void 0===e&&(e={});var n=this.props,r=n.path2obj,a=n.onChange,i=this.state.formValue,l=void 0!==this.props.formValue,o=i;Object.keys(e).forEach((function(t){var n=e[t];r?V()(o,t,n):o[t]=n})),l||this.setState({formValue:o}),a&&a(o),t&&this._validateCb.push(t)},r.setFormValue=function(e,t){return this.setValues(e,t)},r.getValue=function(e){var t=this.props,n=t.getDefaultFieldValue,r=t.path2obj,a=this.state.formValue,i=r?y()(a,e):a[e];return void 0===i&&n?n(e,a):i},r.setValue=function(e,t,n){var r;this.setValues(((r={})[e]=t,r),n)},r.getFieldValue=function(e){return this.getValue(e)},r.setFieldValue=function(e,t,n){return this.setValue(e,t,n)},r.componentDidUpdate=function(){var e=this.state.formValue,t=this._validateCb;this._validateCb=[],t.forEach((function(t){t(e)}))},r.componentWillUnmount=function(){this._validateCb=[]},r.isDisableValidator=function(e){return arguments.length?this.isDisableValidatorField(e):this.props.disableValidator},r.isDisableValidatorField=function(e){var t=this.getFieldByName(e);return!t||t.getProp("disableValidator",!1)},r.hasError=function(e){return!this.isDisableValidatorField(e)&&null!=this.state.formError[e]},r.getError=function(e){return this.isDisableValidatorField(e)?null:this.state.formError[e]},r.getErrors=function(){return this.isDisableValidator()?{}:this.state.formError},r.cleanError=function(e){var t,n=this.state.formError;this.hasError(e)&&this.setState({formError:Object.assign({},n,(t={},t[e]=null,t))})},r.setError=function(e,t){var n;if(!this.isDisableValidatorField(e)){var r=this.state.formError;this.setState({formError:Object.assign({},r,(n={},n[e]=t,n))})}},r.cleanErrors=function(){this.setState({formError:Object.create(null)})},r.setErrors=function(e){var t=this.state.formError;this.setState({formError:Object.assign({},t,{},e)})},r.getFieldValidatorList=function(e){var t,n=[];this.fields.filter((function(t){return t.props.name===e})).forEach((function(t){if(!t.getProp("disableValidator")){var r=t.props;r.required&&n.unshift((function(n){return!function(e){return void 0===e||null===e||(!(!Array.isArray(e)||e.length)||"string"===typeof e&&!e)}(n)||t.getProp("requiredMessage",e+" is required")})),r.validator&&n.push.apply(n,Array.isArray(r.validator)?r.validator:[r.validator])}}));var r=null===(t=this.props.validators)||void 0===t?void 0:t[e];return r&&n.push.apply(n,Array.isArray(r)?r:[r]),n.filter((function(e){return"function"===typeof e}))},r.isFieldValidating=function(e){return!this.isDisableValidatorField(e)&&!!this.state.validatingFields[e]},r.isValidating=function(){var e=this;if(this.props.disableValidator)return!1;if(this._isFormValidating)return!0;var t=this.state.validatingFields;return Object.keys(t).some((function(n){return!e.isDisableValidatorField(n)&&t[n]}))},r._validateField=function(e,t,n){void 0===n&&(n="none"),t="function"===typeof t?t:x;var r=this.state.formValue,a=this.getValue(e),i=this.getFieldValidatorList(e);if(i.length){var l=function(n){void 0===n&&(n=null),null===n&&i.length?o():(null!==n&&(Array.isArray(n)||(n=[n]),n=n.map((function(t){var n=t;return t instanceof Error&&(n=t.message),{name:e,message:n}}))),t(n,a))},o=function(){var t=i.shift();if(t){var o=t(a,r,n);!0===o?l():!1===o?l(e+" check fail"):o&&o.then?o.then((function(){return l()}),(function(e){return l(e)})):l(o)}};o()}else t(null,a)},r.validateField=function(e,t,n){var r=this,a=t||x,i=this.props.asyncTestDelay,l=this.state,o=l.formError,s=l.validatingFields;if(!this._isFormValidating){this.fieldLocks[e]=this.fieldLocks[e]||1;var u=++this.fieldLocks[e],c=setTimeout((function(){var t,n;c=null,u!==r.fieldLocks[e]||r.isDisableValidatorField(e)||r.setState({validatingFields:Object.assign({},s,(t={},t[e]=!0,t)),formError:Object.assign({},o,(n={},n[e]=null,n))})}),i);this._validateField(e,(function(t,n){var i,l;c&&clearTimeout(c),u!==r.fieldLocks[e]||r.isDisableValidatorField(e)?a(t,n,!0):r.setState({formError:Object.assign({},o,(i={},i[e]=t?t[0].message:null,i)),validatingFields:Object.assign({},s,(l={},l[e]=!1,l))},(function(){a(t,n)}))}),n)}},r.validate=function(e){var t=this;e="function"===typeof e?e:x;var n={},r=null,a=!1,i=this.props.asyncTestDelay,l=this.state.formValue;this.fieldLocks=Object.create(null);var o=++this.formLockId,s=this.fields,u=Object.create(null),c=[],m=0;this._isFormValidating=!0;var f=function(){o!==t.formLockId||t.isDisableValidator()||t.setState({formError:n,validatingFields:u})};s.length?(s.forEach((function(e){var t=e.props.name;m++,u[t]=!0})),s.forEach((function(s){var d=s.props.name,h=!1,p=setTimeout((function(){h=!0,p=null}),i);t._validateField(d,(function(i){u[d]=!1,p&&(clearTimeout(p),p=null),h&&f(),function(i,s){if(m--,i&&!t.isDisableValidatorField(s)&&(n[s]=i[0].message,c.push.apply(c,i)),m<=0){if(a=!0,r&&(clearTimeout(r),r=null),o!==t.formLockId||t.isDisableValidator())return void e(c.length?c:null,l,!0);t._isFormValidating=!1,t.setState({formError:n,validatingFields:{}},(function(){e(c.length?c:null,l)}))}}(i,d)}))})),r=setTimeout((function(){r=null,a||f()}),i)):e(null,l)},r.validateAndScroll=function(e){var t=this,n=this.props.scrollIntoView,r="function"===typeof e?e:x;this.validate((function(e,a,i){if(e)for(var l=t.fields,o=0;o<l.length;o++){var s=l[o],u=s.props.name;if(t.hasError(u)){var c=s.getDOM();if(n){n(c);break}if(c&&c.scrollIntoView){c.scrollIntoView();break}}}r(e,a,i)}))},r.getFormContext=function(){return{form:this}},r.render=function(){var e=this.props,t=e.prefixCls,n=e.style,r=e.className,i=e.onSubmit,l=e.component,o=e.children,s=l;return a.a.createElement(P.Provider,{value:this.getFormContext()},a.a.createElement(s,{style:n,className:E()(t,r),onSubmit:i||this.handleSubmit},D()(o)?o(this):o))},n}(a.a.Component);O.defaultProps={prefixCls:"rw-form",disableValidator:!1,validators:{},path2obj:!0,component:"form",asyncTestDelay:16,validateDelay:0,validateTrigger:["change"],labelPosition:"left",labelAlign:"right",clearErrorOnFocus:!0,inline:!1};var S=O,T=a.a.createContext({formItem:{}});var _=1,k=function(e){c()(n,e);var t;t=n;function n(t,n){var r;(r=e.call(this,t,n)||this)._fid=_++,r._validateTimer=null,r.saveDOM=function(e){r._dom=e},r.handleChange=function(e,t){r.setValue(e,(function(e){t&&t(),r.hasValidateTrigger("change")&&r.triggerValidate("change")}))},r.handleFocus=function(e){var t=r.getProp("clearErrorOnFocus");e&&e(),t&&(r._validateTimer&&clearTimeout(r._validateTimer),r.cleanError())},r.handleBlur=function(e){e&&e(),r.hasValidateTrigger("blur")&&r.triggerValidate("blur")};var a=r.getForm();return r._initialValue=r.getValue(),a.addField(s()(r)),r}var r=n.prototype;return r.getInitialValue=function(){return this._initialValue},r.getDOM=function(){return this._dom},r.getForm=function(){return this.context.form},r.componentWillUnmount=function(){this.getForm().removeField(this)},r.hasValidateTrigger=function(e){void 0===e&&(e="none");var t=this.getProp("validateTrigger")||[];return-1!==(Array.isArray(t)?t:[t]).indexOf(e)},r.getValidateDelay=function(){var e=this.getForm().props.validateDelay,t=this.props;return"validateDelay"in t?t.validateDelay:e},r.reset=function(e){var t=this.getForm(),n=this.props.name;t.resetField(n,e)},r.hasError=function(){var e=this.getForm(),t=this.props.name;return e.hasError(t)},r.getError=function(){var e=this.getForm(),t=this.props.name;return e.getError(t)},r.cleanError=function(){var e=this.getForm(),t=this.props.name;return e.cleanError(t)},r.setError=function(e){var t=this.getForm(),n=this.props.name;return t.setError(n,e)},r.isValidating=function(){var e=this.getForm(),t=this.props.name;return e.isFieldValidating(t)},r.validate=function(e,t){void 0===t&&(t="none");var n=this.getForm(),r=this.props.name;n.validateField(r,e,t)},r.getValue=function(){var e=this.getForm(),t=this.props.name;return e.getValue(t)},r.setValue=function(e,t){var n=this.getForm(),r=this.props.name;n.setValue(r,e,t)},r.triggerValidate=function(e){var t=this,n=this.getValidateDelay();n>0?(this._validateTimer&&clearTimeout(this._validateTimer),this._validateTimer=setTimeout((function(){t.validate(null,e)}),n)):this.validate(null,e)},r.normalizeChildrenProps=function(){var e=this,t=this.props,n=t.normalize,r=t.name,a=t.onChange,i=t.onFocus,l=t.onBlur,o=this.getForm(),s=this.getFormProp("normalizeFieldValue",(function(e,t){return t}));n||(n=s.bind(null,r));var u=this.getFormProp("getInputProps",(function(){return{}}))(this);return Object.assign({value:this.getValue()},u,{onChange:function(t,r){var i=o.getFormValue(),l=e.getValue();n&&(t=n(t,l,i)),e.handleChange(t,(function(){a&&a(t,r),u.onChange&&u.onChange(t)}))},onFocus:function(t){e.handleFocus((function(){i&&i(t),u.onFocus&&u.onFocus(t)}))},onBlur:function(t){e.handleBlur((function(){l&&l(t),u.onBlur&&u.onBlur(t)}))}})},r.normalizeChildren=function(e){return a.a.isValidElement(e)?a.a.cloneElement(a.a.Children.only(e),this.normalizeChildrenProps()):e},r.getFormProp=function(e,t){var n=this.getForm().props;return e in n?n[e]:t},r.getProp=function(e,t){var n=this.getForm().props,r=this.props;return e in r?r[e]:e in n?n[e]:t},r.getFormItemContext=function(){return{formItem:this}},r.getPrefixCls=function(){return this.getForm().props.prefixCls},r.render=function(){var e,t,n=this,r=this.props,i=r.name,l=r.label,o=r.labelFor,s=r.showRequiredMark,u=r.required,c=r.className,m=r.style,f=r.renderExtra,d=r.children,h=this.getPrefixCls()+"-item",p=this.getProp("disableValidator"),g=this.getProp("inline"),v=this.getProp("labelPosition"),b=this.getProp("labelAlign"),V=this.getFormProp("renderControlExtra",(function(e){return null})),F=this.hasError(),y=this.isValidating(),C=D()(d)?d(this.normalizeChildrenProps(),this):this.normalizeChildren(d);return a.a.createElement(T.Provider,{value:this.getFormItemContext()},a.a.createElement("div",{"data-name":i,style:m,ref:this.saveDOM,className:E()(h,(e={},e[h+"-inline"]=g,e[h+"-"+v]=v,e["has-error"]=F,e["is-validating"]=y,e["is-required"]=(u||s)&&!p,e[""+c]=c,e))},l&&a.a.createElement("label",{htmlFor:o,className:E()((t={},t[h+"-label"]=!0,t[h+"-label-left"]="left"===b&&"left"===v,t),this.getProp("labelClassName")),style:Object.assign({width:this.getProp("labelWidth")},this.getProp("labelStyle",{}))},l),a.a.createElement("div",{className:E()(h+"-control",this.getProp("controlClassName")),style:this.getProp("controlStyle",{})},C,f?f(n):V(n))))},n}(a.a.Component);k.contextType=P,k.defaultProps={showRequiredMark:!1,name:"",validateDelay:0};var I=k;var w=function(e){var t=e.component,n=void 0===t?"input":t,r=e.value,i=e.inputRef,l=e.onChange,o=g()(e,["component","value","inputRef","onChange"]);return a.a.createElement(n,Object.assign({ref:i,onChange:function(e){var t=e.target.value;l&&l(t,e)},value:r},o))},j=S;j.Item=I,j.useForm=function(){return a.a.useContext(P).form},j.Context=P,j.useFormItem=function(){return a.a.useContext(T).formItem},j.ItemContext=T,j.NativeField=w;function A(e){var t=e.type,n=void 0===t?"text":t,r=e.component,i=void 0===r?"input":r,l=e.children,o=g()(e,["type","component","children"]);return a.a.createElement(I,h()({},o,{style:{marginBottom:24}}),a.a.createElement(w,{component:i,type:n,children:l}))}function L(e){return a.a.createElement(w,h()({},e,{className:"",type:"text",style:{height:32,padding:"4px 7px"},component:"input"}))}var N=[{label:"\u57fa\u672c\u529f\u80fd1",component:function(e){c()(n,e);var t;t=n;function n(){for(var t,n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return t=e.call.apply(e,[this].concat(r))||this,f()(s()(t),"state",{formValue:{username:"\u9ed8\u8ba4",password:"",password2:"",email:""}}),f()(s()(t),"reset",(function(e){e.preventDefault(),t.form&&t.form.reset((function(){console.log(23)}))})),f()(s()(t),"onSubmit",(function(e){e.preventDefault(),t.form&&t.form.validateAndScroll((function(e){console.log(e)}))})),f()(s()(t),"renderFieldExtra",(function(e){return a.a.createElement("div",{style:{position:"absolute",color:"red",top:"100%"}},e.isValidating()?"\u6821\u9a8c\u4e2d...":e.getError())})),t}return n.prototype.render=function(){var e=this,t=this.state.formValue;return a.a.createElement("div",null,a.a.createElement(S,{labelWidth:80,getDefaultFieldValue:function(){return""},requiredMessage:"\u4e0d\u80fd\u4e3a\u7a7a",ref:function(t){return e.form=t,window._form=t},labelAlign:"right",formValue:t,onChange:function(t){return e.setState({formValue:t})},onSubmit:this.onSubmit,renderControlExtra:this.renderFieldExtra},a.a.createElement("div",null,a.a.createElement(A,{required:!0,validateDelay:200,labelPosition:"top",name:"A1",label:"A1:"}),a.a.createElement(A,{required:!0,name:"username",label:"\u7528\u6237\u540d:"}),a.a.createElement(A,{required:!0,name:"password",label:"\u767b\u5f55\u5bc6\u7801:"}),a.a.createElement(A,{required:!0,name:"password2",label:"\u5bc6\u7801\u786e\u8ba4:"}),a.a.createElement(A,{required:!0,name:"email",label:"\u90ae\u7bb1\u5730\u5740:",validator:function(e,t,n){return console.log(n),new Promise((function(e,t){setTimeout(e,2e3)}))}}),a.a.createElement("button",null,"submit"),a.a.createElement("button",{onClick:this.reset},"reset"))))},n}(r.Component)},{label:"\u57fa\u672c\u529f\u80fd2",component:function(e){c()(n,e);var t;t=n;function n(){for(var t,n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return t=e.call.apply(e,[this].concat(r))||this,f()(s()(t),"state",{formValue:{name:"",info:{gender:"\u7537"}}}),f()(s()(t),"reset",(function(e){e.preventDefault(),t.setState({formValue:{name:"haha",info:{gender:"\u7537"}}}),t.form.cleanErrors()})),f()(s()(t),"onSubmit",(function(e){e.preventDefault(),t.form&&t.form.validateAndScroll((function(e){console.log(e)}))})),f()(s()(t),"renderFieldExtra",(function(e){return a.a.createElement("div",{style:{color:"red",top:"100%"}},e.isValidating()?"\u6821\u9a8c\u4e2d...":e.getError())})),t}var r=n.prototype;return r.getRules=function(){return{"info.address":function(){return!1},name:function(e){return""!==e||"\u4e0d\u80fd\u4e3a\u7a7a"}}},r.render=function(){var e=this,t=this.state.formValue;return a.a.createElement("div",null,a.a.createElement(S,{getDefaultFieldValue:function(){return""},ref:function(t){return e.form=t},formValue:t,validators:this.getRules(),onChange:function(t){return e.setState({formValue:t})},onSubmit:this.onSubmit,renderControlExtra:this.renderFieldExtra,validateTrigger:"blur",inline:!0},(function(n){return a.a.createElement("div",null,a.a.createElement(I,{labelFor:"12",name:"goods",validateTrigger:"change",required:!0,label:"\u59d3\u540d",inline:!0},a.a.createElement(L,null)),a.a.createElement(I,{name:"name",label:"\u59d3\u540d",inline:!0},a.a.createElement(L,null)),a.a.createElement(I,{help:"\u5fc5\u586b\u9009\u9879",name:"name2",label:"\u59d3\u540d",inline:!0},a.a.createElement(L,null)),a.a.createElement(I,{name:"name3",label:"\u59d3\u540d",inline:!0},a.a.createElement(L,{size:"small"})),a.a.createElement(I,{labelWidth:100,name:"name4",label:"\u59d3\u540d"},a.a.createElement(L,null)),a.a.createElement(I,{name:"name5",labelWidth:100,label:"\u59d3\u540d",inline:!0},a.a.createElement(L,null)),a.a.createElement(I,{name:"name6",label:"\u59d3\u540d",inline:!0},a.a.createElement(L,null)),a.a.createElement(I,{name:"name7",labelPosition:"top",label:"\u59d3\u540d"},a.a.createElement(L,null)),a.a.createElement(I,{name:"name8",labelPosition:"top",label:"\u59d3\u540d",inline:!0},a.a.createElement(L,null)),a.a.createElement(I,{name:"name9",label:"\u59d3\u540d"},a.a.createElement(w,{component:"input"})),a.a.createElement("div",null,n.isFieldValidating("name9")?"\u6570\u636e\u6821\u9a8c\u4e2d...":null),a.a.createElement(I,{name:"info.gender",label:"\u6027\u522b"},a.a.createElement(w,{component:"input"})),a.a.createElement(I,{name:"info.age",label:"\u5e74\u9f84",normalize:function(e){return parseInt(e)||""}},a.a.createElement(w,{component:"input"})),a.a.createElement(I,{name:"info.address",label:"\u5730\u5740"},a.a.createElement(w,{component:"input"})),a.a.createElement(I,{name:"info.list[0]",label:"L1",validator:function(e){return new Promise((function(t,n){setTimeout(e?t:function(){return n("\u6821\u9a8c\u5931\u8d25")},2e3)}))}},a.a.createElement(w,{component:"input"})),a.a.createElement("div",null,n.isFieldValidating("info.list[0]")?"\u6570\u636e\u6821\u9a8c\u4e2d...":null),a.a.createElement(I,{name:"info.list[1]",label:"L2",validator:function(e){return new Promise((function(t,n){setTimeout(e?t:function(){return n("\u6821\u9a8c\u5931\u8d25")},2e3)}))}},a.a.createElement(w,{component:"input"})),a.a.createElement("div",null,n.isFieldValidating("info.list[1]")?"\u6570\u636e\u6821\u9a8c\u4e2d...":null),a.a.createElement(I,{name:"info.country",label:"\u56fd\u7c4d"},a.a.createElement(w,{component:"select"},a.a.createElement("option",{value:"\u4e2d\u56fd"},"\u4e2d\u56fd"),a.a.createElement("option",{value:"\u7f8e\u56fd"},"\u7f8e\u56fd"),a.a.createElement("option",{value:"\u6fb3\u5927\u5229\u4e9a"},"\u6fb3\u5927\u5229\u4e9a"))),a.a.createElement(I,{name:"info.desc",label:"\u5907\u6ce8",alignItems:"top"},a.a.createElement(w,{component:"textarea"})),n.isValidating()?"\u8868\u5355\u6821\u9a8c\u4e2d...":null,a.a.createElement("pre",null,JSON.stringify(t)),a.a.createElement("pre",null,JSON.stringify(n.getError())),a.a.createElement("button",null,"submit"),a.a.createElement("button",{onClick:e.reset},"reset"))})))},n}(r.Component)}];var q=function(e){c()(n,e);var t;t=n;function n(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return t=e.call.apply(e,[this].concat(r))||this,f()(s()(t),"state",{current:N[0]}),t}var r=n.prototype;return r.onDemoChange=function(e,t){this.setState({current:e})},r.render=function(){var e=this,t=this.state.current;return a.a.createElement("div",{className:"container"},a.a.createElement("div",{className:"slider"},N.map((function(n,r){return a.a.createElement("div",{className:t===n?"active":"",onClick:e.onDemoChange.bind(e,n)},n.label)}))),a.a.createElement("div",{className:"content"},t?a.a.createElement(t.component,null):null))},n}(r.Component);l.a.render(a.a.createElement(q,null),document.getElementById("demo"))}},[[105,1,2]]]);