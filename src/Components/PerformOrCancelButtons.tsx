import { useNavigate } from "react-router-dom"
import css from "../css-modules/PerformOrCancel.module.css"
interface props{
    propFunc:()=>void
}
const PerformOrCancelButtons:React.FC<props>=({propFunc})=>{
    const navigate = useNavigate()

    const backToProp =()=>{
        navigate("/properties")
    }
    return (
        <div className={css.buttonWrap}>
            <div className={css.buttonSaveWrap}>
                <button onClick={propFunc} className={css.buttons}>Save</button>
            </div>
            <div className={css.buttonCancelWrap}>
                <button onClick={backToProp} className={css.buttons}>Cancel</button>
            </div>
        </div>
    )
}
export default PerformOrCancelButtons