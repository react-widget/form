import React from "react";
import FormItemContext from "./FormItemContext";

export default () => {
    const context = React.useContext(FormItemContext);
    return context.formItem;
};
