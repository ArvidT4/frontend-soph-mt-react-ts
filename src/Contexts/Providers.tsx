import { MyAlertProvider } from "./AlertContext"
import { MyPropertiesProvider } from "./PropertyContext";
import { MyTokenProvider } from "./TokenContext"
import React from 'react';
const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <MyTokenProvider>
            <MyAlertProvider>
                <MyPropertiesProvider>
                    {children}
                </MyPropertiesProvider>
            </MyAlertProvider>
        </MyTokenProvider>
    )
}

export default Providers;