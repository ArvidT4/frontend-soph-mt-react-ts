import ErrorText from "../../ErrorText";
import styles from "../../../css-modules/FormCss.module.css"
import {useEffect, useState} from "react";
import { useMyHandleChangeContext } from "../../../Contexts/HandleChangeContext";
import PerformOrCancelButtons from "../../PerformOrCancelButtons";
import DatePicker from "./DatePicker";
import { ToggleSwitch } from "flowbite-react";
import {IRequest} from "../../../interfaces";
import {useMyRequestContext} from "../../../Contexts/RequestContext";
import {useMyContext} from "../../../Contexts/TokenContext";
interface RequestProps{
    address:string|undefined
}
const RequestForm:React.FC<RequestProps>=({address})=>{

    const {addRequest} =useMyRequestContext();
    const {handleChange}=useMyHandleChangeContext();
    const {token}=useMyContext();
    const [comment,setComment]=useState<string>("");
    const [startingDate,setStartingDate]=useState<Date|undefined>();
    const [deadlineDate,setDeadlineDate]=useState<Date|undefined>();
    const [workerEmail,setWorkerEmail]=useState<string>("");
    const [archived,setArchived]=useState<boolean>(false);
    const [freeAgent,setFreeAgent]=useState<boolean>(false);
    /*export interface IRequest{
        id:string;
        comment:string;
        startingDate:string;
        deadlineDate:string;
        workerEmail:string;
        archived:boolean;
        accepted:boolean;
        freeAgent:boolean;
    }*/
    useEffect(() => {
        console.log(startingDate +" " + deadlineDate?.getDay() + "/" + deadlineDate?.getMonth() + "/" + deadlineDate?.getFullYear());
    }, [startingDate,deadlineDate]);
    const add= async ()=>{
        if(token&&address){
            const starting:string=startingDate?.getDay() + "/" + startingDate?.getMonth() + "/" + startingDate?.getFullYear();
            const deadline:string=deadlineDate?.getDay() + "/" + deadlineDate?.getMonth() + "/" + deadlineDate?.getFullYear();
            const request:IRequest={
                id:"",
                comment:comment,
                startingDate:starting,
                deadlineDate:deadline,
                workerEmail:workerEmail,
                archived:archived,
                accepted:false,
                freeAgent:freeAgent
            };
            const approved= addRequest(request,token.token,address,workerEmail);
        }


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
                <input type={"text"} name={"comment"} value={workerEmail} onChange={(e) => handleChange(e, setWorkerEmail)}
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
            <PerformOrCancelButtons propFunc={add}></PerformOrCancelButtons>
        </div>
    )
}
export default RequestForm;