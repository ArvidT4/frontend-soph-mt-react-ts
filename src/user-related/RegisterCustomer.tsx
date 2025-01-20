import React, {useState, MouseEvent, SyntheticEvent} from 'react';
import styles from "../css-modules/UserLoginRegister.module.css"
import * as events from "events";
import {IToken, IUser } from '../interfaces';
import axios, { AxiosResponse } from 'axios';
import { useMyContext } from '../Contexts/TokenContext';
import { useMyAlertContext } from '../Contexts/AlertContext';
import Alert from '../Alerts/Alert';
import { useNavigate } from 'react-router-dom';


function App() {

    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const {addToken} = useMyContext();
    const [inputError, setInputError] = useState<string>("");
    const [alertMsg, setAlertMsg] = useState<string>("");

    const { alert,updateAlert} = useMyAlertContext();
    const navigate = useNavigate();
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>,set:React.Dispatch<React.SetStateAction<any>>)=>{
        e.preventDefault();
        const sanitizedValue = e.target.value.replace(/\s/g, '');
        set(sanitizedValue);
        console.log(email + " " + password)
    }
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>, setValue: React.Dispatch<React.SetStateAction<string>>) => {
        setValue(e.target.value.trim()); // Ensures trimming on blur for any trailing/leading spaces
    };
    const register = async():Promise<void>=>{
        try{
            const user:IUser=({email: email, password: password})
            const response: AxiosResponse = await axios.post("http://localhost:9898/registerCustomer", user)

            const resData= response.data;
            if(!resData){
                setInputError(styles.inputError)
                updateAlert(true)
                setAlertMsg("Email already exists.")
            }
            else{
                navigate("/login")
            }

        }
        catch(error){
            setInputError(styles.inputError)
            updateAlert(true)
            setAlertMsg("Server error.")
            console.log(error);
        }

    }


    return (
        <div>
            <div className={styles.wrap}>
                <div className={styles.h1Holder}>
                    <h1 className={styles.signH1}>Sign up</h1>
                </div>
                <div className={styles.inputWrap}>
                    <div className={styles.h2Holder}>
                        <h2>Welcome customer!</h2>
                        <p>To access to the service, sign up!</p>
                    </div>
                    <div className={styles.inputHolder}>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => handleChange(e, setEmail)}
                            onBlur={(e) => handleBlur(e, setEmail)}
                            placeholder="email@sophämt.se"
                            className={`${styles.input} ${inputError}`}
                        />
                    </div>

                    <div className={styles.inputHolder}>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => handleChange(e, setPassword)}
                            onBlur={(e) => handleBlur(e, setPassword)}
                            placeholder="**********"
                            className={`${styles.input} ${inputError}`}
                        />
                    </div>
                    <div className={styles.inputHolder + " " + styles.signIn}>
                        <label>Already got an account? <a className={styles.redirect} href={"/login"}>Sign in
                            here!</a></label>
                    </div>
                    <div className={styles.inputHolder + " " + styles.signIn}>
                        <label>Sign up with email for the first time as employee? <a className={styles.redirect} href={"/registerEmployee"}>Sign in
                            here!</a></label>
                    </div>
                    <div className={styles.inputHolder}>
                        <button onClick={register} className={styles.button}>Sign up</button>
                    </div>
                </div>
            </div>
            {alert && <Alert error={true} alertMsg={alertMsg}></Alert>}
        </div>

    );
}

export default App;