import React, {useState, MouseEvent, SyntheticEvent} from 'react';
import './register.css';
import * as events from "events";

interface User{
    email?: string;
    password?:string;
}
function App() {

    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        setEmail(e.target.value);
        console.log(e);
    }
    const handleChangePass=(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        setPassword(e.target.value);
        console.log(e);
    }
    const login = async (e: SyntheticEvent) => {
        console.log(email, password);
        console.log(e);
        let obj = {email:email,password:password};
        const data = await fetch("http://localhost:9898/loginUser", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json; charset=utf-8",
            },
            method: "POST",
            body:JSON.stringify(obj)
        });
        const jsonData = await data.json();
        console.log(jsonData);
    }



    return (
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
                    <input type={"email"} name={"email"} onChange={(e)=>handleChange(e)} placeholder={"email@sophämt.se"}/>
                </div>
                <div className={"input-holder"}>
                    <label>Password</label>
                    <input type={"password"} onChange={(e)=>handleChangePass(e)} placeholder={"**********"}/>
                </div>
                <div className={"input-holder sign-in"}>
                    <label>First time here? <a href={"/register"}>Sign up here!</a></label>
                </div>
                <div className={"input-holder"}>
                    <button onClick={(e)=>login(e)}>Sign in</button>
                </div>
            </div>
        </div>
    );
}

export default App;