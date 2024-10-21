import styles from "../css-modules/DeleteButton.module.css";
import deleteImg from "../images/trashCan.png";
import React from "react";
import {useMyPropertiesContext} from "../Contexts/PropertyContext";
import property from "../Property-handling/Property";
import {useMyContext} from "../Contexts/TokenContext";

interface props{
    address:string,
}
const DeleteButton =({address}:props)=>{
    const {removeProperty}=useMyPropertiesContext()
    const {token}=useMyContext()
    const deleteProp=()=>{
        try{
            if(token){
                removeProperty(token.token,address)
                console.log("test")
            }
        }
        catch(error){
            console.log("test")
        }

    }

    const button:React.ReactElement=<div><img onClick={deleteProp} className={styles.utilityImg} src={deleteImg} alt={"delete"}/></div>
    return(
        button
    )
}
export default DeleteButton