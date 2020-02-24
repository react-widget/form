import React from "react";

import { FormItem } from "./FormItem";

export interface IFormItemContext {
    formItem: FormItem;
}

export default React.createContext<IFormItemContext>({
    formItem: {} as FormItem,
});
