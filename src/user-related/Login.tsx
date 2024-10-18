import React, {useState, MouseEvent, SyntheticEvent} from 'react';
import './register.css';
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
                setInputError("input-error");
                console.log("Fuking not" + resData.token);
            } else {
                addToken(resData);
                navigate("/Properties")
            }

        }
        catch(error){
            console.log("FRAP" + error);
        }
    }

    return (
        <div>
            <div className={"wrap"}>
                <div className={"h1-holder"}>
                    <h1 className={"sign-h1"}>Sign in</h1>
                </div>
                <div className={"input-wrap"}>
                    <div className={"h2-holder"}>
                        <h2>Welcome!</h2>
                        <p>To access to the service, sign in!</p>
                    </div>
                    <div className={"input-holder"}>
                        <label>Email</label>
                        <input type={"email"} name={"email"} onChange={(e) => handleChange(e)}
                               placeholder={"email@sophämt.se"} className={`input ${inputError}`}/>
                    </div>
                    <div className={"input-holder"}>
                        <label>Password</label>
                        <input type={"password"} onChange={(e) => handleChange(e)} placeholder={"**********"}
                               className={`input ${inputError}`}/>
                    </div>
                    <div className={"input-holder sign-in"}>
                        <label>First time here? <a href={"/registerCustomer"} className={"redirect"}>Sign up here!</a></label>
                    </div>
                    <div className={"input-holder"}>
                        <button onClick={postLogin} className={"button"}>Sign in</button>
                    </div>
                </div>
            </div>
            {alert&& <ErrorAlert errorMsg={"Wrong email or password"}></ErrorAlert>}

        </div>

    );
}

export default App;