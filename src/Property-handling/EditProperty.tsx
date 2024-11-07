import {useNavigate, useParams } from "react-router-dom";
import H1Banner from "../Components/H1Banner"
import { IProperty } from "../interfaces"
import { useMyPropertiesContext } from "../Contexts/PropertyContext";
import {ChangeEvent, useEffect, useState } from "react";
import EditForm from "../Components/Property-related/PropertyForm";

const EditProperty=()=>{
    const {propAddress}=useParams();
    const navigate = useNavigate()
    const {properties,getProperty,editProperty}=useMyPropertiesContext();

    const [property,setProperty]=useState<IProperty>()
    useEffect(() => {
        if(properties&&properties.length>0&&propAddress){

            const prop:IProperty|undefined=getProperty(propAddress)

            if(prop){
                console.log(prop)
                setProperty(prop)
            }

        }

    }, [properties,propAddress,getProperty]);
   

    return(
        <div>
            <H1Banner header={`Edit ${propAddress}`}></H1Banner>
            <div>
                {property?<EditForm prop={property} propFunc={editProperty}></EditForm>:<div>LOADING</div>}
            </div>
        </div>
    )
}
export default EditProperty


