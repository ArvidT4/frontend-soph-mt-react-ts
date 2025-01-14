import FilterButton from "../../../Requests/FilterButton"
import styles from "../../../../../css-modules/FilterRequests.module.css"
import {useEffect, useState } from "react";
import { IRequest } from "../../../../../interfaces";
interface FilterProps{
    requests:IRequest[],
    setRequests:React.Dispatch<React.SetStateAction<any>>,
}
const FilterRequestsEmp:React.FC<FilterProps>=({requests,setRequests})=>{

    const [filterState,setFilterState] = useState<string>("");
    const [filterReqs,setFilterReqs]=useState<IRequest[]>();
    const [copied,setCopied]=useState<boolean>(false);
    const UNFINISHED:string="Unfinished";
    const FINISHED:string="Finished";
    const FREE_AGENT:string="Free agent";

    useEffect(() => {

        if(filterReqs){
            console.log(filterReqs)
            if(filterState===UNFINISHED)setRequests(filterReqs.filter(req=>!req.finished&&!req.freeAgent))
            else if(filterState===FINISHED)setRequests(filterReqs.filter(req=>req.finished))
            else if(filterState===FREE_AGENT)setRequests(filterReqs.filter(req=>req.freeAgent))
        }

    }, [filterState]);
    useEffect(() => {

        if(requests&&!copied){
            setFilterReqs(requests)
            setCopied(true);
        }
    }, [requests]);

    return(
        <div className={styles.wrapEmp}>
            <h3 className={styles.filterHeader}>
                Filter requests
            </h3>
            <div className={styles.divWrap}>
                <FilterButton setFilter={setFilterState} text={UNFINISHED}/>
                <FilterButton setFilter={setFilterState} text={FINISHED}/>
                <FilterButton setFilter={setFilterState} text={FREE_AGENT}/>
            </div>
        </div>
    )
}
export default FilterRequestsEmp