import { IProperty, IRequest } from "../interfaces"
import styles from "../css-modules/Property.module.css"
import myImage from "../images/images.json"
import edit from "../images/edit.svg.png"
import deleteImg from "../images/trashCan.png"
import {useEffect, useState } from "react";
import DeleteButton from "../Components/Menu/DeleteButton";
import EditButton from "../Components/Menu/EditButton"
import MenuButton from "../Components/Menu/MenuButton"
import Menu from "../Components/Menu/Menu"
import RequestFeed from "../Components/Property-related/Requests/RequestFeed"
import FilterRequests from "../Components/Property-related/Requests/FilterRequests"
import NoRequests from "../Components/Property-related/Requests/NoRequests"

interface props{
    key:number
    property:IProperty
}

const Property =({property}:props)=>{
    const [show,setShow]=useState<boolean>(false);
    const [dropdownShown,setDropdownShown] = useState<boolean>(false)
    const [renderReq,setRenderReq]=useState<boolean>(false);
    const [requests,setRequests]=useState<IRequest[]>();
    const dropdown=():void=>{
        setDropdownShown(!dropdownShown)
    }
    const setMenuDropdown=():void=>{
        setShow(!show);
    }
    useEffect(() => {
        if(property){
            setRequests(property.workRequests);
            setRenderReq(true);
        }
    }, [property]);


    return (

    <div className={styles.propWrap}>
        <div>
            <div className={dropdownShown ? styles.infoDrop : styles.infoContainer}>
                <div className={styles.propAddress}>{property.address}</div>
                <div className={styles.dropButton}>
                    <img className={!dropdownShown ? styles.imageDrop : styles.imageDropPressed}
                         src={myImage.icons[0].icon} onClick={dropdown}/>
                </div>
            </div>


            <div className={!dropdownShown ? styles.dropdownHidden : styles.dropdownContent}>
                <div className={!dropdownShown ? styles.dropdownHidden : styles.imgWrap}>
                    <MenuButton setShow={setShow} show={show}/>
                </div>
                {show&&<Menu prop={property}/>}
                <div className={styles.cityPostal}>
                    <div className={!dropdownShown ? styles.propInfoHidden : (styles.propInfo + " " + styles.city)}>
                        <span className={styles.infoTitle}>City:</span> <span
                        className={styles.infoText}>{property.city}</span>
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
                </div>

                <div className={!dropdownShown ? styles.propInfoHidden : styles.propInfo + " " + styles.description}>
                    <span className={styles.infoTitle}>Description:</span> <span
                    className={styles.infoText}>{property.description}</span>
                </div>
                <div className={!dropdownShown ? styles.propInfoHidden : styles.propInfo}>
                    {renderReq && requests?
                        <div>
                            <FilterRequests setRequests={setRequests} requests={requests}/>
                            <RequestFeed address={property.address} requests={requests}/>
                        </div>:
                        <NoRequests propAddress={property.address}></NoRequests>
                    }
                </div>
            </div>

        </div>

    </div>
    )
}
export default Property;