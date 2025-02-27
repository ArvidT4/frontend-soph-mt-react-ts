import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {IProperty, IRequest, IResponse, IResponseUP, IToken} from "../interfaces";
import { useMyPropertiesContext } from "./PropertyContext";
import { useMyUPContext } from "./UserPropertiesContext";


interface RequestInterface{
    request:IRequest|undefined,
    addRequest:(request:IRequest,token:string,address:string,workerEmail:string)=>Promise<boolean>,
    deleteRequest:(token:string,reqId:string,propAddress:string)=>Promise<boolean>,
    getRequest:(propAddress:string,reqId:string, properties:IProperty[])=>void
    updateArchive:(request:IRequest,token:string,propAddress:string,reqId:string)=>Promise<boolean>,
    updateReqFromEmployee:(request:IRequest,token:IToken,propAddress:string,email:string)=>void,
}


const RequestContext=createContext<RequestInterface|undefined>(undefined);

const MyRequestProvider:React.FC<{ children: ReactNode }>=({children})=>{
    const {setProperties}=useMyPropertiesContext();
    const [property,setProperty]=useState<IProperty|undefined>();
    const [request,setRequest]=useState<IRequest|undefined>();
    const [reqId,setReqId]=useState<string>("");
    const addRequest= async (request:IRequest,token:string,address:string,workerEmail:string):Promise<boolean>=>{
        try{
            const response:AxiosResponse=await axios.post("http://localhost:9898/createGarbageRequest",{
                    id:"",
                    comment:request.comment,
                    startingDate:request.startingDate,
                    deadlineDate:request.deadlineDate,
                    workerEmail:request.workerEmail,
                    archived:request.archived,
                    accepted:request.accepted,
                    freeAgent:request.freeAgent
                }, {
                    headers: {
                        token,
                        address,
                        workerEmail,
                    }
                }
            )
            return true;
        }
        catch(err){
            console.log(err);
            return false;
        }

    }

    const deleteRequest= async (token:string,reqId:string,propAddress:string):Promise<boolean>=>{
        const response:AxiosResponse = await axios.delete("http://localhost:9898/DeleteRequest",{
            params:{
                token:token,
                reqId:reqId,
                propAddress:propAddress,
            }
        })

        const res:IResponse=response.data;
        if(res.res==='success'){
            setProperties(res.properties);
            return true;
        }
        return false;

    }
    const updateArchive= async (request:IRequest,token:string,propAddress:string,reqId:string):Promise<boolean>=>{

        const response:AxiosResponse= await axios.put("http://localhost:9898/updateGarbageRequestFromCustomer",{
                comment:request.comment,
                startingDate:request.startingDate,
                deadlineDate:request.deadlineDate,
                workerEmail:request.workerEmail,
                archived:!request.archived,
                accepted:request.accepted,
                freeAgent:request.freeAgent
            }, {
                headers: {
                    token,
                    propAddress,
                    reqId,
                }
            }
        )
        const res:IResponse=response.data;
        if(res.res==='success'){
            setProperties(res.properties);
            return true;
        }
        else return false;
    }

    useEffect(() => {
        if(property&&reqId) setRequest(property.workRequests.filter(req => req.id === reqId)[0]);
    }, [property,reqId]);
   
    const getRequest=(propAddress:string,reqId:string, properties:IProperty[])=>{
        setReqId(reqId)
        setProperty(properties.filter(prop=>prop.address===propAddress)[0]);

    }
    const {setUserPropertiesList}=useMyUPContext();
    const updateReqFromEmployee=async (request:IRequest,token:IToken,propAddress:string,email:string)=>{
        const response:AxiosResponse=await axios.put("http://localhost:9898/updateGarbageRequestFromEmployee",{
            id:request.id,
            comment:request.comment,
            startingDate:request.startingDate,
            deadlineDate:request.deadlineDate,
            workerEmail:request.workerEmail,
            archived:request.archived,
            accepted:request.accepted,
            finished:request.finished,
            freeAgent:request.freeAgent
        },{
            headers:{
                token:token.token,
                address:propAddress,
                email:email,
                reqId:request.id
            }
        })
        const res:IResponseUP=response.data;
        if(res.res=="success"){
            setUserPropertiesList(res.userProperties)
        }
    }

    return(
        <RequestContext.Provider value={{request ,addRequest,deleteRequest,getRequest,updateArchive,updateReqFromEmployee}}>
            {children}
        </RequestContext.Provider>
    )
}

const useMyRequestContext=()=> {
    const context = useContext(RequestContext);
    if (!context) {
        throw new Error("useMyRequestContext must be used within a provider");
    }
    return context;
};
export{useMyRequestContext, MyRequestProvider}