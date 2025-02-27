import styles from "../../../../../css-modules/RequestPage.module.css"
interface ReqProps{
    bool:boolean,
    title:string,
}

const ReqBoolean:React.FC<ReqProps>=({bool,title})=>{
    
    return(
        <div className={styles.booleanWrap}>
            <span className={styles.attrTitle}>{title}: </span>
            {bool? <div><img className={styles.boolImg} src={"check"}/></div> : <div><img className={styles.boolImg} src={"x"}/></div>}
        </div>
    )
}
export default ReqBoolean