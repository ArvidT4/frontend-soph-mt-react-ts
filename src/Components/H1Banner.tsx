import styles from '../css-modules/H1Banner.module.css';
import Navbar from './Navbar/Navbar';
import NavbarContent from './Navbar/NavbarContent';
interface props{
    header:string
}

const H1Banner:React.FC<props>=({header}:props)=>{
    return (
        <div>
            <div className={styles.wrap}>
                <h1 className={styles.h1}>{header}</h1>
                <Navbar/>
            </div>
            <NavbarContent/>
        </div>


    )
}
export default H1Banner;