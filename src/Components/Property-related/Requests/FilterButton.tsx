import styles from "../../../css-modules/FilterRequests.module.css"
interface Props{
    text:string
    setFilter:React.Dispatch<React.SetStateAction<any>>,

}
const FilterButton:React.FC<Props>=({text,setFilter}:Props)=>{

    return(
        <div className={styles.buttonWrap} onClick={()=>setFilter(text)}>
            {text}
        </div>
    )
}
export default FilterButton