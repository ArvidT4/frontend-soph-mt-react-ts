import { useState } from "react";
import { useMyPropertiesContext } from "../../../../Contexts/PropertyContext";
import EProperty from "./EProperty";
import {IProperty} from "../../../../interfaces";
import styles from "../../../../css-modules/UserProperties.module.css"
import { useMyUPContext } from "../../../../Contexts/UserPropertiesContext";

const EmployeeProps=()=>{
    const [selected,setSelected]=useState<IProperty>();
    const {userPropertiesList}=useMyUPContext();
    return(<div>
        {userPropertiesList&&(userPropertiesList.map((uP,key)=>(
            <EProperty userProp={uP} key={key}/>
        )))}
    </div>)
}
export default EmployeeProps;