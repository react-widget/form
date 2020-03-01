(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{102:function(e,t,n){n(103),e.exports=n(191)},135:function(e,t,n){},136:function(e,t,n){},137:function(e,t,n){},191:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(100),l=n.n(i),o=(n(135),n(136),n(137),n(53),n(90),n(4)),s=n.n(o),u=n(8),c=n.n(u),m=n(6),f=n.n(m),d=(n(91),n(49),n(33)),h=n.n(d),p=n(34),g=n.n(p),v=(n(139),n(140),n(93),n(141),n(142),n(94),n(27),n(143),n(144),n(19)),E=n.n(v),V=n(62),b=n.n(V),F=n(101),y=n.n(F),C=n(23),D=n.n(C),P=a.a.createContext({form:{}});function x(){}var S=function(e){function t(){var t;return(t=e.apply(this,arguments)||this).fieldLocks={},t.formLockId=1,t._isFormValidating=!1,t.fields=[],t._validateCb=[],t.state={formError:{},validatingFields:{},formValue:t.props.defaultFormValue||{}},t.handleSubmit=function(e){e.preventDefault()},t}c()(t,e),t.getDerivedStateFromProps=function(e,t){return{formValue:e.formValue||t.formValue}};var n=t.prototype;return n.addField=function(e){this.fields.push(e)},n.removeField=function(e){var t=this.fields.indexOf(e);if(-1!==t){var n=e.props.name;this.state.formError[n]=null,this.fields.splice(t,1)}},n.getFieldByName=function(e){for(var t=this.fields,n=0;n<t.length;n++)if(e===t[n].props.name)return t[n];return null},n.getInitialFormValue=function(){var e={};return this.fields.forEach((function(t){e[t.props.name]=t._initialValue})),e},n.reset=function(e){var t=this.getInitialFormValue();this.fieldLocks={},this.formLockId=1,this._isFormValidating=!1,this.state.validatingFields={},this.state.formValue=t,this.state.formError={},this.setValues({},e)},n.getInitialValue=function(e){var t;return this.fields.forEach((function(n){n.props.name===e&&(t=n.getInitialValue())})),t},n.resetField=function(e,t){this.cleanError(e);var n=this.getInitialValue(e);this.fieldLocks[e]=1,this.state.validatingFields[e]=!1,this.state.formError[e]=null,this.setValue(e,n,t)},n.getFormValue=function(){return this.state.formValue},n.getValues=function(){return this.state.formValue},n.setValues=function(e,t){void 0===e&&(e={});var n=this.props,r=n.path2obj,a=n.onChange,i=this.state.formValue,l="formValue"in this.props,o=i;Object.keys(e).forEach((function(t){var n=e[t];r?b()(o,t,n):o[t]=n})),l||this.setState({formValue:o}),a&&a(o),t&&this._validateCb.push(t)},n.setFormValue=function(e,t){return this.setValues(e,t)},n.getValue=function(e){var t=this.props.getDefaultFieldValue,n=this.props.path2obj,r=this.state.formValue,a=n?y()(r,e):r[e];return void 0===a&&t?t(e,r):a},n.setValue=function(e,t,n){var r=this.props,a=r.path2obj,i=r.onChange,l=this.state.formValue,o="formValue"in this.props,s=l;a?b()(s,e,t):s[e]=t,o||this.setState({formValue:s}),i&&i(s),n&&this._validateCb.push(n)},n.getFieldValue=function(e){return this.getValue(e)},n.setFieldValue=function(e,t,n){return this.setValue(e,t,n)},n.componentDidUpdate=function(){var e=this.state.formValue,t=this._validateCb;this._validateCb=[],t.forEach((function(t){t(e)}))},n.componentWillUnmount=function(){this._validateCb=[]},n.isDisableValidator=function(e){return arguments.length?this.isDisableValidatorField(e):this.props.disableValidator},n.isDisableValidatorField=function(e){var t=this.getFieldByName(e);return!t||t.getProp("disableValidator",!1)},n.hasError=function(e){return!this.isDisableValidatorField(e)&&null!=this.state.formError[e]},n.getError=function(e){return this.isDisableValidatorField(e)?null:this.state.formError[e]},n.getErrors=function(){return this.isDisableValidator()?{}:this.state.formError},n.cleanError=function(e){var t,n=this.state.formError;this.hasError(e)&&this.setState({formError:Object.assign({},n,(t={},t[e]=null,t))})},n.setError=function(e,t){var n;if(!this.isDisableValidatorField(e)){var r=this.state.formError;this.setState({formError:Object.assign({},r,(n={},n[e]=t,n))})}},n.cleanErrors=function(){this.setState({formError:{}})},n.setErrors=function(e){var t=this.state.formError;this.setState({formError:Object.assign({},t,{},e)})},n.getFieldValidatorList=function(e){var t=[];this.fields.filter((function(t){return t.props.name===e})).forEach((function(n){if(!n.getProp("disableValidator")){var r=n.props;r.required&&t.unshift((function(t){return!function(e){return void 0===e||null===e||(!(!Array.isArray(e)||e.length)||"string"===typeof e&&!e)}(t)||n.getProp("requiredMessage",e+" check fail")})),r.validator&&t.push.apply(t,Array.isArray(r.validator)?r.validator:[r.validator])}}));var n=this.props.validators[e];return n&&t.push.apply(t,Array.isArray(n)?n:[n]),t.filter((function(e){return"function"===typeof e}))},n.isFieldValidating=function(e){return!this.isDisableValidatorField(e)&&!!this.state.validatingFields[e]},n.isValidating=function(){if(this.props.disableValidator)return!1;if(this._isFormValidating)return!0;var e=this.state.validatingFields;return Object.keys(e).some((function(t){return e[t]}))},n._validateField=function(e,t,n){void 0===n&&(n="none"),t="function"===typeof t?t:x;var r=this.state.formValue,a=this.getValue(e),i=this.getFieldValidatorList(e);if(i.length){var l=function(n){void 0===n&&(n=null),null===n&&i.length?o():(null!==n&&(Array.isArray(n)||(n=[n]),n=n.map((function(t){var n=t;return t instanceof Error&&(n=t.message),{name:e,message:n}}))),t(n,a))},o=function(){var t=i.shift();if(t){var o=t(a,r,n);!0===o?l():!1===o?l(e+" check fail"):o&&o.then?o.then((function(){return l()}),(function(e){return l(e)})):l(o)}};o()}else t(null,a)},n.validateField=function(e,t,n){var r=this,a=t||x,i=this.props.asyncTestDelay,l=this.state,o=l.formError,s=l.validatingFields;if(!this._isFormValidating){this.fieldLocks[e]=this.fieldLocks[e]||1;var u=++this.fieldLocks[e],c=setTimeout((function(){var t,n;c=null,u!==r.fieldLocks[e]||r.isDisableValidatorField(e)||r.setState({validatingFields:Object.assign({},s,(t={},t[e]=!0,t)),formError:Object.assign({},o,(n={},n[e]=null,n))})}),i);this._validateField(e,(function(t,n){var i,l;c&&clearTimeout(c),u!==r.fieldLocks[e]||r.isDisableValidatorField(e)?a(t,n,!0):r.setState({formError:Object.assign({},o,(i={},i[e]=t?t[0].message:null,i)),validatingFields:Object.assign({},s,(l={},l[e]=!1,l))},(function(){a(t,n)}))}),n)}},n.validate=function(e){var t=this;e="function"===typeof e?e:x;var n={},r=null,a=!1,i=this.props.asyncTestDelay,l=this.state.formValue;this.fieldLocks={};var o=++this.formLockId,s=this.fields,u={},c=[],m=0;this._isFormValidating=!0;var f=function(){o!==t.formLockId||t.isDisableValidator()||t.setState({formError:n,validatingFields:u})};s.length?(s.forEach((function(e){var t=e.props.name;m++,u[t]=!0})),s.forEach((function(s){var d=s.props.name,h=!1,p=setTimeout((function(){h=!0,p=null}),i);t._validateField(d,(function(i){u[d]=!1,p&&(clearTimeout(p),p=null),h&&f(),function(i,s){if(m--,i&&!t.isDisableValidatorField(s)&&(n[s]=i[0].message,c.push.apply(c,i)),m<=0){if(a=!0,r&&(clearTimeout(r),r=null),o!==t.formLockId||t.isDisableValidator())return void e(c.length?c:null,l,!0);t._isFormValidating=!1,t.setState({formError:n,validatingFields:{}},(function(){e(c.length?c:null,l)}))}}(i,d)}))})),r=setTimeout((function(){r=null,a||f()}),i)):e(null,l)},n.validateAndScroll=function(e){var t=this,n=this.props.scrollIntoView,r="function"===typeof e?e:x;this.validate((function(e,a,i){if(e)for(var l=t.fields,o=0;o<l.length;o++){var s=l[o],u=s.props.name;if(t.hasError(u)){var c=s.getDOM();if(n){n(c);break}if(c&&c.scrollIntoView){c.scrollIntoView();break}}}r(e,a,i)}))},n.getFormContext=function(){return{form:this}},n.render=function(){var e=this.props,t=e.prefixCls,n=e.style,r=e.className,i=e.onSubmit,l=e.component,o=e.children;return a.a.createElement(P.Provider,{value:this.getFormContext()},a.a.createElement(l,{style:n,className:E()(t,r),onSubmit:i||this.handleSubmit},D()(o)?o(this):o))},t}(a.a.Component);S.defaultProps={prefixCls:"nex-form",className:"",style:{},disableValidator:!1,validators:{},path2obj:!0,component:"form",asyncTestDelay:16,validateDelay:0,validateTrigger:["change"],labelPosition:"left",labelAlign:"right",clearErrorOnFocus:!0,inline:!1};var T=S,_=a.a.createContext({formItem:{}}),k=1,I=function(e){function t(t,n){var r;(r=e.call(this,t,n)||this)._fid=k++,r._validateTimer=null,r.saveDOM=function(e){r._dom=e},r.handleChange=function(e,t){r.setValue(e,(function(e){t&&t(),r.hasValidateTrigger("change")&&r.triggerValidate("change")}))},r.handleFocus=function(e){var t=r.getProp("clearErrorOnFocus");e&&e(),t&&(r._validateTimer&&clearTimeout(r._validateTimer),r.cleanError())},r.handleBlur=function(e){e&&e(),r.hasValidateTrigger("blur")&&r.triggerValidate("blur")};var a=r.getForm();return r._initialValue=r.getValue(),a.addField(s()(r)),r}c()(t,e);var n=t.prototype;return n.getInitialValue=function(){return this._initialValue},n.getDOM=function(){return this._dom},n.getForm=function(){return this.context.form},n.componentWillUnmount=function(){this.getForm().removeField(this)},n.hasValidateTrigger=function(e){void 0===e&&(e="none");var t=this.getProp("validateTrigger")||[];return-1!==(Array.isArray(t)?t:[t]).indexOf(e)},n.getValidateDelay=function(){var e=this.getForm().props.validateDelay,t=this.props;return"validateDelay"in t?t.validateDelay:e},n.reset=function(e){var t=this.getForm(),n=this.props.name;t.resetField(n,e)},n.hasError=function(){var e=this.getForm(),t=this.props.name;return e.hasError(t)},n.getError=function(){var e=this.getForm(),t=this.props.name;return e.getError(t)},n.cleanError=function(){var e=this.getForm(),t=this.props.name;return e.cleanError(t)},n.setError=function(e){var t=this.getForm(),n=this.props.name;return t.setError(n,e)},n.isValidating=function(){var e=this.getForm(),t=this.props.name;return e.isFieldValidating(t)},n.validate=function(e,t){void 0===t&&(t="none");var n=this.getForm(),r=this.props.name;n.validateField(r,e,t)},n.getValue=function(){var e=this.getForm(),t=this.props.name;return e.getValue(t)},n.setValue=function(e,t){var n=this.getForm(),r=this.props.name;n.setValue(r,e,t)},n.triggerValidate=function(e){var t=this,n=this.getValidateDelay();n>0?(this._validateTimer&&clearTimeout(this._validateTimer),this._validateTimer=setTimeout((function(){t.validate(null,e)}),n)):this.validate(null,e)},n.normalizeChildrenProps=function(){var e=this,t=this.props,n=t.normalize,r=t.name,a=t.onChange,i=t.onFocus,l=t.onBlur,o=this.getForm(),s=this.getFormProp("normalizeFieldValue",(function(e,t){return t}));n||(n=s.bind(null,r));var u=this.getFormProp("getInputProps",(function(){return{}}))(this);return Object.assign({value:this.getValue()},u,{onChange:function(t,r){var i=o.getFormValue(),l=e.getValue();n&&(t=n(t,l,i)),e.handleChange(t,(function(){a&&a(t,r),u.onChange&&u.onChange(t)}))},onFocus:function(t){e.handleFocus((function(){i&&i(t),u.onFocus&&u.onFocus(t)}))},onBlur:function(t){e.handleBlur((function(){l&&l(t),u.onBlur&&u.onBlur(t)}))}})},n.normalizeChildren=function(e){return a.a.isValidElement(e)?a.a.cloneElement(a.a.Children.only(e),this.normalizeChildrenProps()):e},n.getFormProp=function(e,t){var n=this.getForm().props;return e in n?n[e]:t},n.getProp=function(e,t){var n=this.getForm().props,r=this.props;return e in r?r[e]:e in n?n[e]:t},n.getFormItemContext=function(){return{formItem:this}},n.render=function(){var e,t,n=this,r=this.props,i=(r.name,r.label),l=r.labelFor,o=r.showRequiredMark,s=r.required,u=r.className,c=r.prefixCls,m=r.style,f=r.renderExtra,d=r.children,h=this.getProp("disableValidator"),p=this.getProp("inline"),g=this.getProp("labelPosition"),v=this.getProp("labelAlign"),V=this.getFormProp("renderControlExtra",(function(e){return null})),b=this.hasError(),F=this.isValidating(),y=D()(d)?d(this.normalizeChildrenProps(),this):this.normalizeChildren(d);return a.a.createElement(_.Provider,{value:this.getFormItemContext()},a.a.createElement("div",{style:m,ref:this.saveDOM,className:E()(c,(e={},e[c+"-inline"]=p,e[c+"-"+g]=g,e["has-error"]=b,e["is-validating"]=F,e["is-required"]=(s||o)&&!h,e[""+u]=u,e))},i&&a.a.createElement("label",{htmlFor:l,className:E()((t={},t[c+"-label"]=!0,t[c+"-label-left"]="left"===v&&"left"===g,t),this.getProp("labelClassName")),style:Object.assign({width:this.getProp("labelWidth")},this.getProp("labelStyle",{}))},i),a.a.createElement("div",{className:E()(c+"-control",this.getProp("controlClassName")),style:this.getProp("controlStyle",{})},y,f?f(n):V(n))))},t}(a.a.Component);I.contextType=P,I.defaultProps={prefixCls:"nex-form-item",showRequiredMark:!1,name:"",validateDelay:0};var w=I;var O=function(e){var t=e.component,n=void 0===t?"input":t,r=e.value,i=e.inputRef,l=e.onChange,o=g()(e,["component","value","inputRef","onChange"]);return a.a.createElement(n,Object.assign({ref:i,onChange:function(e){var t=e.target.value;l&&l(t,e)},value:r},o))},A=T;A.Item=w,A.useForm=function(){return a.a.useContext(P).form},A.Context=P,A.useFormItem=function(){return a.a.useContext(_).formItem},A.ItemContext=_,A.NativeField=O;function N(e){var t=e.type,n=void 0===t?"text":t,r=e.component,i=void 0===r?"input":r,l=e.children,o=g()(e,["type","component","children"]);return a.a.createElement(w,h()({},o,{style:{marginBottom:24}}),a.a.createElement(O,{component:i,type:n,children:l}))}var L=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return t=e.call.apply(e,[this].concat(r))||this,f()(s()(t),"state",{formValue:{username:"\u9ed8\u8ba4",password:"",password2:"",email:""}}),f()(s()(t),"reset",(function(e){e.preventDefault(),t.form&&t.form.reset((function(){console.log(23)}))})),f()(s()(t),"onSubmit",(function(e){e.preventDefault(),t.form&&t.form.validateAndScroll((function(e){console.log(e)}))})),f()(s()(t),"renderFieldExtra",(function(e){return a.a.createElement("div",{style:{position:"absolute",color:"red",top:"100%"}},e.isValidating()?"\u6821\u9a8c\u4e2d...":e.getError())})),t}return c()(t,e),t.prototype.render=function(){var e=this,t=this.state.formValue;return a.a.createElement("div",null,a.a.createElement(T,{labelWidth:80,getDefaultFieldValue:function(){return""},requiredMessage:"\u4e0d\u80fd\u4e3a\u7a7a",ref:function(t){return e.form=t,window._form=t},labelAlign:"right",formValue:t,onChange:function(t){return e.setState({formValue:t})},onSubmit:this.onSubmit,renderControlExtra:this.renderFieldExtra},a.a.createElement("div",null,a.a.createElement(N,{required:!0,validateDelay:200,labelPosition:"top",name:"A1",label:"A1:"}),a.a.createElement(N,{required:!0,name:"username",label:"\u7528\u6237\u540d:"}),a.a.createElement(N,{required:!0,name:"password",label:"\u767b\u5f55\u5bc6\u7801:"}),a.a.createElement(N,{required:!0,name:"password2",label:"\u5bc6\u7801\u786e\u8ba4:"}),a.a.createElement(N,{required:!0,name:"email",label:"\u90ae\u7bb1\u5730\u5740:",validator:function(e,t,n){return console.log(n),new Promise((function(e,t){setTimeout(e,2e3)}))}}),a.a.createElement("button",null,"submit"),a.a.createElement("button",{onClick:this.reset},"reset"))))},t}(r.Component);n(188);function j(e){return a.a.createElement(O,h()({},e,{className:"",type:"text",style:{height:32,padding:"4px 7px"},component:"input"}))}var q=[{label:"\u57fa\u672c\u529f\u80fd1",component:L},{label:"\u57fa\u672c\u529f\u80fd2",component:function(e){function t(){for(var t,n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return t=e.call.apply(e,[this].concat(r))||this,f()(s()(t),"state",{formValue:{name:"",info:{gender:"\u7537"}}}),f()(s()(t),"reset",(function(e){e.preventDefault(),t.setState({formValue:{name:"haha",info:{gender:"\u7537"}}}),t.form.cleanErrors()})),f()(s()(t),"onSubmit",(function(e){e.preventDefault(),t.form&&t.form.validateAndScroll((function(e){console.log(e)}))})),f()(s()(t),"renderFieldExtra",(function(e){return a.a.createElement("div",{style:{color:"red",top:"100%"}},e.isValidating()?"\u6821\u9a8c\u4e2d...":e.getError())})),t}c()(t,e);var n=t.prototype;return n.getRules=function(){return{"info.address":function(){return!1},name:function(e){return""!==e||"\u4e0d\u80fd\u4e3a\u7a7a"}}},n.render=function(){var e=this,t=this.state.formValue;return a.a.createElement("div",null,a.a.createElement(T,{getDefaultFieldValue:function(){return""},ref:function(t){return e.form=t},formValue:t,validators:this.getRules(),onChange:function(t){return e.setState({formValue:t})},onSubmit:this.onSubmit,renderControlExtra:this.renderFieldExtra,validateTrigger:"blur",inline:!0},(function(n){return a.a.createElement("div",null,a.a.createElement(w,{labelFor:"12",name:"goods",validateTrigger:"change",required:!0,label:"\u59d3\u540d",inline:!0},a.a.createElement(j,null)),a.a.createElement(w,{name:"name",label:"\u59d3\u540d",inline:!0},a.a.createElement(j,null)),a.a.createElement(w,{help:"\u5fc5\u586b\u9009\u9879",name:"name2",label:"\u59d3\u540d",inline:!0},a.a.createElement(j,null)),a.a.createElement(w,{name:"name3",label:"\u59d3\u540d",inline:!0},a.a.createElement(j,{size:"small"})),a.a.createElement(w,{labelWidth:100,name:"name4",label:"\u59d3\u540d"},a.a.createElement(j,null)),a.a.createElement(w,{name:"name5",labelWidth:100,label:"\u59d3\u540d",inline:!0},a.a.createElement(j,null)),a.a.createElement(w,{name:"name6",label:"\u59d3\u540d",inline:!0},a.a.createElement(j,null)),a.a.createElement(w,{name:"name7",labelPosition:"top",label:"\u59d3\u540d"},a.a.createElement(j,null)),a.a.createElement(w,{name:"name8",labelPosition:"top",label:"\u59d3\u540d",inline:!0},a.a.createElement(j,null)),a.a.createElement(w,{name:"name9",label:"\u59d3\u540d"},a.a.createElement(O,{component:"input"})),a.a.createElement("div",null,n.isFieldValidating("name9")?"\u6570\u636e\u6821\u9a8c\u4e2d...":null),a.a.createElement(w,{name:"info.gender",label:"\u6027\u522b"},a.a.createElement(O,{component:"input"})),a.a.createElement(w,{name:"info.age",label:"\u5e74\u9f84",normalize:function(e){return parseInt(e)||""}},a.a.createElement(O,{component:"input"})),a.a.createElement(w,{name:"info.address",label:"\u5730\u5740"},a.a.createElement(O,{component:"input"})),a.a.createElement(w,{name:"info.list[0]",label:"L1",validator:function(e){return new Promise((function(t,n){setTimeout(e?t:function(){return n("\u6821\u9a8c\u5931\u8d25")},2e3)}))}},a.a.createElement(O,{component:"input"})),a.a.createElement("div",null,n.isFieldValidating("info.list[0]")?"\u6570\u636e\u6821\u9a8c\u4e2d...":null),a.a.createElement(w,{name:"info.list[1]",label:"L2",validator:function(e){return new Promise((function(t,n){setTimeout(e?t:function(){return n("\u6821\u9a8c\u5931\u8d25")},2e3)}))}},a.a.createElement(O,{component:"input"})),a.a.createElement("div",null,n.isFieldValidating("info.list[1]")?"\u6570\u636e\u6821\u9a8c\u4e2d...":null),a.a.createElement(w,{name:"info.country",label:"\u56fd\u7c4d"},a.a.createElement(O,{component:"select"},a.a.createElement("option",{value:"\u4e2d\u56fd"},"\u4e2d\u56fd"),a.a.createElement("option",{value:"\u7f8e\u56fd"},"\u7f8e\u56fd"),a.a.createElement("option",{value:"\u6fb3\u5927\u5229\u4e9a"},"\u6fb3\u5927\u5229\u4e9a"))),a.a.createElement(w,{name:"info.desc",label:"\u5907\u6ce8",alignItems:"top"},a.a.createElement(O,{component:"textarea"})),n.isValidating()?"\u8868\u5355\u6821\u9a8c\u4e2d...":null,a.a.createElement("pre",null,JSON.stringify(t)),a.a.createElement("pre",null,JSON.stringify(n.getError())),a.a.createElement("button",null,"submit"),a.a.createElement("button",{onClick:e.reset},"reset"))})))},t}(r.Component)}],B=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return t=e.call.apply(e,[this].concat(r))||this,f()(s()(t),"state",{current:q[0]}),t}c()(t,e);var n=t.prototype;return n.onDemoChange=function(e,t){this.setState({current:e})},n.render=function(){var e=this,t=this.state.current;return a.a.createElement("div",{className:"container"},a.a.createElement("div",{className:"slider"},q.map((function(n,r){return a.a.createElement("div",{className:t===n?"active":"",onClick:e.onDemoChange.bind(e,n)},n.label)}))),a.a.createElement("div",{className:"content"},t?a.a.createElement(t.component,null):null))},t}(r.Component);l.a.render(a.a.createElement(B,null),document.getElementById("demo"))}},[[102,1,2]]]);