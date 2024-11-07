import { MyAlertProvider } from "./AlertContext"
import { MyHandleChangeProvider } from "./HandleChangeContext";
import { MyInputValidationProvider } from "./InputValidationContext";
import { MyPropertiesProvider } from "./PropertyContext";
import { MyTokenProvider } from "./TokenContext"
import React from 'react';
const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (

        <MyTokenProvider>
            <MyHandleChangeProvider>
                <MyInputValidationProvider>
                    <MyAlertProvider>
                        <MyPropertiesProvider>
                            {children}
                        </MyPropertiesProvider>
                    </MyAlertProvider>
                </MyInputValidationProvider>
            </MyHandleChangeProvider>

        </MyTokenProvider>
    )
}

export default Providers;