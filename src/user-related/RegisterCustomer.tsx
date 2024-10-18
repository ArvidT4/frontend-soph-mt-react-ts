import React, {useState, MouseEvent, SyntheticEvent} from 'react';
import styles from "../css-modules/UserLoginRegister.module.css"
import * as events from "events";
import {IToken, IUser } from '../interfaces';
import axios, { AxiosResponse } from 'axios';
import { useMyContext } from '../Contexts/TokenContext';
import { useMyAlertContext } from '../Contexts/AlertContext';
import ErrorAlert from '../Alerts/ErrorAlert';
import { useNavigate } from 'react-router-dom';


function App() {

    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const {addToken} = useMyContext();
    const [inputError, setInputError] = useState<string>("");

    const {alert, updateAlert} = useMyAlertContext();
    const navigate = useNavigate();
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        if(e.target.name === 'email'){
            setEmail(e.target.value);
        }
        else setPassword(e.target.value);
    }
    const register = async():Promise<void>=>{
        try{
            const user:IUser=({email: email, password: password})
            const response: AxiosResponse = await axios.post("http://localhost:9898/registerCustomer", user)

            const resData= response.data;
            if(!resData){
                setInputError(styles.inputError)
                updateAlert(true)
            }
            else{
                navigate("/login")
            }

        }
        catch(error){
            setInputError(styles.inputError)
            updateAlert(true)
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
                        <input className={styles.input + " " + inputError} type={"email"} name={"email"}
                               onChange={(e) => handleChange(e)} placeholder={"email@sophämt.se"}/>
                    </div>
                    <div className={styles.inputHolder}>
                        <label>Password</label>
                        <input className={styles.input + " " + inputError} type={"password"} name={"password"}
                               onChange={(e) => handleChange(e)} placeholder={"**********"}/>
                    </div>
                    <div className={styles.inputHolder + " " + styles.signIn}>
                        <label>Already got an account? <a className={styles.redirect} href={"/login"}>Sign in
                            here!</a></label>
                    </div>
                    <div className={styles.inputHolder}>
                        <button onClick={register} className={styles.button}>Sign up</button>
                    </div>
                </div>
            </div>
            {alert && <ErrorAlert errorMsg={"Email already used"}></ErrorAlert>}
        </div>

    );
}

export default App;