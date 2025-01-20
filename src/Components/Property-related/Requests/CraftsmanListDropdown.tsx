import {useEffect, useState } from "react"
import { useMyHandleChangeContext } from "../../../Contexts/HandleChangeContext";
import arrow from "../../../images/arrowDown.png"
import styles from "../../../css-modules/CraftsmanDropdown.module.css"
import DropDownContent from "./DropDownContent";
interface CraftsmanProps{
    address:string|undefined,
    workerEmail:string,
    setWorkerEmail:React.Dispatch<React.SetStateAction<any>>
}
const CraftsmanListDropdown:React.FC<CraftsmanProps>=({workerEmail,setWorkerEmail,address})=>{
    const [drop,setDrop]=useState<boolean>(false)
    const [cmClass,setCmClass]=useState<string>(styles.craftBoiler);
    useEffect(() => {
        if(workerEmail!="Choose craftsman"){
            setCmClass(styles.craftEmail)
        }
    }, [workerEmail]);
    return(
        <div>
            <div className={drop ? styles.dropDownShown : styles.dropDownDiv} onClick={() => setDrop(!drop)}>
                <div className={cmClass}>
                    {workerEmail}
                </div>
                <div className={styles.arrowDiv}>
                    <img src={"arrow"} className={drop? styles.arrowDropped:styles.arrow}/>
                </div>
            </div>
            <DropDownContent drop={drop} setDrop={setDrop} setWorkerEmail={setWorkerEmail} address={address}/>
        </div>
    )
}

export default CraftsmanListDropdown