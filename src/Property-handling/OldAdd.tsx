import { ChangeEvent, useState } from "react";
import H1Banner from "../Components/H1Banner";
import css from "../css-modules/AddProperty.module.css";
import { IProperty } from "../interfaces";
import { useMyPropertiesContext } from "../Contexts/PropertyContext";
import { useMyContext } from "../Contexts/TokenContext";
import { useNavigate } from "react-router-dom";
import {useMyAlertContext} from "../Contexts/AlertContext";
import PerformOrCancelButtons from "../Components/PerformOrCancelButtons";

const AddProperty = () => {
    const {createProperty} = useMyPropertiesContext();
    const {token} = useMyContext();
    const {alert,updateAlert} = useMyAlertContext();
    const navigate = useNavigate();
    const [address, setAddress] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [postCode, setPostCode] = useState<number>(0);
    const [state, setState] = useState<string>("");

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        setFunc: React.Dispatch<React.SetStateAction<any>>
    ) => {
        if (e.target.type === "number") {
            setFunc(parseInt(e.target.value));
        } else {
            setFunc(e.target.value);
        }
    };
    const addProperty=()=>{
        try{
            const property:IProperty= {
                address: address,
                description: description,
                city: city,
                postCode: postCode.toString(),
                state: state,
                id: "",
                collectingId: ""
            }
            if(token){
                createProperty(property,token.token);
                updateAlert(true)
                navigate("/properties")
            }
            console.log(property,token)
        }
        catch(error){
            console.log(error)
        }

    }

    return (
        <div className={css.wrap}>
            <H1Banner header={"Add property"}></H1Banner>
            <div className={css.inputDiv}>
                <span className={css.inputTitle}>Address:</span>
                <input
                    type={"text"}
                    name={"address"}
                    className={css.customInput}
                    placeholder={"Mystreet 20A"}
                    value={address}
                    onChange={(e) => handleChange(e, setAddress)}
                />
            </div>
            <div className={css.inputDiv}>
                <span className={css.inputTitle}>City:</span>
                <input
                    type={"text"}
                    name={"city"}
                    className={css.customInput}
                    placeholder={"Stockholm"}
                    value={city}
                    onChange={(e) => handleChange(e, setCity)}
                />
            </div>
            <div className={css.inputDiv}>
                <span className={css.inputTitle}>Postal code:</span>
                <input
                    type={"number"}
                    name={"postCode"}
                    className={css.customInput}
                    placeholder={"20 432"}
                    value={postCode}
                    onChange={(e) => handleChange(e, setPostCode)}
                />
            </div>
            <div className={css.inputDiv}>
                <span className={css.inputTitle}>State:</span>
                <input
                    type={"text"}
                    name={"state"}
                    className={css.customInput}
                    placeholder={"Västerbotten"}
                    value={state}
                    onChange={(e) => handleChange(e, setState)}
                />
            </div>
            <div className={css.inputDiv}>
                <span className={css.inputTitle}>Description:</span>
                <textarea
                    name={"description"}
                    className={css.customInput}
                    placeholder={"The property is in the city it has..."}
                    value={description}
                    onChange={(e) => handleChange(e, setDescription)}
                />
            </div>
            <PerformOrCancelButtons propFunc={addProperty}></PerformOrCancelButtons>
        </div>
    );
};

export default AddProperty;
