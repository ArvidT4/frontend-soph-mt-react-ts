import EProperty from "./EProperty";
import { useMyUPContext } from "../../../../Contexts/UserPropertiesContext";

const EmployeeProps=()=>{
    const {userPropertiesList}=useMyUPContext();
    return(<div>
        {userPropertiesList&&(userPropertiesList.map((uP,key)=>(
            <EProperty userProp={uP} key={key}/>
        )))}
    </div>)
}
export default EmployeeProps;