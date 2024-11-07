import styles from '../css-modules/H1Banner.module.css';
interface props{
    header:string
}

const H1Banner:React.FC<props>=({header}:props)=>{
    return (
        <div className={styles.wrap}>
            <h1 className={styles.h1}>{header}</h1>
        </div>
    )
}
export default H1Banner;