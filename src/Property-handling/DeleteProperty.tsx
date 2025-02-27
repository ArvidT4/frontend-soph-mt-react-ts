import {useNavigate, useParams } from "react-router-dom"
import H1Banner from "../Components/H1Banner"
import PerformOrCancelButtons from "../Components/PerformOrCancelButtons"
import { useMyPropertiesContext } from "../Contexts/PropertyContext"
import { useMyContext } from "../Contexts/TokenContext"
import styles from "../css-modules/DeleteProperty.module.css"

const DeleteProperty=()=>{
    const {propAddress}=useParams();
    const {removeProperty} = useMyPropertiesContext()
    const {token} = useMyContext()
    const navigate=useNavigate()
    const deleteProp = async () => {
        try {
            if (token&&propAddress) {
                const success:boolean=await removeProperty(token.token, propAddress)
                if(success){
                    navigate("/properties")
                }
            }
        } catch (error) {
            console.log("test")
        }

    }
    return(
        <div>
            <H1Banner header={"Delete"}></H1Banner>
            <h2 className={styles.header}>
                Are you sure you want to delete <span className={styles.address}>{propAddress}</span>?
            </h2>
            <PerformOrCancelButtons propFunc={deleteProp}></PerformOrCancelButtons>
        </div>
    )
}
export default DeleteProperty