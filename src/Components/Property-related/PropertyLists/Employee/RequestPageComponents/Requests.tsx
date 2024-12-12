import styles from "../../../../../css-modules/RequestPage.module.css"
import { IRequest } from "../../../../../interfaces"
import RequestComp from "./RequestComp"
interface RequestProps{
    requests:IRequest[];
    propAddress:string;
    email:string;
}
const Requests:React.FC<RequestProps>=({requests,propAddress,email})=>{
    return(
        <div className={styles.requestsWrap}>
            <div className={styles.requestsTitle}>Requests</div>
            {requests&&requests.map((request,key)=><RequestComp email={email} propAddress={propAddress} request={request} key={key}></RequestComp>)}
        </div>
    )
}
export default Requests