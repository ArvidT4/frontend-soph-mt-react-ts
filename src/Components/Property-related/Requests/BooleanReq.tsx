import styles from "../../../css-modules/RequestFeed.module.css"
interface BooleanProp{
    text:string,
    condition:boolean,
}
const BooleanReq:React.FC<BooleanProp>=({text,condition})=>{
    return(
        <div className={styles.booleanWrap}>
            <span className={styles.reqTitle}>{text}:</span>{condition?<div className={styles.true}></div>:<div className={styles.false}></div>}
        </div>
    )
}
export default BooleanReq;