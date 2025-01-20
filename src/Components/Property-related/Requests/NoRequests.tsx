import styles from "../../../css-modules/RequestFeed.module.css"
import AddRequest from "../../Menu/AddRequest"
import img from "../../../images/add.png"
interface NoReqProps{
    propAddress:string,
}
const NoRequests:React.FC<NoReqProps>=({propAddress})=>{

    return(
        <div className={styles.noReqWrap}>
            <div className={styles.noRequests}>
                No requests created at the moment.
                <AddRequest propAddress={propAddress} image={"img"}></AddRequest>
            </div>
        </div>
    )
}

export default NoRequests