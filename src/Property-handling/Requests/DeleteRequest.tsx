import {useNavigate, useParams } from "react-router-dom";
import H1Banner from "../../Components/H1Banner";
import PerformOrCancelButtons from "../../Components/PerformOrCancelButtons";
import { useMyRequestContext } from "../../Contexts/RequestContext";
import { useMyContext } from "../../Contexts/TokenContext";
import { useMyAlertContext } from "../../Contexts/AlertContext";
import styles from "../../css-modules/DeleteProperty.module.css"
import { useEffect, useState } from "react";
import { IRequest } from "../../interfaces";
import { useMyPropertiesContext } from "../../Contexts/PropertyContext";



const DeleteRequest=()=>{
    const [render,setRender]=useState<boolean>(false);
    const {reqId,propAddress} = useParams();
    const {deleteRequest,getRequest,request} = useMyRequestContext();
    const {updateAlert}=useMyAlertContext();
    const {properties}=useMyPropertiesContext();
    const navigate=useNavigate();
    const {token} = useMyContext();
    useEffect(() => {
        if(propAddress&&reqId&&properties) {
            getRequest(propAddress,reqId,properties);
        }
        if(request&&propAddress)setRender(true)
    }, [reqId,propAddress,properties,request]);

    const delReq  =async()=>{
        if(token&&reqId&&propAddress){
            if(await deleteRequest(token.token, reqId, propAddress)){
                updateAlert(true)
            }
            navigate("/Properties")
        }

    }
    return(
        <div>
            <H1Banner header={"Delete Request"}></H1Banner>
            {render ?
                <div>
                    <div className={styles.header}>Are you sure you want to delete the request
                        <p className={styles.address}>{request && request.comment}</p>
                        from
                        <p className={styles.address}>{propAddress}</p>
                    </div>
                    <PerformOrCancelButtons propFunc={delReq}></PerformOrCancelButtons>
                </div>
                : "loading"}


        </div>
    )
}
export default DeleteRequest