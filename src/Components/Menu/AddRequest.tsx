import { useNavigate } from "react-router-dom";
import styles from "../../css-modules/Menu.module.css"

interface props{
    image:string,
    propAddress:string;
}
const AddCraftsman:React.FC<props>=({image,propAddress})=> {
    const navigate=useNavigate();
    const add=()=>{
        navigate(`/Properties/${propAddress}/AddRequest`);
    }
    const picture:React.ReactElement = <div><img src={image}/></div>;
    return (
        <div className={styles.buttonWrap} onClick={add}>
            <div className={styles.button}>
                {picture}
            </div>
            <p className={styles.buttonTitle}>Add request</p>
        </div>
    );
}
export default AddCraftsman;