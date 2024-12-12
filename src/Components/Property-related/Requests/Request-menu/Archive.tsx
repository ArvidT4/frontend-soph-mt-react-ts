import { useNavigate } from "react-router-dom";
import styles from "../../../../css-modules/ReqMenu.module.css"
import archive from "../../../../images/archive_2001114.png"
interface ArchiveProps{
    reqId:string,
    address:string,
}
const Archive:React.FC<ArchiveProps>=({address,reqId})=>{

    const navigate=useNavigate();
    const archiveRequest=()=>{
        navigate(`/Properties/${address}/${reqId}/ArchiveRequest`)
    }
    return(
        <div className={styles.archiveWrap} onClick={archiveRequest}>
            <img className={styles.imgArchive} src={archive}/>
        </div>
    )
}
export default Archive