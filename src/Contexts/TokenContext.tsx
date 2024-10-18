import React, {ReactNode, createContext, useContext, useState } from "react"
import { IToken } from "../interfaces";
import {getLocal, setLocal } from "./LocalStorage.";

interface TokenContext{
    token?:IToken
    addToken:(token:IToken) => void
    getToken:()=>void
}

const MyContext = createContext<TokenContext|undefined>(undefined)

const MyTokenProvider: React.FC<{children:ReactNode}> = ({children})=>{
    const [token,setToken] = useState<IToken>();
    const addToken=(token:IToken)=>{
        setToken(token);
        setLocal("token",token);
        console.log(token);
    }
    const getToken=():IToken|undefined=>{

        const tokenStorage:IToken=getLocal("token");
        if(!tokenStorage) return undefined;
        setToken((tokenStorage));
        return tokenStorage;
    }
    return (
        <MyContext.Provider value={{token,addToken,getToken}}>
            {children}
        </MyContext.Provider>
    )
}

const useMyContext=()=> {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyContext must be used within a provider");
    }
    return context;
};
export{MyTokenProvider, useMyContext}