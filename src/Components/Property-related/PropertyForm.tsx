import {ChangeEvent, useEffect, useState } from "react";
import styles from "../../css-modules/FormCss.module.css"
import { IProperty } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../Contexts/TokenContext";
import {useMyInputValidationContext} from "../../Contexts/InputValidationContext"
import PerformOrCancelButtons from "../PerformOrCancelButtons";
import ErrorText from "../ErrorText";
import { useMyHandleChangeContext } from "../../Contexts/HandleChangeContext";
interface property{
    prop:IProperty
    propFunc:(prop:IProperty,token:string)=>Promise<boolean>
}

const PropertyForm:React.FC<property>=({prop,propFunc})=>{

    const fullPostal:string = prop.postCode.toString()

    const [address, setAddress] = useState<string>(prop.address);
    const [description, setDescription] = useState<string>(prop.description);
    const [city, setCity] = useState<string>(prop.city);
    const [post3, setPost3] = useState<number>(parseInt(fullPostal.slice(0,3)));
    const [post2, setPost2] = useState<number>(parseInt(fullPostal.slice(3,5)));
    const [state, setState] = useState<string>(prop.state);
    const navigate = useNavigate();
    const {token}=useMyContext();

    const {validator, post3Class, post2Class, descError, addressError, cityError, stateError}=useMyInputValidationContext();
    useEffect(() => {
        if(prop){
            const property:IProperty=assembleProp();
            validator(property,post3,post2);
        }
    },[address,description,city,post3,post2,state]);
    const {handleChange}=useMyHandleChangeContext();
    const defaultHandleChange = () => {};
    const changeHandler = handleChange || defaultHandleChange;

    const checkPost2=():string=>{
        if(post2<10){
            return `0${post2}`
        }
        else return post2.toString()
    }
    const assembleProp=():IProperty=>{

        const post2String:string=checkPost2();
        const postalCode:string=post3.toString()+""+post2String
        const property:IProperty= {
            address: address,
            description: description,
            city: city,
            postCode: postalCode,
            state: state,
            id: prop.id,
            emailList:[],
            workRequests:[],
        }
        return property
    }
    const fetchFunc=()=>{
        if(token&&!post3Class&&!post2Class&&!descError&&!addressError&&!cityError&&!stateError){
            const property:IProperty=assembleProp();
            propFunc(property,token.token).then(success=>{
                if(success)navigate("/Properties")
            })
        }
    }

    return (
        <div>
            <div className={styles.inputWrap}>
                <div className={styles.spanWrap}>
                    <span className={styles.inputTitle}>Address:</span>
                </div>
                <input type={"text"} name={"address"} value={address} onChange={(e) => changeHandler(e, setAddress)}
                       className={addressError ? styles.error : styles.customInput} placeholder={"...."}/>
                <ErrorText show={addressError} msg={"Must be longer than 5 shorter than 25"}/>
            </div>
            <div className={styles.inputWrap}>
                <span className={styles.inputTitle}>City:</span>
                <input type={"text"} name={"city"} value={city} onChange={(e) => changeHandler(e, setCity)}
                       className={cityError? styles.error:styles.customInput} placeholder={"...."}/>
                <ErrorText show={cityError} msg={"Must be or longer than 0 shorter than 25"}/>
            </div>
            <div className={styles.inputWrap}>
                <span className={styles.inputTitle}>Postal code:</span>
                <div className={styles.postalWrap}>
                    <div className={styles.postalInput3}>
                        <input type={"number"} name={"post3"} value={post3} className={post3Class?styles.error:styles.customInput}
                               placeholder={"102"}
                               pattern="\d{1,3}"
                               onChange={(e) => changeHandler(e, setPost3)}/>
                        <ErrorText show={post3Class} msg={"three digits"}/>
                    </div>
                    <div className={styles.postalInput2}>
                        <input type={"number"} name={"post2"} value={post2} className={post2Class?styles.error:styles.customInput}
                               placeholder={"10"}
                               max={99} min={1}
                               onChange={(e) => changeHandler(e, setPost2)}/>
                        <ErrorText show={post2Class} msg={"two digits"}/>
                    </div>

                </div>
            </div>
            <div className={styles.inputWrap}>
                <span className={styles.inputTitle}>State:</span>
                <input type={"text"} name={"state"} value={state} className={stateError?styles.error:styles.customInput} placeholder={"...."}
                       onChange={(e) => changeHandler(e, setState)}/>
                <ErrorText show={stateError} msg={"Must be longer than 5 shorter than 25."}/>
            </div>
            <div className={styles.inputWrap}>
                <div className={styles.spanWrap}>
                    <span className={styles.inputTitle}>Description:</span>
                    <span className={descError?styles.lengthErrorText:styles.length}>{description.length}/100</span>
                </div>

                <textarea name={"description"} value={description} className={descError ? styles.error : styles.customInput} placeholder={"...."}
                          onChange={(e) => changeHandler(e, setDescription)}/>
            </div>
            <PerformOrCancelButtons propFunc={fetchFunc}></PerformOrCancelButtons>
        </div>

    )
}
export default PropertyForm