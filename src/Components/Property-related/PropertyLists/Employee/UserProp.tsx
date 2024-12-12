import { IProperty } from "../../../../interfaces";
import styles from "../../../../css-modules/UserProperties.module.css"
interface UserProperty{
    property:IProperty;
    email:string
}
const UserProp:React.FC<UserProperty>=({property,email})=>{
    return(
        <div className={styles.userPropWrap}>
            <div className={styles.propInfoWrapLeft}>
                <span className={styles.propTitles}>Address:</span> {property.address}
            </div>
            <div className={styles.propInfoWrapRight}>
                <span className={styles.propTitles}>City:</span> {property.city}
            </div>
            <div className={styles.propInfoWrapLeft}>
                <span className={styles.propTitles}>Postal code:</span> {property.postCode}
            </div>
            <div className={styles.propInfoWrapRight}>
                <span className={styles.propTitles}>State: </span> {property.state}
            </div>
            <div className={styles.fullCol}>
                <span className={styles.propTitles}>Description: </span> {property.description}
            </div>
            {property.workRequests.length > 0 ? <div className={styles.fullCol}>
                <span>There are <span
                    className={styles.reqLength}>{property.workRequests.length}</span> job request[s]. <a
                    className={styles.link} href={`/${email}/${property.address}/Requests`}>View here.</a> </span>
                </div> :
                <div className={styles.fullCol}>
                    <span>There are <span className={styles.reqLength}>{property.workRequests.length}</span> job request[s].</span>
                </div>
            }

        </div>
    )
}
export default UserProp