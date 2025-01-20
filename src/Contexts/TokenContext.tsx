import React, {ReactNode, createContext, useContext, useState, useEffect} from "react"
import {IToken } from "../interfaces";

import {getTokenFromSessionStorage} from "./LocalStorage.";
import axios, { AxiosResponse } from "axios";


interface TokenContext{
    token?:IToken|null
    addToken:(token:IToken) => void
    checkForEmail:(email:string)=>Promise<boolean>
    checkToken:()=>Promise<boolean>
    checkAdmin:()=>Promise<boolean>
    logout:()=>Promise<boolean>
    RegisterEmployeeFromAdmin:(email:string)=>Promise<boolean>
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
    const checkToken  =async ():Promise<boolean>=>{
        try{
            if(token){
                const response:AxiosResponse=await axios.get("http://localhost:9898/checkToken",{
                    params:{
                        token:token.token
                    }
                })
                return response.data;
            }
            return true;
        }
       catch (err){
            console.log(err)
           return true;
       }

    }
    const checkAdmin=async ():Promise<boolean>=>{
        try{
            if(token){
                const response:AxiosResponse=await axios.get("http://localhost:9898/checkAdmin",{
                    params:{
                        token:token.token
                    }
                })
                return response.data;
            }
            return false;
        }
        catch (err){
            console.log(err)
            return false;
        }

    }
    const addToken=(token:IToken)=>{


        setToken(token);
        console.log(token);
    }

    const logout=async():Promise<boolean>=>{
        if(!token) return false
        const reponse:AxiosResponse=await axios.delete("http://localhost:9898/logout", {headers:{
                token:token.token
            }})
        console.log(reponse)
        return true
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
    const RegisterEmployeeFromAdmin = async (email:string):Promise<boolean>=>{

        try{
            if(token){
                console.log(email);
                const response:AxiosResponse= await axios.post("http://localhost:9898/registerEmployee",
                    {},
                    {
                        headers:{
                            email:email,
                            token:token.token,
                        }
                    });
                console.log(response)
                return response.data;
            }
            return false;

        }
        catch (err){
            console.log(err)
            return false;
        }
    }


    return (
        <MyContext.Provider value={{token,addToken,checkForEmail,checkToken,logout,checkAdmin,RegisterEmployeeFromAdmin}}>
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


