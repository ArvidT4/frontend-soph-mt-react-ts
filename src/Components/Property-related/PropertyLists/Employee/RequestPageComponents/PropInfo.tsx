import { IProperty } from "../../../../../interfaces"
import styles from "../../../../../css-modules/RequestPage.module.css"
interface PropProps{
    property:IProperty
}
const PropInfo:React.FC<PropProps>=({property})=>{


    return(
        <div className={styles.infoWrap}>
            <div className={styles.title}>Property info</div>
            <div className={styles.propInfoWrap}><span className={styles.propTitle}>Address: </span> {property.address}</div>
            <div className={styles.propInfoWrap}><span className={styles.propTitle}>Postal code: </span> {property.postCode}</div>
            <div className={styles.propInfoWrap}><span className={styles.propTitle}>City: </span>{property.city}</div>
            <div className={styles.propInfoWrap}><span className={styles.propTitle}>State: </span>{property.state}</div>
            <div className={styles.desc + " " + styles.propInfoWrap}><span className={styles.propTitle}>Description: </span>{property.description}</div>
        </div>
    )
}
export default PropInfo