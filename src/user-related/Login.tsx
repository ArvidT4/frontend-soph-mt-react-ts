import React, {useState, MouseEvent, SyntheticEvent} from 'react';
import styles from "../css-modules/UserLoginRegister.module.css"
import axios, { AxiosResponse } from 'axios';
import * as events from "events";
import {IToken, IUser } from '../interfaces';
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

    const postLogin = async():Promise<void>=>{
        try{
            const user:IUser=({email: email, password: password})
            const response: AxiosResponse = await axios.post("http://localhost:9898/loginUser", user)

            const resData: IToken = response.data;
            if(resData.token=="no token"){
                updateAlert(true);
                setInputError(styles.inputError);
                console.log("Fuking not" + resData.token);
            } else {
                addToken(resData);
                navigate("/Properties")
            }

        }
        catch(error){
            updateAlert(true);
            setInputError(styles.inputError);
            console.log("FRAP" + error);
        }
    }

    return (
        <div>
            <div className={styles.wrap}>
                <div className={styles.h1Holder}>
                    <h1 className={styles.signH1}>Sign in</h1>
                </div>
                <div className={styles.inputWrap}>
                    <div className={styles.h2Holder}>
                        <h2>Welcome!</h2>
                        <p>To access to the service, sign in!</p>
                    </div>
                    <div className={styles.inputHolder}>
                        <label>Email</label>
                        <input type={"email"} name={"email"} onChange={(e) => handleChange(e)}
                               placeholder={"email@sophämt.se"} className={styles.input + " " + inputError}/>
                    </div>
                    <div className={styles.inputHolder}>
                        <label>Password</label>
                        <input type={"password"} onChange={(e) => handleChange(e)} placeholder={"**********"}
                               className={styles.input + " " + inputError}/>
                    </div>
                    <div className={styles.inputHolder + " " + styles.signIn}>
                        <label>First time here? <a href={"/registerCustomer"} className={styles.redirect}>Sign up here!</a></label>
                    </div>
                    <div className={styles.inputHolder}>
                        <button onClick={postLogin} className={styles.button}>Sign in</button>
                    </div>
                </div>
            </div>
            {alert&& <ErrorAlert errorMsg={"Wrong email or password"}></ErrorAlert>}

        </div>

    );
}

export default App;