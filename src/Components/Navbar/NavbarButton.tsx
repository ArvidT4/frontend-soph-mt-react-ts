import burger from "../../images/burgerMenu.png"
import styles from "../../css-modules/Navbar.module.css"
import {useEffect, useState } from "react"
import { useMyNavbarContext } from "../../Contexts/NavbarContext"

const NavbarButton=()=>{
    const [wrapClass,setWrapClass] = useState<string>(styles.imgWrap)
    const [burgerTop,setburgerTop] = useState(styles.burgerLine)
    const [burgerCenter,setBurgerCenter] = useState(styles.burgerLine)
    const [burgerBot,setBurgerBot] = useState(styles.burgerLine)
    
    const {clicked,setClicked}=useMyNavbarContext();
    const buttonClicked=()=>{

        setClicked(!clicked)

    }
    useEffect(() => {
        if(clicked){
            setWrapClass(styles.imgWrapClicked)
            setburgerTop(styles.burgerLineClickedTop)
            setBurgerCenter(styles.burgerLineClickedCenter)
            setBurgerBot(styles.burgerLineClickedBot)
        }else{
            setWrapClass(styles.imgWrap)
            setburgerTop(styles.burgerLine)
            setBurgerCenter(styles.burgerLine)
            setBurgerBot(styles.burgerLine)
        }
    }, [clicked]);
    return(
        <div onClick={buttonClicked} className={wrapClass}>
            <div className={burgerTop}></div>
            <div className={burgerCenter}></div>
            <div className={burgerBot}></div>
        </div>
    )
}
export default NavbarButton