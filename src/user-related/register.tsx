import React, {useState, MouseEvent, SyntheticEvent} from 'react';
import './register.css';
import * as events from "events";


function App() {

    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        setEmail(e.target.value);
        console.log(e);
        console.log(e.target.name);
    }
    const handlePas=(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        setPassword(e.target.value);
        console.log(e);
        console.log(e.target.name);
    }
    const register = async (e: SyntheticEvent) => {
        console.log(email, password);
        console.log(e);
        let obj = {email:email,password:password};
        const data = await fetch("http://localhost:9898/registerEmployee", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json; charset=utf-8",
            },
            method: "POST",
            body:JSON.stringify(obj)
        });
        const jsonData = await data.json();

        console.log(jsonData)
    }



    return (
        <div className={"wrap"}>
            <div className={"h1-holder"}>
                <h1 className={"sign-h1"}>Sign up</h1>
            </div>
            <div className={"input-wrap"}>
                <div className={"h2-holder"}>
                    <h2>Welcome!</h2>
                    <p>To access to the service, sign up!</p>
                </div>
                <div className={"input-holder"}>
                    <label>Email</label>
                    <input type={"email"} name={"email"} onChange={(e)=>handleChange(e)} placeholder={"email@sophämt.se"}/>
                </div>
                <div className={"input-holder"}>
                    <label>Password</label>
                    <input type={"password"} name={"password"} onChange={(e)=>handlePas(e)} placeholder={"**********"}/>
                </div>
                <div className={"input-holder sign-in"}>
                    <label>Already got an account? <a href={"/login"}>Sign in here!</a></label>
                </div>
                <div className={"input-holder"}>
                    <button onClick={(e)=>register(e)}>Sign up</button>
                </div>
            </div>
        </div>
    );
}

export default App;