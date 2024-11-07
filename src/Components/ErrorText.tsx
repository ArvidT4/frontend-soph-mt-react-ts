import styles from "../css-modules/FormCss.module.css"
interface props{
    show:boolean,
    msg:string
}
const ErrorText:React.FC<props>=({show,msg})=> {
    return (
        <div>
            {show&&<span className={styles.errorText}>{msg}</span>}
        </div>
    )
}
export default ErrorText;