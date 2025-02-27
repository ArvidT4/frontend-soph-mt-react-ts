import {useEffect, useState } from "react";
import { useMyNavbarContext } from "../../Contexts/NavbarContext";
import styles from "../../css-modules/Navbar.module.css"
import { useMyContext } from "../../Contexts/TokenContext";
import CustomerNav from "./CustomerNav";
import EmployeeNav from "./EmployeeNav";

const NavbarContent:React.FC=()=>{
    const {clicked}=useMyNavbarContext();
    const {token} = useMyContext();
    const [customer,setCustomer]=useState<boolean>();
    const ROLES:string[]=["customer","employee"];

    useEffect(() => {
        if(token&&token.role===ROLES[1])setCustomer(false)
        else setCustomer(true)
    }, [token]);
    return(

        <div  className={clicked?styles.contentWrap:styles.contentWrapHidden}>
            {customer?<CustomerNav/>:<EmployeeNav/>}
        </div>
    )
}
export default NavbarContent