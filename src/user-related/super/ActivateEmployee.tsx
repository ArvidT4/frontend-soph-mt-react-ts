import H1Banner from "../../Components/H1Banner";
import {useEffect, useState} from "react";
import {useMyContext} from "../../Contexts/TokenContext";
import {useNavigate} from "react-router-dom";
import AdminActivateEmployee from "../../Components/Admin/AdminActivateEmployee";

const ActivateEmployee=()=>{
    const {checkAdmin}=useMyContext()
    const navigate=useNavigate();
    const [render,setRender]=useState<boolean>(false);
    useEffect(() => {
        checkAdmin().then((success)=>{
            if(success)setRender(true);
            else navigate(-1);
        })
    }, [checkAdmin, navigate]);
    return(
        <div>
            <H1Banner header={"Admin table"}></H1Banner>
            {render&&<AdminActivateEmployee/>}
        </div>
    )
}
export default ActivateEmployee