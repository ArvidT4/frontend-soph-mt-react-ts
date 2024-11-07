import ErrorText from "../../ErrorText";
import styles from "../../../css-modules/FormCss.module.css"
import { useState } from "react";
import { useMyHandleChangeContext } from "../../../Contexts/HandleChangeContext";
import PerformOrCancelButtons from "../../PerformOrCancelButtons";
import DatePicker from "./DatePicker";
const RequestForm:React.FC=()=>{

    const {handleChange}=useMyHandleChangeContext();
    const [comment,setComment]=useState<string>("");
    const [startingDate,setStartingDate]=useState<string>("");
    const [deadlineDate,setDeadlineDate]=useState<string>("");
    const [workerEmail,setWorkerEmail]=useState<string>("");
    const [archived,setArchived]=useState<boolean>(false);
    const [freeAgent,setFreeAgent]=useState<boolean>(false);
    const addRequest=()=>{

    }
    return(
        <div>
            <div className={styles.inputWrap}>
                <span className={styles.inputTitle}>Comment:</span>
                <input type={"text"} name={"comment"} value={comment} onChange={(e) => handleChange(e, setComment)}
                       className={false ? styles.error : styles.customInput} placeholder={"...."}/>
                <ErrorText show={false} msg={"Must be or longer than 0 shorter than 25"}/>
            </div>
            <DatePicker></DatePicker>

            <div className={styles.inputWrap}>
                <span className={styles.inputTitle}>Comment:</span>
                <input type={"text"} name={"comment"} value={comment} onChange={(e) => handleChange(e, setComment)}
                       className={false ? styles.error : styles.customInput} placeholder={"...."}/>
                <ErrorText show={false} msg={"Must be or longer than 0 shorter than 25"}/>
            </div>
            <div className={styles.inputWrap}>
                <span className={styles.inputTitle}>Comment:</span>
                <input type={"text"} name={"comment"} value={comment} onChange={(e) => handleChange(e, setComment)}
                       className={false ? styles.error : styles.customInput} placeholder={"...."}/>
                <ErrorText show={false} msg={"Must be or longer than 0 shorter than 25"}/>
            </div>
            <div className={styles.inputWrap}>
                <span className={styles.inputTitle}>Comment:</span>
                <input type={"text"} name={"comment"} value={comment} onChange={(e) => handleChange(e, setComment)}
                       className={false ? styles.error : styles.customInput} placeholder={"...."}/>
                <ErrorText show={false} msg={"Must be or longer than 0 shorter than 25"}/>
            </div>
            <PerformOrCancelButtons propFunc={addRequest}></PerformOrCancelButtons>
        </div>
    )
}
export default RequestForm;