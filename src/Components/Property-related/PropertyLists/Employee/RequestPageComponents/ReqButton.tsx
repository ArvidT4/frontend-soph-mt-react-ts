import styles from "../../../../../css-modules/RequestPage.module.css"
interface ReqButtonProps{
    title:string,
    reqFunction:()=>void,
}

const ReqButton:React.FC<ReqButtonProps>=({title,reqFunction})=>{
    return(
        <button onClick={reqFunction} className={styles.acceptButton}>{title}</button>
    )
}
export default ReqButton