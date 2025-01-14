import {useEffect, useState } from "react";
import styles from "../../../../../css-modules/RequestPage.module.css"
import { IRequest } from "../../../../../interfaces"
import RequestComp from "./RequestComp"
import FilterRequestsEmp from "./FilterRequestsEmp";
interface RequestProps{
    requests:IRequest[];
    propAddress:string;
    email:string;
}
const Requests:React.FC<RequestProps>=({requests,propAddress,email})=>{

    const [reqs,setReqs]=useState<IRequest[]>();
    useEffect(() => {
        setReqs(requests)
    }, [requests]);
    return(
        <div className={styles.requestsWrap}>
            <div className={styles.requestsTitle}>Requests</div>
            {reqs&&<div className={styles.filterWrap}><FilterRequestsEmp setRequests={setReqs} requests={reqs}/></div>}
            {reqs&&reqs.map((request,key)=><RequestComp email={email} propAddress={propAddress} request={request} key={key}></RequestComp>)}
        </div>
    )
}
export default Requests