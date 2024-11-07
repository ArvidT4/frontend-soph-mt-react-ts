import {ReactNode, createContext, useContext, useEffect, useState } from "react";
import { IProperty } from "../interfaces";

interface Inputs{
    post3Class: boolean;
    post2Class: boolean;
    descError: boolean;
    addressError: boolean;
    cityError: boolean;
    stateError: boolean;
    validator:(prop:IProperty,postal3:number,postal2:number)=>void
}

const MyContext=createContext<Inputs|undefined>(undefined)

const MyInputValidationProvider:React.FC<{children:ReactNode}>=({children})=>{

    const [post3Class,setPost3Class]=useState<boolean>(false)
    const [post2Class,setPost2Class]=useState<boolean>(false)
    const [descError,setDescError]=useState<boolean>(false)
    const [addressError,setAddressError]=useState<boolean>(false)
    const [cityError,setCityError]=useState<boolean>(false)
    const [stateError,setStateError]=useState<boolean>(false)

    const validator=(prop:IProperty,postal3:number,postal2:number)=>{
        const { postCode, description = '', address = '', city = '', state = '' } = prop;
        console.log(prop)
        if(prop!=undefined){
            if (postal3==null||postal3 < 99 || postal3 > 999|| Number.isNaN(postal3)) setPost3Class(true);
            else setPost3Class(false);
            if (postal2==null||postal2 < 1 || postal2 > 99|| Number.isNaN(postal2)) setPost2Class(true);
            else setPost2Class(false);
            //description validation
            if(description.length>100) setDescError(true)
            else setDescError(false)
            //address validation
            if(address.length>25||address.length<5)setAddressError(true)
            else setAddressError(false)
            //city validation
            if(city.length>25||city.length<1)setCityError(true)
            else setCityError(false)
            //state validation
            if(state.length>25||state.length<5)setStateError(true)
            else setStateError(false)
        }
    }

    return <MyContext.Provider value={{ post3Class, post2Class, descError, addressError, cityError, stateError, validator }}>
        {children}
    </MyContext.Provider>
}

const useMyInputValidationContext=()=> {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyContext must be used within a provider");
    }
    return context;
};
export{MyInputValidationProvider, useMyInputValidationContext}