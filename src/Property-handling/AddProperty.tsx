import { ChangeEvent, useState } from "react";
import H1Banner from "../Components/H1Banner";
import { IProperty } from "../interfaces";
import { useMyPropertiesContext } from "../Contexts/PropertyContext";
import { useMyContext } from "../Contexts/TokenContext";
import {useMyAlertContext} from "../Contexts/AlertContext";
import PropertyForm from "../Components/Property-related/PropertyForm";

const AddProperty = () => {
    const {createProperty} = useMyPropertiesContext();

    const property:IProperty= {
        address: "",
        description: "",
        city: "",
        postCode: "00000",
        state: "",
        id: "",
        emailList:[],
        workRequests:[],
    }

    return (
        <div>
            <H1Banner header={"Add property"}></H1Banner>
            <PropertyForm prop={property} propFunc={createProperty}></PropertyForm>
        </div>
    );
};

export default AddProperty;
