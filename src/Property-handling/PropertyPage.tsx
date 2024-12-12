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
import CustomerProps from '../Components/Property-related/PropertyLists/CustomerProps';
import EmployeeProps from '../Components/Property-related/PropertyLists/Employee/EmployeeProps';

const PropertyPage=()=> {
    const [render,setRender]=useState<boolean>(false)
    const [role,setRole]=useState<string>("");
    const [h1Text,setH1Text]=useState<string>("Properties");
    const navigate = useNavigate();
    const {getProperties} = useMyPropertiesContext();
    const {alert} = useMyAlertContext();
    const {token,checkToken} = useMyContext();
    useEffect(() => {
        if (token) {
            if(token.role==="employee") setH1Text("Customers")
            console.log("test")
            setRole(token.role);
            checkToken().then(success=>{
                if(success)navigate("/login")
            })
            getProperties(token);
            setRender(true);
        }
    }, [token]);


    return (
        <div>
            <H1Banner header={h1Text}></H1Banner>
            {render&&role=="customer"&&<CustomerProps></CustomerProps>}
            {render&&role=="employee"&&<EmployeeProps></EmployeeProps>}
            {alert && <Alert error={false} alertMsg={"Successful"}></Alert>}
        </div>
    );
}

export default PropertyPage;


