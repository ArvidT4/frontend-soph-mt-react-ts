import react from "react";
import "./Container.css"
import { useMyAlertContext } from "../Contexts/AlertContext";

interface IAlerts {
    errorMsg: string;
}


const ErrorAlert = (Alerts: IAlerts) => {
    const {updateAlert} = useMyAlertContext();
    const exitButton =():void=>{

        updateAlert(false);
    }
    const errorMsg:react.ReactElement = <div className={"error-msg"}><span className={"msg"}>{Alerts.errorMsg}</span></div>
    const exit: react.ReactElement = <div className={"exit"} onClick={exitButton}><span className={"exit-button"}>X</span></div>
    const container: react.ReactElement =
        <div className={"container-wrap"}>
            <div className={"container"}>
                <div className={"msg-container"}>{errorMsg}{exit}</div>
            </div>
        </div>
    const wrap:react.ReactElement = <div className={"wrap-div"}>{container}</div>


    return wrap
}
export default ErrorAlert;