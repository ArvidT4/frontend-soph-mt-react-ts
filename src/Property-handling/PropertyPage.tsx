import React, {useEffect, useState} from 'react';
import { useMyPropertiesContext } from '../Contexts/PropertyContext';
import propPage from "../css-modules/PropertyPage.module.css"
import {IProperty, IToken} from "../interfaces"
import Property from "./Property"
import H1Banner from '../Components/H1Banner';
import { useMyContext } from '../Contexts/TokenContext';
import { useNavigate } from 'react-router-dom';
import {useMyAlertContext} from "../Contexts/AlertContext";
import Alert from "../Alerts/Alert";

const PropertyPage=()=>{
    const navigate = useNavigate();
    const {properties,getProperties}=useMyPropertiesContext();
    const {alert} = useMyAlertContext();
    const {token}=useMyContext();
    useEffect(() => {
        //const token:IToken=getToken();
        
        if(token){
            getProperties(token.token);
            console.log(token)

        }
    }, []);

    return (
        <div>
            <H1Banner header={"Properties"}></H1Banner>
            <div>
                <button className={propPage.buttonAdd} onClick={()=>navigate("/addProperty")}>Add property</button>
            </div>
            {properties && properties.length>0 ? (properties.map((object:IProperty,key)=>{
                return <Property key={key} property={object}></Property>
            })) : (<div>loading</div>)}
            {alert&&<Alert error={false} alertMsg={"Successful"}></Alert>}
        </div>
    );
}

export default PropertyPage;


