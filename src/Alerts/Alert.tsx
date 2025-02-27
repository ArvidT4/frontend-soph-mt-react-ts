import react from "react";
import styles from "../css-modules/Container.module.css"
import { useMyAlertContext } from "../Contexts/AlertContext";

interface IAlerts {
    alertMsg: string;
    error:boolean
}


const Alert = ({alertMsg,error}: IAlerts) => {
    const { updateAlert} = useMyAlertContext();
    const exitButton =():void=>{

        updateAlert(false);
    }
    const msg:react.ReactElement = <div className={error?styles.errorMsg:styles.successMsg}><span className={styles.msg}>{alertMsg}</span></div>
    const exit: react.ReactElement = <div className={styles.exit} onClick={exitButton}><span className={styles.exitButton}>X</span></div>
    const container: react.ReactElement =
        <div>
            <div className={error?styles.errorContainer:styles.successContainer}>
                <div className={styles.msgContainer}>{msg}{exit}</div>
            </div>
        </div>
    const wrap:react.ReactElement = <div className={styles.wrapDiv}>{container}</div>


    return wrap
}
export default Alert;