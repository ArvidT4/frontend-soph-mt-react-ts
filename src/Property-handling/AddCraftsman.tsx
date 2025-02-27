import { useEffect, useState } from "react";
import H1Banner from "../Components/H1Banner";
import styles from "../css-modules/AddCraftsman.module.css"
import ErrorText from "../Components/ErrorText";
import PerformOrCancelButtons from "../Components/PerformOrCancelButtons";
import { useMyPropertiesContext } from "../Contexts/PropertyContext";
import { useMyContext } from "../Contexts/TokenContext";
import {useNavigate, useParams } from "react-router-dom";
import { IResponse } from "../interfaces";
import { useMyHandleChangeContext } from "../Contexts/HandleChangeContext";

const AddCraftsman=()=>{
    const {propId}=useParams();
    const [response,setResponse]=useState<string>("")
    const [email,setEmail]=useState<string>("");
    const [errorMsg,setErrorMsg]=useState<string>("");
    const [emailError,setEmailError]=useState<boolean>(false);
    const {addWorkerToProperty}=useMyPropertiesContext();
    const {token}=useMyContext();
    const navigate = useNavigate();
    const {handleChange}=useMyHandleChangeContext();
    const defaultHandleChange = () => {};
    const changeHandler = handleChange || defaultHandleChange;
    useEffect(() => {
        if(response!="success") {
            setErrorMsg(response);
            setEmailError(true);
        }
        else{
            navigate("/properties")
        }
    }, [response]);
    const add =async()=>{
        try{
            if(email.length>0&&propId&&token){
                const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
                const isValidEmail = emailRegex.test(email);
                if(isValidEmail){
                    const res=await addWorkerToProperty(token.token,email,propId) as IResponse;
                    setResponse(res.res);
                }
            }
        }catch(err){
            console.log(err)
        }

    }
    return(
        <div>
            <H1Banner header={"Add craftsman"}></H1Banner>
            <div className={styles.wrap}>
                <span className={styles.inputTitle}>Enter Craftsman's email</span>
                <input type={"email"} name={"post3"} value={email}
                       className={emailError ? styles.error : styles.customInput}
                       placeholder={"email@craftsman.com"}
                       onChange={(e) => changeHandler(e,setEmail)}/>
                <ErrorText show={emailError} msg={errorMsg}/>
            </div>
            <PerformOrCancelButtons propFunc={add}></PerformOrCancelButtons>
        </div>
    )
}
export default AddCraftsman;