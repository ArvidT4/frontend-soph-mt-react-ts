import React, {ReactNode, createContext, useContext, useState, useEffect} from "react"
import { IToken } from "../interfaces";
import {getLocalStorage,setLocalStorage,removeLocalStorage} from "./LocalStorage.";

interface TokenContext{
    token?:IToken|null
    addToken:(token:IToken) => void
}

const MyContext = createContext<TokenContext|undefined>(undefined)


const MyTokenProvider: React.FC<{children:ReactNode}> = ({children})=>{


    const [token,setToken] = useState<IToken|null>();

    useEffect(()=>{
        const storedToken=getLocalStorage<IToken>("token");
        if(storedToken){
            setToken(storedToken);
        }
    },[])

    useEffect(() => {
        if(token){
            setLocalStorage('token',token)
        }
        else{
            removeLocalStorage('token')
        }
    }, [token]);
    const addToken=(token:IToken)=>{
        setToken(token);
        console.log(token);
    }
    return (
        <MyContext.Provider value={{token,addToken}}>
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