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
    const {updateReqFromEmployee}=useMyRequestContext();
    const {token}=useMyContext();
    const updateReqFinished=()=>{
        console.log(request)
        request.finished=!request.finished;
        if(token&&propAddress&&request)updateReqFromEmployee(request,token,propAddress,email);

    }
    const updateReqAccepted=()=>{
        console.log(request)

        if(!request.accepted){
            request.freeAgent=false;
        }
        else request.freeAgent=true;
        request.accepted=!request.accepted;

        if(token&&propAddress&&request)updateReqFromEmployee(request,token,propAddress,email);

    }
    return(
        <div className={styles.buttonWrap}>
            {request.accepted ?<div className={styles.finishedButtonWrap}>
                    <ReqButton reqFunction={updateReqFinished} title={"Finish request"}/>
                    <ReqButton reqFunction={updateReqAccepted} title={"Reject request"}/>
                </div>
                : <ReqButton reqFunction={updateReqAccepted} title={"Accept request"}/>
            }
        </div>

    )
}
export default RequestButtons