"use client";
import styles from "../../../css-modules/FormCss.module.css"
import { Datepicker } from 'flowbite-react';
import { useMyHandleChangeContext } from '../../../Contexts/HandleChangeContext';
import { useEffect } from "react";
interface DateStates{
    startDate:Date|undefined,
    setStart:React.Dispatch<React.SetStateAction<any>>,
    deadDate:Date|undefined,
    setDeadline:React.Dispatch<React.SetStateAction<any>>
}
const DatePickerComponent:React.FC<DateStates> = ({startDate,setStart,deadDate,setDeadline}) => {

    useEffect(() => {
        console.log(startDate + "fds" + deadDate)
        if(startDate==undefined)setStart(new Date());
        if(deadDate==undefined)setDeadline(new Date());
    }, [startDate,deadDate]);
    const {handleChangeDate}=useMyHandleChangeContext();
    const defaultHandleChange = () => {};
    const changeHandler = handleChangeDate || defaultHandleChange;
    const changeHandlerDate = (e: Date | null, set: React.Dispatch<React.SetStateAction<any>>) => {
        if (e !== null) {
            changeHandler(e, set);
        }
    };
    return (
        <div>
            <div>
                <span className={styles.inputTitle}>Starting date</span>
                <Datepicker defaultValue={new Date()} onChange={(e:Date|null)=>changeHandlerDate(e,setStart)} minDate={new Date()} maxDate={deadDate}/>
            </div>
            <div>
                <span className={styles.inputTitle}>Deadline</span>
                <Datepicker defaultValue={new Date()} onChange={(e: Date | null) => changeHandlerDate(e, setDeadline)} minDate={startDate}/>
            </div>
        </div>
    )
};

export default DatePickerComponent;