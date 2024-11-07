import styles from "../../css-modules/Menu.module.css";
import edit from "../../images/edit.svg.png";
import React from "react";
import {useMyPropertiesContext} from "../../Contexts/PropertyContext";
import property from "../../Property-handling/Property";
import {useMyContext} from "../../Contexts/TokenContext";
import { IProperty } from "../../interfaces";
import { useNavigate } from "react-router-dom";
interface editButtonProps{
    prop:IProperty
}

const EditButton:React.FC<editButtonProps>=({prop})=> {
    const navigate = useNavigate();
    const editProperty=()=>{
        console.log("Clicked",prop);

        navigate(`/editProperty/${prop.address}`)
    }


    const button: React.ReactElement = <div><img className={styles.utilityImg} src={edit}/></div>
    return (
        <div className={styles.buttonWrap} onClick={editProperty}>
            <div className={styles.button}>
                {button}
            </div>
            <p className={styles.buttonTitle}>Edit property</p>
        </div>
    )
}

export default EditButton