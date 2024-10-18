import { IProperty } from "../interfaces"
import "./PropertyStylng.css"
import { Dropdown } from "flowbite-react";
import myImage from "../images/images.json"
import edit from "../images/edit.svg.png"
import deleteImg from "../images/trashCan.png"
import { useState } from "react";

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

    <div className={"prop-wrap"}>
        
        <div className={"info-wrap"}>
            
            <div className={dropdownShown?"info-drop":"info-container"}>
                <div className={"prop-address"}>{property.address}</div>
                <div className={"drop-button"}>
                    <img className={!dropdownShown?"image-drop":"image-drop-pressed"} src={myImage.icons[0].icon} onClick={dropdown}/>
                </div>
            </div>

            <div className={!dropdownShown ? 'dropdown-hidden' : 'dropdown-content'}>
                <div className={"city-postal"}>
                    <div className={!dropdownShown ? 'prop-info-hidden' : "prop-info city"}>
                        <span className={"info-title"}>City:</span> <span className={"info-text"}>{property.city}</span>
                    </div>
                    <div className={!dropdownShown ? 'prop-info-hidden' : "prop-info postal"}>
                        <span className={"info-title"}>Postal code:</span> <span
                        className={"info-text"}>{property.postCode}</span>
                    </div>
                </div>
                <div className={!dropdownShown ? 'prop-info-hidden' : "prop-info state"}>
                    <div className={"stateWrap"}>
                        <span className={"info-title"}>State:</span>
                        <span className={"info-text"}>{property.state}</span>
                    </div>
                    <div className={"imgWrap"}>
                        <div><img className={"utilityImg"} src={edit}/></div>
                        <div><img className={"utilityImg"} src={deleteImg}/></div>
                    </div>
                </div>

                <div className={!dropdownShown ? 'prop-info-hidden' : "prop-info prop-description"}>
                    <span className={"info-title"}>Description:</span> <span
                    className={"info-text"}>{property.description}</span>
                </div>
            </div>

        </div>

    </div>
    )
}
export default Property;