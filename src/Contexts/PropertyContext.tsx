import {ReactNode, createContext, useContext, useState } from "react";
import { IProperty } from "../interfaces";
import axios, { AxiosResponse } from "axios";
import { setLocal } from "./LocalStorage.";

interface PropertyContext{
    properties:IProperty[]
    addBoiler:()=>void;
    removeProperty:(token:string,address:string)=>void;
    getProperties:(token:string)=>void;
    createProperty:(token:string,property:IProperty)=>void;
    setPropertiesFromLocal:(props:IProperty[])=>void;
}
const MyContext = createContext<PropertyContext|undefined>(undefined)

const MyPropertiesProvider: React.FC<{children:ReactNode}> = ({children})=>{
    const [properties,setProperties] = useState<IProperty[]>([]);
    const addBoiler=()=>{
        const boiler:IProperty= {
            Id: "fdsaf23",
            address: "BOkgatan 234",
            description: "Här bor jag och min familj",
            city: "Halmen",
            postCode: 30054,
            state: "Halland",
            collectingId: ""
        }
        setProperties((prevState)=>[...prevState,boiler]);
        setProperties((prevState)=>[...prevState,boiler]);
        setProperties((prevState)=>[...prevState,boiler]);

    }
    const setPropertiesFromLocal=(props:IProperty[])=>{
        setProperties(props)
    }
    const getProperties= async(token:string)=>{
        let response:AxiosResponse= await axios.get("http://localhost:9898/getAllProperties",{
            params:{
                token:token,
            }
        })
        setProperties(response.data);
        setLocal("properties",response.data);
        console.log(response.data)
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
        setLocal("properties",response.data);
        console.log(response, property)
    }
    const removeProperty=(token:string,address:string)=>{
        const repsonse:Promise<AxiosResponse> = axios.delete("http://localhost:9898/deleteProperty",{
            params:{
                token:token,
                address:address,
            }
        })
        console.log(repsonse)
    }
    return (
        <MyContext.Provider value={{properties,addBoiler,removeProperty,getProperties,createProperty,setPropertiesFromLocal}}>
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