import H1Banner from "../../Components/H1Banner";
import {useMyUPContext} from "../../Contexts/UserPropertiesContext";

const RequestFeedPage=()=>{
    const {userPropertiesList}=useMyUPContext();
    return(<div>
        <H1Banner header={"Requests"}></H1Banner>
        {userPropertiesList?.map(userProp=>
            <div></div>
        )}
    </div>)
}
export default RequestFeedPage