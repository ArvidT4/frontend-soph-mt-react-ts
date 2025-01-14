import FilterButton from "./FilterButton"
import styles from "../../../css-modules/FilterRequests.module.css"
import {useEffect, useState } from "react";
import { IRequest } from "../../../interfaces";
interface FilterProps{
    requests:IRequest[],
    setRequests:React.Dispatch<React.SetStateAction<any>>,
}
const FilterRequests:React.FC<FilterProps>=({requests,setRequests})=>{

    const [filterState,setFilterState] = useState<string>("");
    const [filterReqs,setFilterReqs]=useState<IRequest[]>();
    const [copied,setCopied]=useState<boolean>(false);
    const UNFINISHED:string="Unfinished";
    const FINISHED:string="Finished";
    const ARCHIVED:string="Archived";
    useEffect(() => {

        if(filterReqs){
            console.log(filterReqs)
            if(filterState===UNFINISHED)setRequests(filterReqs.filter(req=>!req.finished&&!req.archived))
            else if(filterState===FINISHED)setRequests(filterReqs.filter(req=>req.finished&&!req.archived))
            else if(filterState===ARCHIVED)setRequests(filterReqs.filter(req=>req.archived))
        }

    }, [filterState]);
    useEffect(() => {

        if(requests&&!copied){
            setFilterReqs(requests)
            setCopied(true);
        }
    }, [requests]);

    return(
        <div className={styles.wrap}>
            <h3 className={styles.filterHeader}>
                Filter requests
            </h3>
            <div className={styles.divWrap}>
                <FilterButton setFilter={setFilterState} text={UNFINISHED}></FilterButton>
                <FilterButton setFilter={setFilterState} text={FINISHED}></FilterButton>
                <FilterButton setFilter={setFilterState} text={ARCHIVED}></FilterButton>
            </div>
        </div>
    )
}
export default FilterRequests