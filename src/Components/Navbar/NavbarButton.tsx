import burger from "../../images/burgerMenu.png"
import styles from "../../css-modules/Navbar.module.css"
import React, {useEffect, useReducer, useRef, useState} from "react"
import { useMyNavbarContext } from "../../Contexts/NavbarContext"
import {
    burgerReducer,
    CLICKED,
    DUR_CLICKED, INITIAL_STATE,
    UN_CLICKED,
} from "../../reducer/burgerReducer";

const NavbarButton=()=>{
    const [state,dispatch]=useReducer(burgerReducer,INITIAL_STATE);
    const {clicked,setClicked}=useMyNavbarContext();
    const buttonClicked=()=>{

        setClicked((prev:boolean) => !prev)
    }
    const firstUpdate=useRef(true);
    useEffect(() => {
        console.log("1")
        if(firstUpdate.current){
            console.log("3")
            firstUpdate.current=false;
            return;
        }
        console.log("2")
        if(clicked){
            dispatch({type:CLICKED})
            setTimeout(()=>{
                dispatch({type:DUR_CLICKED})
            },300)

        }else{
            dispatch({type:CLICKED})
            setTimeout(()=>{
                dispatch({type:UN_CLICKED})
            },300)
        }

    }, [clicked]);


    return(
        <div onClick={buttonClicked} className={styles.lineWrap}>
            <div className={styles[state.top]}></div>
            <div className={styles[state.center]}></div>
            <div className={styles[state.bot]}></div>
        </div>
    )
}
export default NavbarButton