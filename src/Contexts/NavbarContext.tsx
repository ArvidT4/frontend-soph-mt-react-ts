import {ReactNode, createContext, useContext, useState, useEffect} from "react"

interface INavbarContext{
    setClicked:React.Dispatch<React.SetStateAction<any>>,
    clicked:boolean
}

const MyContext = createContext<INavbarContext|undefined>(undefined)

const MyNavbarProvider: React.FC<{children:ReactNode}> = ({children})=>{
    const [clicked,setClicked]=useState<boolean>(false);


    return (
        <MyContext.Provider value={{clicked,setClicked}}>
            {children}
        </MyContext.Provider>
    )
}

const useMyNavbarContext=()=> {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyContext must be used within a provider");
    }
    return context;
};
export{MyNavbarProvider, useMyNavbarContext}