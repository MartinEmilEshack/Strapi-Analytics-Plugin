import React, { createContext } from 'react';

const FormModalContext = createContext((data) => console.log(data));

export const FormModalProvider = FormModalContext.Provider;
export default FormModalContext;