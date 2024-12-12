import delImg from "../../../../images/trashCan.png"
import styles from "../../../../css-modules/ReqMenu.module.css"
import { useMyRequestContext } from "../../../../Contexts/RequestContext";
import { useMyContext } from "../../../../Contexts/TokenContext";
import { useNavigate } from "react-router-dom";
interface ReqProps{
    reqId:string;
    address:string;
}
const DeleteReq:React.FC<ReqProps>=({reqId,address})=>{
    
    const navigate=useNavigate();
    const del=()=>{
        navigate(`/Properties/${address}/${reqId}/DeleteRequest`);
    }
    return(
        <div className={styles.imgWrap} onClick={del}>
            <img className={styles.img} src={delImg}/>
        </div>
    )
}
export default DeleteReq