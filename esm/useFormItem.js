
import React from "react";
import FormItemContext from "./FormItemContext";
export default (function () {
  var context = React.useContext(FormItemContext);
  return context.formItem;
});