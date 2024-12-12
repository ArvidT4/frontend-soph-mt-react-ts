import { useEffect, useState } from "react";
import { IProperty } from "../../../../interfaces";
import UserProp from "./UserProp";
import styles from "../../../../css-modules/UserProperties.module.css"
interface UProps{
    properties:IProperty[]
    email:string
}
const UserProps:React.FC<UProps>=({properties,email})=>{
    const [render,setRender]=useState<boolean>(false);
    useEffect(() => {
       if(properties&&email) setRender(true)
    }, [properties,email]);
    return(<div className={styles.userPropsWrap}>
        <h3 className={styles.propsH3}>Properties:</h3>
        {render&&properties&&properties.map((prop,key)=>(
            <UserProp email={email} key={key} property={prop}/>
        ))}
    </div>)
}
export default UserProps