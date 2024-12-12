import styles from "../../../css-modules/RequestFeed.module.css"
import { IRequest } from "../../../interfaces"
import WorkRequest from "./WorkRequest"
interface RequestProps{
    requests:IRequest[]
    address:string
}
const RequestFeed:React.FC<RequestProps>=({requests,address})=>{

    return(
        <div className={styles.wrap}>
            {requests.map((request:IRequest,key:number)=>(
                <WorkRequest request={request} key={key} address={address}/>
            ))}
        </div>
    )
}
export default RequestFeed