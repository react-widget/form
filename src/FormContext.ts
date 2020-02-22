import React from "react";
import { Form } from "./Form";

export interface IFormContext {
    form: Form;
}

export default React.createContext<IFormContext>({ form: {} as Form });
