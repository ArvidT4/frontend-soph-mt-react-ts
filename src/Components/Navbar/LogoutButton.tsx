import {useMyContext} from "../../Contexts/TokenContext";
import {useNavigate} from "react-router-dom";

const LogoutButton=()=>{
    const navigate=useNavigate();
    const {logout} = useMyContext();
    const removeToken=()=>{
        logout()
        navigate("/login");
    }
    return(
        <div>
            <p onClick={removeToken}>Log out</p>
        </div>
    )
}
export default LogoutButton