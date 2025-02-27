import {useMyUPContext} from "../../../../../Contexts/UserPropertiesContext";
import {useEffect, useState} from "react";
import {IRequest} from "../../../../../interfaces";
import AcceptedReq from "./AcceptedReq";


const AcceptedReqs = () => {
    const { userPropertiesList } = useMyUPContext();
    const [accepted, setAccepted] = useState<IRequest[]>([]);

    useEffect(() => {
        if (userPropertiesList) {
            let tempAccepted: IRequest[] = [];
            userPropertiesList.forEach(uP => {
                uP.propertyList.forEach(prop => {
                    const acceptedRequests = prop.workRequests.filter((req: IRequest) => req.accepted);
                    tempAccepted = [...tempAccepted, ...acceptedRequests];
                });
            });
            setAccepted(tempAccepted);
        }
    }, [userPropertiesList]);

    return(<div>
        {accepted?
            accepted.map(((req:IRequest,key)=>(
                <AcceptedReq key={key} request={req}/>
            )))
            :
            <div>No accepted requests</div>}
    </div>)
}
export default AcceptedReqs