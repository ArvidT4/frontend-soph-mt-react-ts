import React, {useState, MouseEvent, SyntheticEvent, useEffect} from 'react';
import styles from "../css-modules/UserLoginRegister.module.css"
import axios, { AxiosResponse } from 'axios';
import * as events from "events";
import {IToken, IUser } from '../interfaces';
import { useMyContext } from '../Contexts/TokenContext';
import { useMyAlertContext } from '../Contexts/AlertContext';
import Alert from '../Alerts/Alert';
import { useNavigate } from 'react-router-dom';
function App() {
    
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const {addToken} = useMyContext();
    const [inputError, setInputError] = useState<string>("");
    const [alertText,setAlertText] = useState<string>("");
    const {alert, updateAlert} = useMyAlertContext();
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
    useEffect(() => {
        console.log(email + " " + password)
    }, [email,password]);

    const postLogin = async():Promise<void>=>{
        try{
            const user:IUser=({email: email, password: password})
            const response: AxiosResponse = await axios.post("http://localhost:9898/loginUser", user)

            const resData: IToken = response.data;
            if(resData.token=="no token"){
                updateAlert(true);
                setInputError(styles.inputError);
                console.log("Fuking not" + resData.token);
                setAlertText("Your password or email is incorrect")
            } else {
                addToken(resData);
                navigate("/Properties")
            }

        }
        catch(error){
            updateAlert(true);
            setAlertText("Server error")
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
                        <label>First time here? <a href={"/registerCustomer"} className={styles.redirect}>Sign up
                            here!</a></label>
                    </div>
                    <div className={styles.inputHolder}>
                        <button onClick={postLogin} className={styles.button}>Sign in</button>
                    </div>
                </div>
            </div>
            {alert && <Alert error={true} alertMsg={alertText}></Alert>}

        </div>

    );
}

export default App;