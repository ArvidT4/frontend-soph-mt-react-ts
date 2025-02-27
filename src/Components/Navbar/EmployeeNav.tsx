import { useMyNavbarContext } from "../../Contexts/NavbarContext";
import styles from "../../css-modules/Navbar.module.css"
import LogoutButton from "./LogoutButton";

const NavbarContent:React.FC=()=>{
    const {clicked,setClicked}=useMyNavbarContext();

    return(

        <div  className={clicked?styles.contentWrap:styles.contentWrapHidden}>
            <div className={clicked?styles.content:styles.contentHidden}>
                <ul className={clicked?styles.ulListEmp:styles.ulListHiddenEmp}>
                    <li className={styles.liItemEmp}>
                        <div className={styles.aHolder}>
                            <a href={"/Properties"}>test</a>
                        </div>
                    </li>
                    <li className={styles.divider}></li>
                    <li className={styles.liItemEmp}>
                        <div className={styles.aHolder}>
                            <a href={"/AcceptedRequests"}>Accepted Requests</a>
                        </div>
                    </li>
                    <li className={styles.divider}></li>
                    <li className={styles.liItemEmp}>
                        <LogoutButton/>
                    </li>
                </ul>
            </div>
            <div onClick={() => setClicked(!clicked)} className={clicked ? styles.blurSpace:styles.blurSpaceHidden}></div>
        </div>
    )
}
export default NavbarContent