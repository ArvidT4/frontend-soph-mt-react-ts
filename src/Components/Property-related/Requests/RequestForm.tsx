import ErrorText from "../../ErrorText";
import styles from "../../../css-modules/FormCss.module.css"
import {useEffect, useState} from "react";
import { useMyHandleChangeContext } from "../../../Contexts/HandleChangeContext";
import PerformOrCancelButtons from "../../PerformOrCancelButtons";
import DatePicker from "./DatePicker";
import {ToggleSwitch } from "flowbite-react";
import {IRequest} from "../../../interfaces";
import {useMyRequestContext} from "../../../Contexts/RequestContext";
import {useMyContext} from "../../../Contexts/TokenContext";
import CraftsmanListDropdown from "./CraftsmanListDropdown";
import { useMyInputValidationContext } from "../../../Contexts/InputValidationContext";
import Alert from "../../../Alerts/Alert"
import { useNavigate } from "react-router-dom";
import { useMyAlertContext } from "../../../Contexts/AlertContext";
interface RequestProps{
    address:string|undefined
}
const RequestForm:React.FC<RequestProps>=({address})=>{
    const navigate=useNavigate();
    const {addRequest} =useMyRequestContext();
    const {handleChange}=useMyHandleChangeContext();
    const {token}=useMyContext();
    const [comment,setComment]=useState<string>("");
    const [startingDate,setStartingDate]=useState<Date|undefined>();
    const [deadlineDate,setDeadlineDate]=useState<Date|undefined>();
    const [workerEmail,setWorkerEmail]=useState<string>("Choose craftsman");
    const [archived,setArchived]=useState<boolean>(false);
    const [freeAgent,setFreeAgent]=useState<boolean>(false);
    const [render,setRender]=useState<boolean>(false);
    const [alertMsg,setAlertMsg]=useState<string>("");
    const {alert,updateAlert} = useMyAlertContext();
    useEffect(() => {
        if(address){
            setRender(true)
        }
    }, []);
    useEffect(() => {
        requestVaildator(comment,startingDate,deadlineDate,workerEmail,freeAgent)
    }, [comment,startingDate,deadlineDate,workerEmail,freeAgent]);
    const {
        commentReqError,
        startingError,
        craftsmanError,
        requestVaildator}=useMyInputValidationContext();
    const add= async ()=>{
        if(token&&address&&!commentReqError&&!startingError&&!craftsmanError){
            if(startingDate==undefined)setStartingDate(new Date());
            if(deadlineDate==undefined)setDeadlineDate(new Date());

            const starting:string=startingDate?.getDay() + "/" + startingDate?.getMonth() + "/" + startingDate?.getFullYear();
            const deadline:string=deadlineDate?.getDay() + "/" + deadlineDate?.getMonth() + "/" + deadlineDate?.getFullYear();
            if(workerEmail=="Choose craftsman") setWorkerEmail("")
            const request:IRequest={
                id:"",
                comment:comment,
                startingDate:starting,
                deadlineDate:deadline,
                workerEmail:workerEmail,
                archived:archived,
                accepted:false,
                freeAgent:freeAgent,
                finished:false,
            };
            addRequest(request,token.token,address,workerEmail).then(success=>{
                if(success)navigate("/properties")
                else {
                    setAlertMsg("Server error");
                    updateAlert(true)
                }
            })
        }
        else {
            setAlertMsg("Demands not meet");
            updateAlert(true)
        }


    }
    return(
        <div>
            <div className={styles.inputWrap}>

                <div className={styles.spanWrap}>
                    <span className={styles.inputTitle}>Comment:</span>
                    <span className={commentReqError ? styles.lengthErrorText : styles.length}>{comment.length}/50</span>
                </div>
                <textarea name={"comment"} value={comment} onChange={(e) => handleChange(e, setComment)}
                          className={false ? styles.error : styles.customInput} placeholder={"...."}/>
                <ErrorText show={commentReqError} msg={"Must be or longer than 0 shorter than 50"}/>
            </div>
            <div className={styles.inputWrap}>
                <DatePicker startDate={startingDate} setStart={setStartingDate}
                            deadDate={deadlineDate} setDeadline={setDeadlineDate}></DatePicker>
                <ErrorText show={startingError} msg={"The starting date must be before the deadline"}/>

            </div>
            <div className={styles.inputWrap}>
                <div className={styles.togglesWrap}>
                    <div className={styles.freeAgentWrap}>
                        <span className={styles.toggleSpan}>Free agent</span>
                        <ToggleSwitch checked={freeAgent} onChange={()=>setFreeAgent(prevState => !prevState)}/>
                    </div>
                    <div className={styles.archiveWrap}>
                        <span className={styles.toggleSpan}>Archive</span>
                        <ToggleSwitch checked={archived} onChange={()=>setArchived(prevState => !prevState)}/>
                    </div>
                </div>

            </div>
            {!freeAgent && <div className={styles.inputWrap}>
                <span className={styles.inputTitle}>Craftsman:</span>
                {render&&<CraftsmanListDropdown address={address} workerEmail={workerEmail} setWorkerEmail={setWorkerEmail}></CraftsmanListDropdown>}
                <ErrorText show={craftsmanError} msg={"Choose craftsman or turn on Free agent"}/>
            </div>}
            {alert && <Alert alertMsg={alertMsg} error={true}></Alert>}

            <PerformOrCancelButtons propFunc={add}></PerformOrCancelButtons>
        </div>
    )
}
export default RequestForm;