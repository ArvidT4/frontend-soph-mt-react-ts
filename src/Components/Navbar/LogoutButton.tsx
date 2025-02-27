import {useMyContext} from "../../Contexts/TokenContext";
import {useNavigate} from "react-router-dom";
import styles from "../../css-modules/Navbar.module.css";

const LogoutButton=()=>{
    const navigate=useNavigate();
    const {logout} = useMyContext();
    const removeToken=()=>{
        logout()
        navigate("/login");
    }
    return(
        <div className={styles.aHolder}>
            <p onClick={removeToken}>Log out</p>
        </div>
    )
}
export default LogoutButton