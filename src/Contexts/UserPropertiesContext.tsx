import {ReactNode, createContext, useContext, useEffect, useState } from "react";
import {IProperty, IRequest, IToken, IUserProperties, IUserProperty} from "../interfaces";
import { getUserPropertyArrayFromSessionStorage } from "./LocalStorage.";
import axios, { AxiosResponse } from "axios";

interface UPContext{
    userPropertiesList:IUserProperties[]|undefined;
    getPropertiesForEmployee:(token:IToken)=>void;
    getProperty:(propAddress:string,email:string)=>IProperty|undefined;
    setUserPropertiesList:React.Dispatch<React.SetStateAction<any>>
    getUserPropFromReq:(req:IRequest)=>IUserProperty|undefined
}
const uPContext=createContext<UPContext|undefined>(undefined);

const MyUPProvider: React.FC<{children:ReactNode}> = ({children})=>{
    const [userPropertiesList,setUserPropertiesList]=useState<IUserProperties[]|undefined>();


    useEffect(()=>{
        const storedUserProperties: IUserProperties[] = getUserPropertyArrayFromSessionStorage();
        if (storedUserProperties.length > 0) {
            setUserPropertiesList(storedUserProperties);
        }
    }, []);
    useEffect(() => {
        if (userPropertiesList&&userPropertiesList.length > 0) {
            sessionStorage.setItem('userPropertiesList', JSON.stringify(userPropertiesList));
        } else {
            sessionStorage.removeItem('userPropertiesList');
        }
    }, [userPropertiesList])
    const getPropertiesForEmployee= async(token:IToken)=>{
        let response:AxiosResponse= await axios.get("http://localhost:9898/getAllPropertiesForEmployee",{
            params:{
                token:token.token,
            }
        })
        setUserPropertiesList(response.data);
    }
    const getProperty=(address:string,email:string):IProperty|undefined=>{
        if(userPropertiesList){
            const uP:IUserProperties|undefined= userPropertiesList.find(obj=>obj.userEmail==email);
            if(uP) return uP.propertyList.find(obj=>obj.address==address);

            return undefined
        }
        else return undefined
    }
    const getUserPropFromReq=(req:IRequest):IUserProperty | undefined=>{

        if (userPropertiesList) {
            const userProp = userPropertiesList.find(uP =>
                uP.propertyList.some(prop =>
                    prop.workRequests.some(obj => obj.id === req.id) // Match by `id`
                )
            );

            if (userProp) {
                const prop:IProperty|undefined=userProp.propertyList.find(obj=>
                    obj.workRequests.some(objReq=>objReq.id===req.id)
                )
                if(prop){
                    const userProperty:IUserProperty={userEmail:userProp.userEmail,property:prop};
                    return userProperty;
                }
            }
        }
        return undefined;
    }

    return (
        <uPContext.Provider value={{userPropertiesList,getPropertiesForEmployee,getProperty,setUserPropertiesList,getUserPropFromReq}}>
            {children}
        </uPContext.Provider>
    )
}

const useMyUPContext=()=> {
    const context = useContext(uPContext);
    if (!context) {
        throw new Error("useMyContext must be used within a provider");
    }
    return context;
};
export{MyUPProvider, useMyUPContext}

