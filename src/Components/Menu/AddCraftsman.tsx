import { useNavigate } from "react-router-dom";
import styles from "../../css-modules/Menu.module.css"

interface props{
    image:string,
    propId:string,
}
const AddCraftsman:React.FC<props>=({image,propId})=> {
    const navigate=useNavigate();
    const redirect=()=>{
        navigate(`/properties/${propId}/addCraftsman`)
    }

    const picture:React.ReactElement = <div><img src={image}/></div>;
    return (
        <div className={styles.buttonWrap} onClick={redirect}>
            <div className={styles.button}>
                {picture}
            </div>
            <p className={styles.buttonTitle}>Add craftsman</p>
        </div>
    );
}
export default AddCraftsman;