(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{102:function(e,t,n){},103:function(e,t,n){},104:function(e,t,n){},150:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(57),o=n.n(i),l=(n(99),n(100),n(101),n(102),n(103),n(104),n(1)),s=n.n(l),u=n(9),c=n.n(u),f=n(31),m=n.n(f),p=n(58),h=n.n(p),d=a.a.createContext({});function g(){return(g=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function v(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function E(){}var y=function(e){var t,n;function r(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return b(v(t=e.call.apply(e,[this].concat(r))||this),"fieldLocks",{}),b(v(t),"formLockId",1),b(v(t),"fields",[]),b(v(t),"_validateCb",[]),b(v(t),"state",{formError:{},validatingFields:{},formValue:t.props.defaultFormValue||{}}),b(v(t),"handleSubmit",(function(e){e.preventDefault()})),t}n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,r.getDerivedStateFromProps=function(e,t){return{formValue:e.formValue||t.formValue}};var i=r.prototype;return i.addField=function(e){var t=e.props.name;e._initialValue=this.getValue(t),this.fields.push(e)},i.removeField=function(e){var t=this.fields.indexOf(e);if(-1!==t){var n=e.props.name;this.state.formError[n]=null,this.fields.splice(t,1)}},i.getInitialFormValue=function(){var e={};return this.fields.forEach((function(t){e[t.props.name]=t._initialValue})),e},i.reset=function(e){var t=this.getInitialFormValue();this.fieldLocks={},this.formLockId=1,this.state.validatingFields={},this.state.formValue=t,this.state.formError={},this.setValues({},e)},i.getInitialValue=function(e){var t;return this.fields.forEach((function(n){n.props.name===e&&(t=n._initialValue)})),t},i.resetField=function(e,t){this.cleanError(e);var n=this.getInitialValue(e);this.fieldLocks[e]=1,this.state.validatingFields[e]=!1,this.state.formError[e]=null,this.setValue(e,n,t)},i.getFormValue=function(){return this.state.formValue},i.getValues=function(){return this.state.formValue},i.setValues=function(e,t){void 0===e&&(e={});var n=this.props,r=n.path2obj,a=n.onChange,i=this.state.formValue,o="formValue"in this.props,l=i;Object.keys(e).forEach((function(t){var n=e[t];r?m()(l,t,n):l[t]=n})),o||this.setState({formValue:l}),a&&a(l),t&&this._validateCb.push(t)},i.setFormValue=function(e,t){return this.setValues(e,t)},i.getValue=function(e){var t=this.props.getDefaultFieldValue,n=this.props.path2obj,r=this.state.formValue,a=n?h()(r,e):r[e];return void 0===a&&t?t(e,r):a},i.setValue=function(e,t,n){var r=this.props,a=r.path2obj,i=r.onChange,o=this.state.formValue,l="formValue"in this.props,s=o;a?m()(s,e,t):s[e]=t,l||this.setState({formValue:s}),i&&i(s),n&&this._validateCb.push(n)},i.getFieldValue=function(e){return this.getValue(e)},i.setFieldValue=function(e,t,n){return this.setValue(e,t,n)},i.componentDidUpdate=function(){var e=this.state.formValue,t=this._validateCb;this._validateCb=[],t.forEach((function(t){t(e)}))},i.componentWillUnmount=function(){this._validateCb=[]},i.hasError=function(e){return null!=this.state.formError[e]},i.getError=function(e){return this.state.formError[e]},i.cleanError=function(e){var t,n=this.state.formError;this.hasError(e)&&this.setState({formError:g({},n,(t={},t[e]=null,t))})},i.setError=function(e,t){var n,r=this.state.formError;this.setState({formError:g({},r,(n={},n[e]=t,n))})},i.cleanErrors=function(){this.setState({formError:{}})},i.setErrors=function(e){var t=this.state.formError;this.setState(g({},t,{},e))},i.getFieldValidatorList=function(e){var t=[];this.fields.filter((function(t){return t.props.name===e})).forEach((function(n){var r=n.props;r.required&&t.unshift((function(t){if(function(e){return void 0===e||null===e||(!(!Array.isArray(e)||e.length)||"string"===typeof e&&!e)}(t))return n.getProp("requiredMessage",e+" check fail")})),r.validator&&t.push.apply(t,Array.isArray(r.validator)?r.validator:[r.validator])}));var n=this.props.validators[e];return n&&t.push.apply(t,Array.isArray(n)?n:[n]),t.filter((function(e){return"function"===typeof e}))},i.isFieldValidating=function(e){return!!this.state.validatingFields[e]},i.isValidating=function(){var e=this.state.validatingFields;return Object.keys(e).some((function(t){return e[t]}))},i._validateField=function(e,t,n){void 0===n&&(n="none"),t="function"===typeof t?t:E;var r=this.state.formValue,a=this.getValue(e),i=this.getFieldValidatorList(e);if(i.length){var o=function(n){void 0===n&&(n=null),null===n&&i.length?l():(null!==n&&(Array.isArray(n)||(n=[n]),n=n.map((function(t){var n=t;return t instanceof Error&&(n=t.message),{name:e,message:n}}))),t(n,a))},l=function(){var t=i.shift();if(t){var l=t(a,r,n);!0===l?o():!1===l?o(e+" check fail"):l&&l.then?l.then((function(){return o()}),(function(e){return o(e)})):o(l)}};l()}else t(null,a)},i.validateField=function(e,t,n){var r=this;t="function"===typeof t?t:E;var a=this.props.asyncTestDelay,i=this.state,o=i.formError,l=i.validatingFields;this.fieldLocks[e]=this.fieldLocks[e]||1;var s=++this.fieldLocks[e],u=setTimeout((function(){var t;u=null,s===r.fieldLocks[e]&&r.setState({validatingFields:g({},l,(t={},t[e]=!0,t))})}),a);this._validateField(e,(function(n,a){var i,c;u&&clearTimeout(u),s===r.fieldLocks[e]?r.setState({formError:g({},o,(i={},i[e]=n?n[0].message:null,i)),validatingFields:g({},l,(c={},c[e]=!1,c))},(function(){t(n,a)})):t(n,a,!0)}),n)},i.validate=function(e,t){var n=this;e="function"===typeof e?e:E;var r=this.props.asyncTestDelay,a=this.state,i=a.formValue,o=a.formError;this.fieldLocks={};var l=++this.formLockId,s=this.fields,u={},c=[],f=0,m=function(){l===n.formLockId&&n.setState({formError:o,validatingFields:u})};if(s.length){var p=!1;s.forEach((function(e){var t=e.props.name;f++,u[t]=!0,t in o||(o[t]=null)})),s.forEach((function(a){var s=a.props.name,h=!1,d=setTimeout((function(){h=!0,d=null,p||(p=!0,m())}),r);n._validateField(s,(function(t){u[s]=!1,d&&(clearTimeout(d),d=null),h&&m(),function(t,r){if(f--,t&&(o[r]=t[0].message,c.push.apply(c,t)),f<=0){if(l!==n.formLockId)return e(c.length?c:null,i,!0),void console.log("abort");console.log("validate"),n.setState({formError:o,validatingFields:{}},(function(){e(c.length?c:null,i)}))}}(t,s)}),t)}))}else e(null,i)},i.validateAndScroll=function(e,t){var n=this;e="function"===typeof e?e:E,this.validate((function(t,r,a){if(t)for(var i=n.fields,o=0;o<i.length;o++){var l=i[o],s=l.props.name;if(n.hasError(s)){var u=l.getDOM();if(u&&u.scrollIntoView){u.scrollIntoView();break}}}e(t,r,a)}),t)},i.getFormContext=function(){return{form:this}},i.render=function(){var e=this.props,t=e.prefixCls,n=e.style,r=e.className,i=e.onSubmit,o=e.component,l=e.children;return a.a.createElement(d.Provider,{value:this.getFormContext()},a.a.createElement(o,{style:n,className:c()(t,r),onSubmit:i||this.handleSubmit},"function"===typeof l?l(this):l))},r}(a.a.Component);y.propTypes={prefixCls:s.a.string,className:s.a.string,style:s.a.object,path2obj:s.a.bool,defaultFormValue:s.a.object,getDefaultFieldValue:s.a.func,renderControlExtra:s.a.func,formValue:s.a.object,validators:s.a.object,validateDelay:s.a.number,validateTrigger:s.a.oneOfType([s.a.oneOf(["blur","change","none"]),s.a.array]),asyncTestDelay:s.a.number,component:s.a.node,requiredMessage:s.a.string,labelWidth:s.a.oneOfType([s.a.string,s.a.number]),labelStyle:s.a.object,labelClassName:s.a.string,labelPosition:s.a.oneOf(["top","left"]),labelAlign:s.a.oneOf(["left","right"]),controlStyle:s.a.object,controlClassName:s.a.string,clearErrorOnFocus:s.a.bool,inline:s.a.bool,normalizeFieldValue:s.a.func,onSubmit:s.a.func,onChange:s.a.func,getInputProps:s.a.func},y.defaultProps={prefixCls:"nex-form",className:"",style:{},validators:{},path2obj:!0,component:"form",asyncTestDelay:100,validateDelay:0,validateTrigger:["change"],labelPosition:"left",labelAlign:"right",clearErrorOnFocus:!0,inline:!1};var V=y,F=a.a.createContext({});function C(){return(C=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function O(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function P(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var w=function(e){var t,n;function r(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return P(O(t=e.call.apply(e,[this].concat(r))||this),"saveDOM",(function(e){t._dom=e})),P(O(t),"_validateTimer",null),P(O(t),"handleChange",(function(e,n){e!==t.getValue()&&t.setValue(e,(function(e){n&&n(),t.hasValidateTrigger("change")&&t.triggerValidate("change")}))})),P(O(t),"handleFocus",(function(e){var n=t.getProp("clearErrorOnFocus");e&&e(),n&&(t._validateTimer&&clearTimeout(t._validateTimer),t.cleanError())})),P(O(t),"handleBlur",(function(e){e&&e(),t.hasValidateTrigger("blur")&&t.triggerValidate("blur")})),t.getForm().addField(O(t)),t}n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n;var i=r.prototype;return i.getDOM=function(){return this._dom},i.getForm=function(){return this.context.form},i.componentWillUnmount=function(){this.getForm().removeField(this)},i.hasValidateTrigger=function(e){void 0===e&&(e="none");var t=this.getProp("validateTrigger",[]);return-1!==(t=Array.isArray(t)?t:[t]).indexOf(e)},i.getValidateDelay=function(){var e=this.getForm().props.validateDelay,t=this.props;return"validateDelay"in t?t.validateDelay:e},i.getInitialValue=function(){var e=this.props.name;return this.getForm().getInitialValue(e)},i.reset=function(e){var t=this.getForm(),n=this.props.name;t.resetField(n,e)},i.hasError=function(){var e=this.getForm(),t=this.props.name;return e.hasError(t)},i.getError=function(){var e=this.getForm(),t=this.props.name;return e.getError(t)},i.cleanError=function(){var e=this.getForm(),t=this.props.name;return e.cleanError(t)},i.setError=function(e){var t=this.getForm(),n=this.props.name;return t.setError(n,e)},i.isValidating=function(){var e=this.getForm(),t=this.props.name;return e.isFieldValidating(t)},i.validate=function(e,t){void 0===t&&(t="none");var n=this.getForm(),r=this.props.name;n.validateField(r,e,t)},i.getValue=function(){var e=this.getForm(),t=this.props.name;return e.getValue(t)},i.setValue=function(e,t){var n=this.getForm(),r=this.props.name;n.setValue(r,e,t)},i.triggerValidate=function(e){var t=this,n=this.getValidateDelay();n>0?(this._validateTimer&&clearTimeout(this._validateTimer),this._validateTimer=setTimeout((function(){t.validate(null,e)}),n)):this.validate(null,e)},i.normalizeChildrenProps=function(){var e=this,t=this.props,n=t.normalize,r=t.name,a=t.onChange,i=t.onFocus,o=t.onBlur,l=this.getForm(),s=this.getFormProp("normalizeFieldValue");s&&!n&&(n=s.bind(null,r));var u=this.getFormProp("getInputProps",(function(){return{}}))(this);return C({value:this.getValue()},u,{onChange:function(t){var r=l.getFormValue(),i=e.getValue();n&&(t=n(t,i,r)),e.handleChange(t,(function(){a&&a(t),u.onChange&&u.onChange(t)}))},onFocus:function(t){e.handleFocus((function(){i&&i(t),u.onFocus&&u.onFocus(t)}))},onBlur:function(t){e.handleBlur((function(){o&&o(t),u.onBlur&&u.onBlur(t)}))}})},i.normalizeChildren=function(){return a.a.cloneElement(a.a.Children.only(this.props.children),this.normalizeChildrenProps())},i.getFormProp=function(e,t){return this.getForm().props[e]||t},i.getProp=function(e,t){var n=this.getForm().props,r=this.props;return e in r?r[e]:n[e]||t},i.getFormItemContext=function(){return{formItem:this}},i.render=function(){var e,t,n=this,r=this.props,i=(r.name,r.label),o=r.showRequiredMark,l=r.required,s=r.className,u=r.prefixCls,f=r.style,m=r.renderExtra,p=r.children,h=this.getProp("inline"),d=this.getProp("labelPosition"),g=this.getProp("labelAlign"),v=this.getFormProp("renderControlExtra"),b=this.hasError(),E=this.isValidating(),y="function"===typeof p?p(this.normalizeChildrenProps(),this):this.normalizeChildren();return a.a.createElement(F.Provider,{value:this.getFormItemContext()},a.a.createElement("div",{style:f,ref:this.saveDOM,className:c()(u,(e={},e[u+"-inline"]=h,e[u+"-"+d]=d,e["has-error"]=b,e["is-validating"]=E,e["is-required"]=l||o,e[""+s]=s,e))},i&&a.a.createElement("label",{htmlFor:this.getProp("labelFor"),className:c()((t={},t[u+"-label"]=!0,t[u+"-label-left"]="left"===g&&"left"===d,t),this.getProp("labelClassName")),style:C({width:this.getProp("labelWidth")},this.getProp("labelStyle",{}))},i),a.a.createElement("div",{className:c()(u+"-control",this.getProp("controlClassName")),style:this.getProp("controlStyle",{})},y,m?m(n):v?v(n):null)))},r}(a.a.Component);P(w,"contextType",d),w.propTypes={children:s.a.oneOfType([s.a.func,s.a.node]).isRequired,name:s.a.string,style:s.a.object,className:s.a.string,label:s.a.node,labelFor:s.a.oneOfType([s.a.string,s.a.number]),labelWidth:s.a.oneOfType([s.a.string,s.a.number]),labelStyle:s.a.object,labelClassName:s.a.string,labelPosition:s.a.oneOf(["top","left"]),labelAlign:s.a.oneOf(["left","right"]),controlStyle:s.a.object,controlClassName:s.a.string,validator:s.a.oneOfType([s.a.func,s.a.array]),showRequiredMark:s.a.bool,required:s.a.bool,requiredMessage:s.a.string,clearErrorOnFocus:s.a.bool,normalize:s.a.func,renderExtra:s.a.func,validateDelay:s.a.number,validateTrigger:s.a.oneOf(["blur","change"]),inline:s.a.bool},w.defaultProps={prefixCls:"nex-form-item",showRequiredMark:!1};var _=w;function j(){return(j=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function T(e){var t=e.component,n=void 0===t?"input":t,r=e.value,i=e.inputRef,o=e.onChange,l=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,["component","value","inputRef","onChange"]);return a.a.createElement(n,j({ref:i,onChange:function(e){var t=e.target.value;o&&o(t,e)},value:r},l))}V.Item=_,V.NativeInput=T,V.Context=d,V.ItemContext=F;function x(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function S(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function D(){return(D=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function k(e){var t=e.type,n=void 0===t?"text":t,r=e.component,i=void 0===r?"input":r,o=e.children,l=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,["type","component","children"]);return a.a.createElement(_,D({},l,{style:{marginBottom:24}}),a.a.createElement(T,{component:i,type:n,children:o}))}function A(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function I(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function N(){return(N=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function q(e){return a.a.createElement(T,N({},e,{className:"",type:"text",style:{height:32,padding:"4px 7px"},component:"input"}))}var L=[{label:"\u57fa\u672c\u529f\u80fd1",component:function(e){var t,n;function r(){for(var t,n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return S(x(t=e.call.apply(e,[this].concat(r))||this),"state",{formValue:{username:"\u9ed8\u8ba4",password:"",password2:"",email:""}}),S(x(t),"reset",(function(e){e.preventDefault(),t.form&&t.form.reset((function(){console.log(23)}))})),S(x(t),"onSubmit",(function(e){e.preventDefault(),t.form&&t.form.validateAndScroll((function(e){console.log(e)}))})),S(x(t),"renderFieldExtra",(function(e){return a.a.createElement("div",{style:{position:"absolute",color:"red",top:"100%"}},e.isValidating()?"\u6821\u9a8c\u4e2d...":e.getError())})),t}return n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,r.prototype.render=function(){var e=this,t=this.state.formValue;return a.a.createElement("div",null,a.a.createElement(V,{labelWidth:80,getDefaultFieldValue:function(){return""},requiredMessage:"\u4e0d\u80fd\u4e3a\u7a7a",ref:function(t){return e.form=t,window._form=t},labelAlign:"right",formValue:t,onChange:function(t){return e.setState({formValue:t})},onSubmit:this.onSubmit,renderControlExtra:this.renderFieldExtra},a.a.createElement("div",null,a.a.createElement(k,{required:!0,validateDelay:200,labelPosition:"top",name:"A1",label:"A1:"}),a.a.createElement(k,{required:!0,name:"username",label:"\u7528\u6237\u540d:"}),a.a.createElement(k,{required:!0,name:"password",label:"\u767b\u5f55\u5bc6\u7801:"}),a.a.createElement(k,{required:!0,name:"password2",label:"\u5bc6\u7801\u786e\u8ba4:"}),a.a.createElement(k,{required:!0,name:"email",label:"\u90ae\u7bb1\u5730\u5740:",validator:function(e,t,n){return console.log(n),new Promise((function(e,t){setTimeout(e,2e3)}))}}),a.a.createElement("button",null,"submit"),a.a.createElement("button",{onClick:this.reset},"reset"))))},r}(r.Component)},{label:"\u57fa\u672c\u529f\u80fd2",component:function(e){var t,n;function r(){for(var t,n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return I(A(t=e.call.apply(e,[this].concat(r))||this),"state",{formValue:{name:"",info:{gender:"\u7537"}}}),I(A(t),"reset",(function(e){e.preventDefault(),t.setState({formValue:{name:"haha",info:{gender:"\u7537"}}}),t.form.cleanErrors()})),I(A(t),"onSubmit",(function(e){e.preventDefault(),t.form&&t.form.validateAndScroll((function(e){console.log(e)}))})),I(A(t),"renderFieldExtra",(function(e){return a.a.createElement("div",{style:{color:"red",top:"100%"}},e.isValidating()?"\u6821\u9a8c\u4e2d...":e.getError())})),t}n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n;var i=r.prototype;return i.getRules=function(){return{"info.address":function(){return!1},name:function(e){return""!==e||"\u4e0d\u80fd\u4e3a\u7a7a"}}},i.render=function(){var e=this,t=this.state.formValue;return a.a.createElement("div",null,a.a.createElement(V,{getDefaultFieldValue:function(){return""},ref:function(t){return e.form=t},formValue:t,validators:this.getRules(),onChange:function(t){return e.setState({formValue:t})},onSubmit:this.onSubmit,renderControlExtra:this.renderFieldExtra,validateTrigger:"blur",inline:!0},(function(n){return a.a.createElement("div",null,a.a.createElement(_,{labelFor:"12",name:"goods",validateTrigger:"change",required:!0,label:"\u59d3\u540d",inline:!0},a.a.createElement(q,null)),a.a.createElement(_,{name:"name",label:"\u59d3\u540d",inline:!0},a.a.createElement(q,null)),a.a.createElement(_,{help:"\u5fc5\u586b\u9009\u9879",name:"name",label:"\u59d3\u540d",inline:!0},a.a.createElement(q,null)),a.a.createElement(_,{name:"name",label:"\u59d3\u540d",inline:!0},a.a.createElement(q,{size:"small"})),a.a.createElement(_,{labelWidth:100,name:"name",label:"\u59d3\u540d"},a.a.createElement(q,null)),a.a.createElement(_,{name:"name",labelWidth:100,label:"\u59d3\u540d",inline:!0},a.a.createElement(q,null)),a.a.createElement(_,{name:"name",label:"\u59d3\u540d",inline:!0},a.a.createElement(q,null)),a.a.createElement(_,{name:"name",labelPosition:"top",label:"\u59d3\u540d"},a.a.createElement(q,null)),a.a.createElement(_,{name:"name",labelPosition:"top",label:"\u59d3\u540d",inline:!0},a.a.createElement(q,null)),a.a.createElement(_,{name:"name",label:"\u59d3\u540d"},a.a.createElement(T,{component:"input"})),a.a.createElement("div",null,n.isFieldValidating("name")?"\u6570\u636e\u6821\u9a8c\u4e2d...":null),a.a.createElement(_,{name:"info.gender",label:"\u6027\u522b"},a.a.createElement(T,{component:"input"})),a.a.createElement(_,{name:"info.age",label:"\u5e74\u9f84",normalize:function(e){return parseInt(e)||""}},a.a.createElement(T,{component:"input"})),a.a.createElement(_,{name:"info.address",label:"\u5730\u5740"},a.a.createElement(T,{component:"input"})),a.a.createElement(_,{name:"info.list[0]",label:"L1",validator:function(e){return new Promise((function(t,n){setTimeout(e?t:function(){return n("\u6821\u9a8c\u5931\u8d25")},2e3)}))}},a.a.createElement(T,{component:"input"})),a.a.createElement("div",null,n.isFieldValidating("info.list[0]")?"\u6570\u636e\u6821\u9a8c\u4e2d...":null),a.a.createElement(_,{name:"info.list[1]",label:"L2",validator:function(e){return new Promise((function(t,n){setTimeout(e?t:function(){return n("\u6821\u9a8c\u5931\u8d25")},1e3)}))}},a.a.createElement(T,{component:"input"})),a.a.createElement("div",null,n.isFieldValidating("info.list[1]")?"\u6570\u636e\u6821\u9a8c\u4e2d...":null),a.a.createElement(_,{name:"info.country",label:"\u56fd\u7c4d"},a.a.createElement(T,{component:"select"},a.a.createElement("option",{value:"\u4e2d\u56fd"},"\u4e2d\u56fd"),a.a.createElement("option",{value:"\u7f8e\u56fd"},"\u7f8e\u56fd"),a.a.createElement("option",{value:"\u6fb3\u5927\u5229\u4e9a"},"\u6fb3\u5927\u5229\u4e9a"))),a.a.createElement(_,{name:"info.desc",label:"\u5907\u6ce8",alignItems:"top"},a.a.createElement(T,{component:"textarea"})),n.isValidating()?"\u8868\u5355\u6821\u9a8c\u4e2d...":null,a.a.createElement("pre",null,JSON.stringify(t)),a.a.createElement("pre",null,JSON.stringify(n.getError())),a.a.createElement("button",null,"submit"),a.a.createElement("button",{onClick:e.reset},"reset"))})))},r}(r.Component)}];var R=function(e){var t,n;function r(){for(var t,n,r,a,i=arguments.length,o=new Array(i),l=0;l<i;l++)o[l]=arguments[l];return t=e.call.apply(e,[this].concat(o))||this,n=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(t),r="state",a={current:L[0]},r in n?Object.defineProperty(n,r,{value:a,enumerable:!0,configurable:!0,writable:!0}):n[r]=a,t}n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n;var i=r.prototype;return i.onDemoChange=function(e,t){this.setState({current:e})},i.render=function(){var e=this,t=this.state.current;return a.a.createElement("div",{className:"container"},a.a.createElement("div",{className:"slider"},L.map((function(n,r){return a.a.createElement("div",{className:t===n?"active":"",onClick:e.onDemoChange.bind(e,n)},n.label)}))),a.a.createElement("div",{className:"content"},t?a.a.createElement(t.component,null):null))},r}(r.Component);o.a.render(a.a.createElement(R,null),document.getElementById("demo"))},59:function(e,t,n){n(60),e.exports=n(150)}},[[59,1,2]]]);