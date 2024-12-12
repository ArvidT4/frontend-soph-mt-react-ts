import { IRequest } from "../../../../../interfaces";
import styles from "../../../../../css-modules/RequestPage.module.css"
import DateComp from "./DateComp";
import ReqBoolean from "./ReqBoolean";
import BoolWrap from "./BoolWrap";
import RequestButtons from "./RequestButtons";
interface RequestProps{
    request:IRequest;
    propAddress:string
    email:string;
}
const RequestComp:React.FC<RequestProps>=({request,propAddress,email})=>{
    return(
        <div className={styles.reqWrap}>
            <div className={styles.attrWrap}><span className={styles.attrTitle}>Comment: </span>  {request.comment} {request.id}</div>
            <BoolWrap request={request}/>
            <DateComp starting={request.startingDate} deadline={request.deadlineDate}></DateComp>
            <RequestButtons email={email} propAddress={propAddress} request={request}/>
        </div>
    )
}
export default RequestComp