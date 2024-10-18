import React, {useState, MouseEvent, SyntheticEvent} from 'react';
import './register.css';
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
                setInputError("input-error")
                updateAlert(true)
            }
            else{
                navigate("/login")
            }

        }
        catch(error){
            console.log(error);
        }

    }


    return (
        <div>
            <div className={"wrap"}>
                <div className={"h1-holder"}>
                    <h1 className={"sign-h1"}>Sign up</h1>
                </div>
                <div className={"input-wrap"}>
                    <div className={"h2-holder"}>
                        <h2>Welcome customer!</h2>
                        <p>To access to the service, sign up!</p>
                    </div>
                    <div className={"input-holder"}>
                        <label>Email</label>
                        <input className={`input ${inputError}`} type={"email"} name={"email"}
                               onChange={(e) => handleChange(e)} placeholder={"email@sophämt.se"}/>
                    </div>
                    <div className={"input-holder"}>
                        <label>Password</label>
                        <input className={`input ${inputError}`} type={"password"} name={"password"}
                               onChange={(e) => handleChange(e)} placeholder={"**********"}/>
                    </div>
                    <div className={"input-holder sign-in"}>
                        <label>Already got an account? <a className={"redirect"} href={"/login"}>Sign in
                            here!</a></label>
                    </div>
                    <div className={"input-holder"}>
                        <button onClick={register} className={"button"}>Sign up</button>
                    </div>
                </div>
            </div>
            {alert && <ErrorAlert errorMsg={"Email already used"}></ErrorAlert>}
        </div>

    );
}

export default App;