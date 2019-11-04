
import React from "react";
import FormContext from "./FormContext";
export default (function () {
  var context = React.useContext(FormContext);
  return context.form;
});