import ErrorText from "../../ErrorText";
import styles from "../../../css-modules/FormCss.module.css"
import { useState } from "react";
import { useMyHandleChangeContext } from "../../../Contexts/HandleChangeContext";
import PerformOrCancelButtons from "../../PerformOrCancelButtons";
import DatePicker from "./DatePicker";
import { ToggleSwitch } from "flowbite-react";
const RequestForm=()=>{

    const {handleChange}=useMyHandleChangeContext();
    const [comment,setComment]=useState<string>("");
    const [startingDate,setStartingDate]=useState<Date|undefined>();
    const [deadlineDate,setDeadlineDate]=useState<Date|undefined>();
    const [workerEmail,setWorkerEmail]=useState<string>("");
    const [archived,setArchived]=useState<boolean>(false);
    const [freeAgent,setFreeAgent]=useState<boolean>(false);
    const addRequest=()=>{

    }
    return(
        <div>
            <div className={styles.inputWrap}>
                <span className={styles.inputTitle}>Comment:</span>
                <textarea name={"comment"} value={comment} onChange={(e) => handleChange(e, setComment)}
                       className={false ? styles.error : styles.customInput} placeholder={"...."}/>
                <ErrorText show={false} msg={"Must be or longer than 0 shorter than 25"}/>
            </div>
            <div className={styles.inputWrap}>
                <DatePicker startDate={startingDate} setStart={setStartingDate} setDeadline={setDeadlineDate}></DatePicker>
            </div>


            <div className={styles.inputWrap}>
                <span className={styles.inputTitle}>Craftsman:</span>
                <input type={"text"} name={"comment"} value={comment} onChange={(e) => handleChange(e, setComment)}
                       className={false ? styles.error : styles.customInput} placeholder={"...."}/>
                <ErrorText show={false} msg={"Must be or longer than 0 shorter than 25"}/>
            </div>
            <div className={styles.inputWrap}>
                <ToggleSwitch checked={archived} label="Archived" onChange={setArchived} />
                <ErrorText show={false} msg={"Must be or longer than 0 shorter than 25"}/>
            </div>
            <div className={styles.inputWrap}>

                <ToggleSwitch checked={freeAgent} label="Free agent" onChange={setFreeAgent} />
            </div>
            <PerformOrCancelButtons propFunc={addRequest}></PerformOrCancelButtons>
        </div>
    )
}
export default RequestForm;