import { IUserProperties } from "../../../../interfaces"
import EmailProp from "./EmailComp."
import styles from "../../../../css-modules/UserProperties.module.css"
import UserProps from "./UserProps"
import { useEffect, useState } from "react"

interface PropProps{
    userProp:IUserProperties
}
const EProperty:React.FC<PropProps>=({userProp})=>{
    const [render,setRender]=useState<boolean>(false)
    useEffect(() => {
        setRender(true)
        console.log("hehe?")
    }, [userProp.propertyList]);
    return(<div className={styles.empPWrap}>
        {render &&
            <div>
                <EmailProp email={userProp.userEmail}/>
                <UserProps email={userProp.userEmail} properties={userProp.propertyList}/>
            </div>
        }


    </div>)
}
export default EProperty