import { useParams } from "react-router-dom";
import H1Banner from "../../Components/H1Banner"
import RequestForm from "../../Components/Property-related/Requests/RequestForm";

const AddRequest=()=>{
    const {propAddress}=useParams();
    return(
        <div>
            <H1Banner header={`Add request ${propAddress}`}></H1Banner>
            <RequestForm address={propAddress}></RequestForm>
        </div>
    )
}
export default AddRequest