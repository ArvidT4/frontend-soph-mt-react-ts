import React, {useEffect, useState} from 'react';
import { useMyPropertiesContext } from '../../../Contexts/PropertyContext';
import propPage from "../../../css-modules/PropertyPage.module.css"
import {IProperty} from "../../../interfaces"
import Property from "../../../Property-handling/Property"
import { useNavigate } from 'react-router-dom';


const CustomerProps=()=>{

    const navigate = useNavigate();
    const {properties, getProperties} = useMyPropertiesContext();


    return (
        <div>
            <div>
                <button className={propPage.buttonAdd} onClick={() => navigate("/addProperty")}>Add property</button>
            </div>

            {properties && properties.length > 0 ? (properties.map((object: IProperty, key) => {
                return <Property key={key} property={object}></Property>
            })) : (<div>loading</div>)}
        </div>
    );
}
export default CustomerProps