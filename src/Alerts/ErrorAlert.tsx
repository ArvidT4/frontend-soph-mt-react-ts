import react from "react";
import styles from "../css-modules/Container.module.css"
import { useMyAlertContext } from "../Contexts/AlertContext";

interface IAlerts {
    errorMsg: string;
}


const ErrorAlert = (Alerts: IAlerts) => {
    const {updateAlert} = useMyAlertContext();
    const exitButton =():void=>{

        updateAlert(false);
    }
    const errorMsg:react.ReactElement = <div className={styles.errorMsg}><span className={styles.msg}>{Alerts.errorMsg}</span></div>
    const exit: react.ReactElement = <div className={styles.exit} onClick={exitButton}><span className={styles.exitButton}>X</span></div>
    const container: react.ReactElement =
        <div>
            <div className={styles.container}>
                <div className={styles.msgContainer}>{errorMsg}{exit}</div>
            </div>
        </div>
    const wrap:react.ReactElement = <div className={styles.wrapDiv}>{container}</div>


    return wrap
}
export default ErrorAlert;