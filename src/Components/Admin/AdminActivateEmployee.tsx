import styles from "../../css-modules/AdminActivate.module.css"
import {useMyContext} from "../../Contexts/TokenContext";
import {useMyHandleChangeContext} from "../../Contexts/HandleChangeContext";
import {useReducer, useState} from "react";
import Alert from "../../Alerts/Alert";
import {alertReducer, ERROR, INITIAL_STATE, INPUT_ERROR, SUCCESS} from "../../reducer/alertReducer";
import {useMyAlertContext} from "../../Contexts/AlertContext";
const AdminActivateEmployee=()=>{
    const {RegisterEmployeeFromAdmin}=useMyContext();
    const {handleChange}=useMyHandleChangeContext();
    const {alert,updateAlert}=useMyAlertContext();
    const [email,setEmail]=useState<string>("");
    const [state,dispatch]=useReducer(alertReducer,INITIAL_STATE)
    const registerEmployee=()=>{
        if (email.length>5){
            RegisterEmployeeFromAdmin(email).then(response => {
                if(response) {
                    dispatch({type:SUCCESS})
                }
                else dispatch({type:ERROR})
                updateAlert(true);
            });
        }
        else{
            dispatch({type:INPUT_ERROR})
            updateAlert(true);
        }
    }
    return(
        <div>
            <div className={styles.wrap}>
                <h2 className={styles.title}>Activate employee</h2>
                <input onChange={(e)=>handleChange(e,setEmail)} value={email} className={styles.emailInput}/>
                <button onClick={registerEmployee} className={styles.button}>Activate employee</button>
            </div>
            {alert&&<Alert error={state.error} alertMsg={state.alertMsg}/>}
        </div>
    )
}
export default AdminActivateEmployee