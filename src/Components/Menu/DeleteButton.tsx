import styles from "../../css-modules/Menu.module.css";
import deleteImg from "../../images/trashCan.png";
import React from "react";
import { useNavigate } from "react-router-dom";

interface props{
    address:string,

}
const DeleteButton:React.FC<props> =({address}:props)=> {


    const navigate=useNavigate();
    const deleteNavigate=()=>{
        navigate(`/Properties/${address}/deleteProperty`)
    }

    
    const button: React.ReactElement = <div><img  className={styles.utilityImg} src={deleteImg}
                                                 alt={"delete"}/></div>

    return (
        <div className={styles.buttonWrap} onClick={deleteNavigate}>
            <div className={styles.button}>
                {button}
            </div>
            <p className={styles.buttonTitle}>Delete property</p>
        </div>
    )
}
export default DeleteButton