import { IProperty } from "../../interfaces"
import DeleteButton from "./DeleteButton"
import EditButton from "./EditButton"
import css from "../../css-modules/Menu.module.css"
import AddCraftsman from "./AddCraftsman"
import addButton from "../../images/add.png"
import editButton from "../../images/edit.svg.png"
import deleteButton from "../../images/trashCan.png"
import { useMyPropertiesContext } from "../../Contexts/PropertyContext"
import { useMyContext } from "../../Contexts/TokenContext"
import AddRequest from "./AddRequest"
interface MenuProps{
    prop:IProperty
}
const Menu:React.FC<MenuProps>=({prop})=>{
    
    return(
        <div className={css.menuWrap}>
            <EditButton prop={prop}></EditButton>
            <DeleteButton address={prop.address}></DeleteButton>
            <AddCraftsman propId={prop.id} image={addButton}></AddCraftsman>
            <AddRequest image={addButton} propAddress={prop.address}></AddRequest>
        </div>
    )
}
export default Menu