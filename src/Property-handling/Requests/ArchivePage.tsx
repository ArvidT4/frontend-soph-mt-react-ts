import {useNavigate, useParams } from "react-router-dom";
import H1Banner from "../../Components/H1Banner"
import styles from "../../css-modules/DeleteProperty.module.css"
import { useMyPropertiesContext } from "../../Contexts/PropertyContext";
import { useMyContext } from "../../Contexts/TokenContext";
import { useEffect, useState } from "react";
import { useMyRequestContext } from "../../Contexts/RequestContext";
import PerformOrCancelButtons from "../../Components/PerformOrCancelButtons";

const ArchivePage=()=>{
    const {reqId,propAddress}=useParams();
    const [render,setRender]=useState<boolean>(false);
    const {getRequest,request,updateArchive} = useMyRequestContext();
    const {properties}=useMyPropertiesContext();
    const navigate=useNavigate();
    const {token} = useMyContext();
    useEffect(() => {
        if(propAddress&&reqId&&properties) {
            getRequest(propAddress,reqId,properties);
        }
        if(request&&propAddress)setRender(true)
    }, [reqId,propAddress,properties,request]);

    const archive= async ()=>{
        if(request&&token&&propAddress&&reqId)
            updateArchive(request,token.token,propAddress,reqId).then(success=>{
                if(success) navigate("/Properties")
            })

    }
    return(
        <div>
            <H1Banner header={"Archive"}></H1Banner>
            {request?
                <div>
                    <div className={styles.header}>
                        Are you sure you want to archive
                        <span className={styles.address}> {request.comment} </span>
                        from
                        <span className={styles.address}> {propAddress}</span>?
                        <div className={styles.info}>
                            If you were to go through with this, craftsmen will not be able to see nor be able to accept the request.
                        </div>
                    </div>
                    <PerformOrCancelButtons propFunc={archive}></PerformOrCancelButtons>
                </div>:"loading"
            }


        </div>
    )
}
export default ArchivePage