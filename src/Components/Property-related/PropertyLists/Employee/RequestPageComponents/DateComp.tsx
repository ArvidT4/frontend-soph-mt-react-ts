import styles from "../../../../../css-modules/RequestPage.module.css"
interface DateProps{
    starting:string,
    deadline:string;
}
const DateComp:React.FC<DateProps>=({starting,deadline})=>{

    return (<div className={styles.dateWrap}>
        <div className={styles.startDate}>
            <span className={styles.attrTitle}>Starting date: </span>
            <div>{starting} </div>
        </div>
        <div className={styles.dateSpaceWrap}>
            <div className={styles.dateSpace}> -</div>
        </div>
        <div className={styles.deadDate}>
            <span className={styles.attrTitle}>Deadline: </span>
            <div> {deadline}</div>
        </div>


    </div>)
}
export default DateComp