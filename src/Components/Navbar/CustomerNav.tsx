import { useMyNavbarContext } from "../../Contexts/NavbarContext";
import styles from "../../css-modules/Navbar.module.css"
import LogoutButton from "./LogoutButton";

const NavbarContent:React.FC=()=>{
    const {clicked,setClicked}=useMyNavbarContext();


    return(
        <div  className={clicked?styles.contentWrap:styles.contentWrapHidden}>
            <div className={clicked?styles.content:styles.contentHidden}>
                <ul className={clicked?styles.ulList:styles.ulListHidden}>
                    <li className={styles.liItem}>
                        <div className={styles.aHolder}>
                            <a href={"/Properties"}>Properties</a>
                        </div>
                    </li>
                    <li className={styles.divider}></li>
                    <li className={styles.liItemRight}>
                        <div className={styles.aHolder}>
                            <LogoutButton/>
                        </div>
                    </li>
                </ul>
            </div>
            <div onClick={() => setClicked(!clicked)} className={clicked ? styles.blurSpace:styles.blurSpaceHidden}></div>
        </div>
    )
}
export default NavbarContent