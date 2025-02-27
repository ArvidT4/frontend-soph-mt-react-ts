import { useEffect, useState } from "react";
import styles from "../../../css-modules/CraftsmanDropdown.module.css"
import { useMyPropertiesContext } from "../../../Contexts/PropertyContext";
import { IProperty } from "../../../interfaces";
import { useParams } from "react-router-dom";
interface ContentProps{
    drop:boolean
    address:string|undefined
    setWorkerEmail:React.Dispatch<React.SetStateAction<any>>
    setDrop:React.Dispatch<React.SetStateAction<any>>
}
const DropDownContent:React.FC<ContentProps>=({drop,address,setWorkerEmail,setDrop})=>{
    const {getProperty}=useMyPropertiesContext();
    const [property,setProperty]=useState<IProperty>();
    useEffect(() => {

        if(address){
            setProperty(getProperty(address));
        }
    }, [address]);
    const chooseWorker=(email:string)=>{
        setWorkerEmail(email);
        setDrop(false);
    }
    return(<div className={drop?styles.wrap:styles.unWrap}>
        {property&&property.emailList!=null&&property.emailList.length!=0?
            property.emailList.map((email)=>
                    <p key={email} className={styles.hoveredCraftsman} onClick={()=>chooseWorker(email)}>{email}</p>
            ):
            <p>No craftsman added {property&&<a href={`/properties/${property.id}/addCraftsman`}>Add</a>}</p>
        }

    </div>)
}
export default DropDownContent