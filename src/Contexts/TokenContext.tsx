import React, {ReactNode, createContext, useContext, useState, useEffect} from "react"
import {IToken } from "../interfaces";

import {getTokenFromSessionStorage} from "./LocalStorage.";
import axios, { AxiosResponse } from "axios";


interface TokenContext{
    token?:IToken|null
    addToken:(token:IToken) => void
    checkForEmail:(email:string)=>Promise<boolean>
}

const MyContext = createContext<TokenContext|undefined>(undefined)


const MyTokenProvider: React.FC<{children:ReactNode}> = ({children})=>{


    const [token,setToken] = useState<IToken|null>();


    useEffect(()=>{
        const storedToken:IToken|undefined = getTokenFromSessionStorage();
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            sessionStorage.setItem('token', JSON.stringify(token));
        } else {
            sessionStorage.removeItem('properties');
        }
    }, [token]);
    const addToken=(token:IToken)=>{


        setToken(token);
        console.log(token);
    }

    const checkForEmail= async(email:string):Promise<boolean>=>{
        const response: AxiosResponse = await axios.get("http://localhost:9898/checkInactiveEmployee", {
            params:{
                email:email
            }
        })
        if(response.status==200)return response.data;

        else return false;
    }


    return (
        <MyContext.Provider value={{token,addToken,checkForEmail}}>
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


