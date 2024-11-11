import {createContext, ReactNode, useContext} from "react";
import axios, {AxiosResponse} from "axios";
import {IRequest} from "../interfaces";


interface RequestInterface{
    addRequest:(request:IRequest,token:string,address:string,workerEmail:string)=>Promise<boolean>,
}


const RequestContext=createContext<RequestInterface|undefined>(undefined);

const MyRequestProvider:React.FC<{ children: ReactNode }>=({children})=>{
    const addRequest= async (request:IRequest,token:string,address:string,workerEmail:string):Promise<boolean>=>{

        console.log(request)
        console.log(token)
        console.log(address)
        console.log(workerEmail)
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
        console.log(response);

        return true;
    }

    return(
        <RequestContext.Provider value={{addRequest}}>
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