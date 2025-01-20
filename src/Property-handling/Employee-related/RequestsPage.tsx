import { useParams } from "react-router-dom";
import H1Banner from "../../Components/H1Banner"
import { useEffect, useState } from "react";
import { IProperty } from "../../interfaces";
import { useMyUPContext } from "../../Contexts/UserPropertiesContext";
import PropInfo from "../../Components/Property-related/PropertyLists/Employee/RequestPageComponents/PropInfo";
import Requests from "../../Components/Property-related/PropertyLists/Employee/RequestPageComponents/Requests";

const RequestsPage=()=>{
    const {propAddress,email}=useParams();
    const {getProperty,userPropertiesList}=useMyUPContext();
    const [property,setProperty]=useState<IProperty>();

    useEffect(() => {
        if(propAddress&&email&&userPropertiesList)setProperty(getProperty(propAddress,email))
    }, [propAddress,email,userPropertiesList]);
    return(
        <div>
            <H1Banner header={"Requests"}></H1Banner>
            {property && <div>
                <PropInfo property={property}></PropInfo>
                {propAddress&&email&&<Requests email={email} propAddress={propAddress} requests={property.workRequests}></Requests>}
            </div>}
        </div>
    )
}
export default RequestsPage