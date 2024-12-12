import menu from "../../../../images/pngegg.png"
import style from "../../../../css-modules/ReqMenu.module.css"
import { useState } from "react";
import DeleteReq from "./DeleteReq";
import Archive from "./Archive";
interface ReqProps{
    address:string,
    reqId:string,
}
const ReqMenu:React.FC<ReqProps>=({address,reqId})=>{
    return(
        <div className={style.wrap}>
            <DeleteReq reqId={reqId} address={address}/>
            <Archive reqId={reqId} address={address}/>
        </div>
    )
}
export default ReqMenu