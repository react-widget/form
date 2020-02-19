import React from "react";

export interface IFormContext {
    form: Record<string, any>;
}

export default React.createContext<IFormContext>({ form: {} });
