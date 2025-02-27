import css from "../../css-modules/Menu.module.css"

interface props{
    setShow:React.Dispatch<React.SetStateAction<any>>,
    show:boolean
}
const MenuButton:React.FC<props>=({setShow,show})=>{

    const pressed=()=>{
        setShow(!show)
    }
    return(
        <div className={css.menuButtonWrap} onClick={pressed}>
            <img className={css.menuButton} src={"menuButton"}/>
        </div>
    )
}
export default MenuButton;