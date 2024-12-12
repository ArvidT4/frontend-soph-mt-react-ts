import menuButton from "../../images/pngegg.png"
import css from "../../css-modules/Menu.module.css"
import { useState } from "react"

interface props{
    setShow:React.Dispatch<React.SetStateAction<any>>,
    show:boolean
}
const MenuButton:React.FC<props>=({setShow,show})=>{

    const pressed=()=>{
        setShow(!show)
    }
    return(
        <div className={css.menuButtonWrap} onClick={pressed}>
            <img className={css.menuButton} src={menuButton}/>
        </div>
    )
}
export default MenuButton;