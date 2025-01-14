import { MyAlertProvider } from "./AlertContext"
import { MyHandleChangeProvider } from "./HandleChangeContext";
import { MyInputValidationProvider } from "./InputValidationContext";
import { MyPropertiesProvider } from "./PropertyContext";
import { MyTokenProvider } from "./TokenContext"
import React from 'react';
import {MyRequestProvider} from "./RequestContext";
import { MyUPProvider } from "./UserPropertiesContext";
import { MyNavbarProvider } from "./NavbarContext";
const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (

        <MyTokenProvider>
            <MyNavbarProvider>
                <MyUPProvider>
                    <MyHandleChangeProvider>
                        <MyInputValidationProvider>
                            <MyAlertProvider>
                                <MyPropertiesProvider>
                                    <MyRequestProvider>
                                    {children}
                                    </MyRequestProvider>
                                </MyPropertiesProvider>
                            </MyAlertProvider>
                        </MyInputValidationProvider>
                    </MyHandleChangeProvider>
                </MyUPProvider>
            </MyNavbarProvider>
        </MyTokenProvider>
    )
}

export default Providers;