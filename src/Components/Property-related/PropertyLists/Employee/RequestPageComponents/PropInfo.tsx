import { IProperty } from "../../../../../interfaces"
import styles from "../../../../../css-modules/RequestPage.module.css"
import arrow from "../../../../../images/backArrow.png"
import { useNavigate } from "react-router-dom"
interface PropProps{
    property:IProperty
}
const PropInfo:React.FC<PropProps>=({property})=>{
    const navigate=useNavigate();

    return(
        <div className={styles.infoWrap}>
            <div className={styles.styleWrap}>
                    <div className={styles.imgWrap}>
                        <img onClick={()=>navigate(-1)} className={styles.img} src={"arrow"}/>
                    </div>
                    <div className={styles.title}>Property info</div>

            </div>
            <div className={styles.propInfoWrap}><span className={styles.propTitle}>Address: </span><div>{property.address}</div></div>
            <div className={styles.propInfoWrap}><span className={styles.propTitle}>Postal code: </span><div>{property.postCode}</div></div>
            <div className={styles.propInfoWrap}><span className={styles.propTitle}>City: </span><div>{property.city}</div></div>
            <div className={styles.propInfoWrap}><span className={styles.propTitle}>State: </span><div>{property.state}</div> </div>
            <div className={styles.desc + " " + styles.propInfoWrap}><span className={styles.propTitle}>Description: </span><div>{property.description}</div></div>
        </div>
    )
}
export default PropInfo