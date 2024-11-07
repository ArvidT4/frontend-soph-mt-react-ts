import { ChangeEvent, Dispatch, SetStateAction } from "react"
import styles from "../../css-modules/UserLoginRegister.module.css"
interface EmailProps{
    handleChange:(
        e:ChangeEvent<HTMLInputElement>,
        set:React.Dispatch<React.SetStateAction<any>>)=>void,
    inputError:string,
    register:()=>void,
    setEmail:Dispatch<SetStateAction<string>>,
    email:string
}

const EmployeeEmail:React.FC<EmailProps>=({handleChange,inputError,register,setEmail,email})=>{
    return(
        <div>
            <div className={styles.inputHolder}>
                <label>Email</label>
                <input className={styles.input + " " + inputError} value={email} type={"email"} name={"email"}
                       onChange={(e:ChangeEvent<HTMLInputElement>) => handleChange(e,setEmail)} placeholder={"email@sophämt.se"}/>
            </div>
            <div className={styles.inputHolder + " " + styles.signIn}>
                <label>Already got an account? <a className={styles.redirect} href={"/login"}>Sign in
                    here!</a></label>
            </div>
            <div className={styles.inputHolder}>
                <button onClick={register} className={styles.button}>Sign up</button>
            </div>
        </div>
    )
}
export default EmployeeEmail