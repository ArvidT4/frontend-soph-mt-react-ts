import {ReactNode, createContext, useContext, useState, useEffect} from "react";
import {IProperty, IResponse, IToken,IUserProperties} from "../interfaces";
import axios, { AxiosResponse } from "axios";
import {
    getPropertyArrayFromSessionStorage,
} from "./LocalStorage.";
import { useMyUPContext } from "./UserPropertiesContext";
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

interface PropertyContext{
    properties:IProperty[]|undefined;
    userPropertiesList:IUserProperties[]|undefined;
    removeProperty:(token:string,address:string)=>Promise<boolean>;
    setProperties:React.Dispatch<React.SetStateAction<any>>
    getProperty:(address:string)=>IProperty|undefined;
    getProperties:(token:IToken)=>void;
    createProperty:(property:IProperty,token:string)=>Promise<boolean>;
    editProperty:(property:IProperty,token:string)=>Promise<boolean>;
    addWorkerToProperty:(token:string,workerMail:string,propId:string)=>Promise<IResponse>
}
const MyContext = createContext<PropertyContext|undefined>(undefined)

const MyPropertiesProvider: React.FC<{children:ReactNode}> = ({children})=>{
    const [properties,setProperties] = useState<IProperty[]|undefined>();
    const [userPropertiesList,setUserPropertiesList]=useState<IUserProperties[]>();

    useEffect(()=>{
        const storedProperties: IProperty[] = getPropertyArrayFromSessionStorage();
        if (storedProperties.length > 0) {
            setProperties(storedProperties);
        }
    }, []);

    useEffect(() => {
        if (properties&&properties.length > 0) {
            sessionStorage.setItem('properties', JSON.stringify(properties));
        } else {
            sessionStorage.removeItem('properties');
        }
    }, [properties]);


    const getProperty=(address:string):IProperty|undefined=>{
        if(properties){
            const property:IProperty|undefined=properties.find(obj=>obj.address===address)
            return property
        }else return undefined
    }
    const {getPropertiesForEmployee} = useMyUPContext();
    const getProperties= async(token:IToken)=>{

        try{

            if(token.role=="employee")getPropertiesForEmployee(token);
            else if(token.role=="customer")getPropertiesForCustomer(token)

        }
        catch(error){
            console.log(error)
        }

    }
    const getPropertiesForCustomer= async(token:IToken)=>{
        let response:AxiosResponse= await axios.get("http://localhost:9898/getAllProperties",{
            params:{
                token:token.token,
            }
        })
        setProperties(response.data);
    }

    const createProperty= async (property:IProperty,token:string): Promise<boolean>=>{
        try{
            const response:AxiosResponse= await axios.post("http://localhost:9898/createProperty",
                {
                    address:property.address,
                    description:property.description,
                    city:property.city,
                    postCode:property.postCode,
                    state:property.state,
                },
                {
                    headers:{
                        token
                    }
                },
            )

            if(response.status===201){
                setProperties(response.data)
                return true;
            }
            return false
        }
        catch(error){
            console.log("error"  + error)
            return false
        }

    }
    const removeProperty=async (token:string,address:string):Promise<boolean>=>{
        const response:AxiosResponse = await axios.delete("http://localhost:9898/deleteProperty",{
            params:{
                token:token,
                address:address,
            }
        })
        if(response.status===200){
            setProperties(response.data)
            return true;
        }
        else return false
    }
    const editProperty = async (property: IProperty, token: string): Promise<boolean> => {
        try {
            const response: AxiosResponse = await axios.put(
                `http://localhost:9898/updateProperty`,
                {
                    Id: property.id,
                    address: property.address,
                    description: property.description,
                    city: property.city,
                    postCode: property.postCode,
                    state: property.state,
                },
                {
                    params: {
                        token: token,
                        id: property.id,
                    },
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                setProperties(response.data);
                return true;  // Return true if successful
            }

            return false;  // Return false if not successful
        } catch (error) {
            console.log("Server error: " + error);
            return false;  // Return false in case of error
        }
    };
    const addWorkerToProperty=async (token:string,workerMail:string,propId:string):Promise<IResponse>=>{
        try{
            let response:AxiosResponse= await axios.put("http://localhost:9898/AddWorkerToWorkerEmail",{

                token:token,
                workerMail:workerMail,
                propId:propId

            })
            let res:IResponse=response.data;
            if(res.res=="success"){
                setProperties(res.properties);
            }
            return res;
        }catch(err){
            console.log(err)
            const response:IResponse={res:"error",properties:[]}
            return response;
        }

    }
    return (
        <MyContext.Provider value={{properties,userPropertiesList,removeProperty,getProperty,getProperties,createProperty,editProperty,addWorkerToProperty,setProperties}}>
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