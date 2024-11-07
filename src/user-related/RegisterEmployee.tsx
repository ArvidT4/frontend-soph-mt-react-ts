import {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMyAlertContext } from "../Contexts/AlertContext";
import { IUser } from "../interfaces";
import styles from '../css-modules/UserLoginRegister.module.css'
import axios, { AxiosResponse } from "axios";
import {useMyContext} from "../Contexts/TokenContext"
import EmployeeEmail from "../user-related/user-comps/EmployeeEmail.";
import ActivateEmployee from "../user-related/user-comps/ActivateEmployee";

const RegisterEmployee=()=>{
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [rePassword,setRepassword] = useState<string>("");
    const [passMatch,setPassMatch]=useState<boolean>(false);
    const [inputError, setInputError] = useState<string>("");
    const [alertMsg, setAlertMsg] = useState<string>("");
    const [emailFound,setEmailFound]=useState<boolean>(false);
    const {checkForEmail}=useMyContext()

    const {alert,updateAlert} = useMyAlertContext();
    const navigate = useNavigate();


    useEffect(() => {
        if(password===rePassword)setPassMatch(true)
        else setPassMatch(false)
    }, [password,rePassword]);

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>, set:React.Dispatch<React.SetStateAction<any>>)=>{
        e.preventDefault();
        set(e.target.value.trim())
    }
    const checkEmail=async ()=>{
        console.log(email)
        if(await checkForEmail(email)){
            setEmailFound(true);

            console.log("yippi");
        }
    }
    const register = async():Promise<void>=>{
        try{
            if(passMatch){
                const user:IUser={email:email,password:password};
                const response: AxiosResponse = await axios.put("http://localhost:9898/activateEmployee", {
                    email:user.email,
                    password:user.password
                })

                const resData= response.data;
                console.log(resData)
                if(!resData){
                    setInputError(styles.inputError)
                    updateAlert(true)

                    setAlertMsg("Email already exists.")
                }
                else navigate("/login")
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
                        <h2>Welcome Employee!</h2>
                        <p>To access to the service, sign up!</p>
                    </div>
                    {emailFound?
                        <ActivateEmployee setPassword={setPassword} password={password} rePassword={rePassword} setRePassword={setRepassword} activateEmployee={register} handleChange={handleChange} inputError={inputError}></ActivateEmployee>
                        :
                        <EmployeeEmail setEmail={setEmail} email={email} register={checkEmail} inputError={inputError} handleChange={handleChange}></EmployeeEmail>
                    }

                </div>
            </div>
        </div>

    );
}
export default RegisterEmployee