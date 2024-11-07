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

const PropertyPage=()=> {
    const navigate = useNavigate();
    const {properties, getProperties} = useMyPropertiesContext();
    const {alert} = useMyAlertContext();
    const {token} = useMyContext();
    useEffect(() => {
        if (token) {
            getProperties(token);
            console.log(token)
        }
    }, []);
    const renderAdd=()=>{
        if(token&&token.role==="customer"){
            const addButton: React.ReactElement =
                <div>
                    <button className={propPage.buttonAdd} onClick={() => navigate("/addProperty")}>Add property</button>
                </div>
            return addButton
        }
        else return null
    }


    return (
        <div>
            <H1Banner header={"Properties"}></H1Banner>
            {renderAdd()}

            {properties && properties.length > 0 ? (properties.map((object: IProperty, key) => {
                return <Property key={key} property={object}></Property>
            })) : (<div>loading</div>)}
            {alert && <Alert error={false} alertMsg={"Successful"}></Alert>}
        </div>
    );
}

export default PropertyPage;


