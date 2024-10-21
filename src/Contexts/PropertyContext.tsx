import {ReactNode, createContext, useContext, useState, useEffect} from "react";
import {IProperty, IToken} from "../interfaces";
import axios, { AxiosResponse } from "axios";
import {getLocalStorage, removeLocalStorage, setLocalStorage} from "./LocalStorage.";
import {useMyContext} from "./TokenContext";

interface PropertyContext{
    properties:IProperty[]|undefined;
    removeProperty:(token:string,address:string)=>void;
    getProperties:(token:string)=>void;
    createProperty:(token:string,property:IProperty)=>void;
    setPropertiesFromLocal:(props:IProperty[])=>void;
}
const MyContext = createContext<PropertyContext|undefined>(undefined)

const MyPropertiesProvider: React.FC<{children:ReactNode}> = ({children})=>{
    const [properties,setProperties] = useState<IProperty[]|undefined>();


    useEffect(()=>{
        const storedProperties=getLocalStorage<IProperty[]>("properties");
        if(storedProperties){
            setProperties(storedProperties);
        }
    },[])

    useEffect(() => {
        if(properties){
            setLocalStorage('properties',properties)
        }
        else{
            removeLocalStorage('properties')
        }
    }, [properties]);

    const setPropertiesFromLocal=(props:IProperty[])=>{
        setProperties(props)
    }
    const getProperties= async(token:string)=>{

        try{
            console.log("tefds" + token)
            if(!properties){
                console.log("tefds")
                let response:AxiosResponse= await axios.get("http://localhost:9898/getAllProperties",{
                    params:{
                        token:token,
                    }
                })
                setProperties(response.data);
                console.log(response.data)
            }

        }
        catch(error){
            console.log(error)
        }

    }
    const createProperty= async (token:string,property:IProperty)=>{
        const response:AxiosResponse= await axios.post("http://localhost:9898/createProperty",
            {
                address:property.address,
                description:property.description,
                city:property.city,
                postCode:property.postCode,
                state:property.state,

            },
            {
                params:{
                    token
                }
            },
        )
        setProperties(response.data)
        console.log(response, property)
    }
    const removeProperty=async (token:string,address:string)=>{
        const response:AxiosResponse = await axios.delete("http://localhost:9898/deleteProperty",{
            params:{
                token:token,
                address:address,
            }
        })
        if(response.status===200){
            setProperties(response.data)
        }
        console.log(response)
    }
    return (
        <MyContext.Provider value={{properties,removeProperty,getProperties,createProperty,setPropertiesFromLocal}}>
            {children}
        </MyContext.Provider>
    )
}

const useMyPropertiesContext=()=> {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyContext must be used within a provider");
    }
    return context;
};
export{MyPropertiesProvider, useMyPropertiesContext}