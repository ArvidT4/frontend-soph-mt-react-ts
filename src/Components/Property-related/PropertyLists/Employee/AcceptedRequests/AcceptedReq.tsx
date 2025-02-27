import {IRequest, IUserProperty} from "../../../../../interfaces";
import DateComp from "../RequestPageComponents/DateComp";
import styles from "../../../../../css-modules/AcceptedRequests.module.css"
import {useNavigate} from "react-router-dom";
import {useCallback, useRef} from "react";
import {useMyUPContext} from "../../../../../Contexts/UserPropertiesContext";
interface props{
    request:IRequest
}

const AcceptedReq:React.FC<props>=({request})=>{

    const navigate=useNavigate();
    const {getUserPropFromReq}=useMyUPContext()
    const uPRef=useRef<IUserProperty|undefined>();

    const navToReq=useCallback(()=>{
        uPRef.current=getUserPropFromReq(request);
        if(uPRef.current) navigate(`/${uPRef.current?.userEmail}/${uPRef.current?.property.address}/Requests`)
    },[]);
    return(<div className={styles.reqWrap}>

        <div className={styles.comment}><span className={styles.spanHolder}>Comment:</span> {request.comment}</div>
        <DateComp starting={request.startingDate} deadline={request.deadlineDate}></DateComp>
        <div className={styles.navButtonHolder}>
            <button className={styles.navButton} onClick={navToReq}>Go to property</button>
        </div>
    </div>)
}
export default AcceptedReq