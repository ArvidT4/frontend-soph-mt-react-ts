import { ChangeEvent } from "react";
import styles from "../../css-modules/UserLoginRegister.module.css"

interface EmailProps{
    inputError:string,
    activateEmployee:()=>void,
    handleChange:(
        e:ChangeEvent<HTMLInputElement>,
        set:React.Dispatch<React.SetStateAction<any>>)=>void,
    setPassword:React.Dispatch<React.SetStateAction<any>>,
    setRePassword:React.Dispatch<React.SetStateAction<any>>,
    password:string,
    rePassword:string
}
const ActivateEmployee:React.FC<EmailProps>=({handleChange,inputError, activateEmployee,setPassword,setRePassword,password,rePassword})=>{
    return(
        <div>
            <div className={styles.inputHolder}>
                <label>Password</label>
                <input className={styles.input + " " + inputError} value={password} type={"password"} name={"password"}
                       onChange={(e) => handleChange(e,setPassword)} placeholder={"*****"}/>
            </div>
            <div className={styles.inputHolder}>
                <label>Re-Password</label>
                <input className={styles.input + " " + inputError} value={rePassword} type={"password"} name={"re-password"}
                       onChange={(e) => handleChange(e,setRePassword)} placeholder={"*****"}/>
            </div>
            <div className={styles.inputHolder + " " + styles.signIn}>
                <label>Already got an account? <a className={styles.redirect} href={"/login"}>Sign in
                    here!</a></label>
            </div>
            <div className={styles.inputHolder}>
                <button onClick={activateEmployee} className={styles.button}>Sign up</button>
            </div>
        </div>
    )
}

export default ActivateEmployee;