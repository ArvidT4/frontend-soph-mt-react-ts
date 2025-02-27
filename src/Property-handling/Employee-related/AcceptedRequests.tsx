import {useMyContext} from "../../Contexts/TokenContext";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import H1Banner from "../../Components/H1Banner";
import AcceptedReqs from "../../Components/Property-related/PropertyLists/Employee/AcceptedRequests/AcceptedReqs";

const AcceptedRequests=()=>{
    const {token,checkToken}=useMyContext();
    const navigate=useNavigate();
    const [render,setRender]=useState<boolean>(false)
    useEffect(() => {
        if(token){
            checkToken().then(success=>{
                if(success||token?.role!="employee")(navigate("/login"))
                else setRender(true);
            })
        }

    }, [token]);
    return(<div>
        <H1Banner header={"Accepted Requests"}></H1Banner>
        {render&&<AcceptedReqs/>}
    </div>)
}
export default AcceptedRequests