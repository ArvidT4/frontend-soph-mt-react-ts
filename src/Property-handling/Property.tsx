import { IProperty } from "../interfaces"
import styles from "../css-modules/Property.module.css"
import myImage from "../images/images.json"
import edit from "../images/edit.svg.png"
import deleteImg from "../images/trashCan.png"
import { useState } from "react";
import DeleteButton from "../Components/DeleteButton";

interface props{
    key:number
    property:IProperty
}
//address:string;
//description:string;
//city:string;
//postCode:number;
//state:string;
//collectingId:string;
const Property =({property}:props)=>{
    const [dropdownShown,setDropdownShown] = useState<boolean>(false)
    const dropdown=():void=>{
        setDropdownShown(!dropdownShown)
    }


    return (

    <div className={styles.propWrap}>
        
        <div>
            
            <div className={dropdownShown?styles.infoDrop:styles.infoContainer}>
                <div className={styles.propAddress}>{property.address}</div>
                <div className={styles.dropButton}>
                    <img className={!dropdownShown?styles.imageDrop:styles.imageDropPressed} src={myImage.icons[0].icon} onClick={dropdown}/>
                </div>
            </div>

            <div className={!dropdownShown ? styles.dropdownHidden : styles.dropdownContent}>
                <div className={styles.cityPostal}>
                    <div className={!dropdownShown ? styles.propInfoHidden : (styles.propInfo + " " + styles.city)}>
                        <span className={styles.infoTitle}>City:</span> <span className={styles.infoText}>{property.city}</span>
                    </div>
                    <div className={!dropdownShown ? styles.propInfoHidden : (styles.propInfo + " " + styles.postal)}>
                        <span className={styles.infoTitle}>Postal code:</span> <span
                        className={styles.infoText}>{property.postCode}</span>
                    </div>
                </div>
                <div className={!dropdownShown ? styles.propInfoHidden : styles.propInfo + " " + styles.state}>
                    <div className={styles.stateWrap}>
                        <span className={styles.infoTitle}>State:</span>
                        <span className={styles.infoText}>{property.state}</span>
                    </div>
                    <div className={styles.imgWrap}>
                        <div><img className={styles.utilityImg} src={edit}/></div>
                        <DeleteButton address={property.address}></DeleteButton>
                    </div>
                </div>

                <div className={!dropdownShown ? styles.propInfoHidden :styles.propInfo + " " +  styles.description}>
                    <span className={styles.infoTitle}>Description:</span> <span
                    className={styles.infoText}>{property.description}</span>
                </div>
            </div>

        </div>

    </div>
    )
}
export default Property;