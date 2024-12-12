import styles from "../../../css-modules/RequestFeed.module.css";
import { IRequest } from "../../../interfaces";
import BooleanReq from "./BooleanReq";
import ReqMenu from "./Request-menu/ReqMenu";

interface RequestProp {
    request: IRequest;
    address:string;
}

const WorkRequest: React.FC<RequestProp> = ({ request,address }) => {
    return (
        <div className={styles.reqWrap}>
            <div className={styles.reqComment}>
                <div>
                    {request.comment}
                </div>
            </div>
            {request.freeAgent&&request.workerEmail==""  ?
                <div className={styles.reqDiv}>
                    <span className={styles.reqTitle}>Free agent</span>
                </div> :
                <div className={styles.reqDiv}>
                    <span className={styles.reqTitle}>Craftsman:</span>{request.workerEmail}
                </div>
            }

            <div  className={styles.reqDiv}>
                <span className={styles.reqTitle}>Earliest:</span> {request.startingDate}
            </div>
            <div  className={styles.reqDiv}>
                <span className={styles.reqTitle}>Latest:</span> {request.deadlineDate}
            </div>
            <div className={styles.reqDiv}>
                <BooleanReq text={"Accepted"} condition={request.accepted}></BooleanReq>
                <BooleanReq text={"Archived"} condition={request.archived}></BooleanReq>
                <BooleanReq text={"Finished"} condition={request.finished}></BooleanReq>

            </div>

            <ReqMenu reqId={request.id} address={address}/>
        </div>
    );
};

export default WorkRequest;