import { useEffect } from "react"
import { useMyRequestContext } from "../../../../../Contexts/RequestContext"
import { useMyContext } from "../../../../../Contexts/TokenContext"
import styles from "../../../../../css-modules/RequestPage.module.css"
import { IRequest } from "../../../../../interfaces"
import ReqButton from "./ReqButton"
interface ButtonProps{
    request:IRequest
    propAddress:string
    email:string;
}
const RequestButtons:React.FC<ButtonProps>=({request,propAddress,email})=>{
    const {acceptRequest}=useMyRequestContext();
    const {token}=useMyContext();
    const finishRequest=()=>{

    }
    const acceptReq=()=>{
        if(token&&propAddress)acceptRequest(request,token,propAddress,email);

    }
    return(
        <div className={styles.buttonWrap}>
            {request.accepted ?<ReqButton reqFunction={()=>console.log("ss")} title={"Finish request"}/>
                : <ReqButton reqFunction={acceptReq} title={"Accept request"}/>
            }
        </div>

    )
}
export default RequestButtons