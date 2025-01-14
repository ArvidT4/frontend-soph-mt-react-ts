import {useEffect, useState } from "react";
import { useMyNavbarContext } from "../../Contexts/NavbarContext";
import styles from "../../css-modules/Navbar.module.css"
import { useMyContext } from "../../Contexts/TokenContext";

const NavbarContent:React.FC=()=>{
    const {clicked,setClicked}=useMyNavbarContext();
    const {token} = useMyContext();
    const [title,setTitle]=useState<string>();
    const ROLES:string[]=["customer","employee"];

    useEffect(() => {
        if(token&&token.role==ROLES[1])setTitle("Customers")
        else setTitle("Properties")
    }, [token]);
    return(
        <div  className={clicked?styles.contentWrap:styles.contentWrapHidden}>
            <div className={clicked?styles.content:styles.contentHidden}>
                <ul className={clicked?styles.ulList:styles.ulListHidden}>
                    <li className={styles.liItem}>
                        <div className={styles.aHolder}>
                            <a href={"/Properties"}>{title}</a>
                        </div>
                    </li>
                    <li className={styles.divider}></li>
                    <li className={styles.liItemRight}>
                        <div className={styles.aHolder}>
                            <a href={"/login"}>Log out</a>
                        </div>
                    </li>
                </ul>
            </div>
            <div onClick={() => setClicked(!clicked)} className={clicked ? styles.blurSpace:styles.blurSpaceHidden}></div>
        </div>
    )
}
export default NavbarContent