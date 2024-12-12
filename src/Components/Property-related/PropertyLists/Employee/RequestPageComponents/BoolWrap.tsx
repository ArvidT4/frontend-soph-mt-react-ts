import { IRequest } from "../../../../../interfaces"
import ReqBoolean from "./ReqBoolean"
import styles from "../../../../../css-modules/RequestPage.module.css"
interface BoolProp{
    request:IRequest,
}
const BoolWrap:React.FC<BoolProp>=({request})=>{

    return(<div>

        <ReqBoolean title={"Finished"} bool={request.finished}/>
        <div className={styles.centerBool}>
            <ReqBoolean title={"Accepted"} bool={request.accepted}/>
        </div> 
        <div className={styles.bottomBool}>
            <ReqBoolean title={"Free agent"} bool={request.freeAgent}/>

        </div>

    </div>)
}
export default BoolWrap