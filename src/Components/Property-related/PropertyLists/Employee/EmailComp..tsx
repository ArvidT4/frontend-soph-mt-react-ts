import styles from "../../../../css-modules/UserProperties.module.css"
interface EmailProp{
    email:string;
}

const EmailProp:React.FC<EmailProp>=({email})=>{

    return (
        <div className={styles.emailWrap}>
            <span className={styles.emailText}>{email}</span> 
        </div>
    )
}
export default EmailProp