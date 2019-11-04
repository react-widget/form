import React from "react";
import FormContext from "./FormContext";

export default () => {
    const context = React.useContext(FormContext);
    return context.form;
};
