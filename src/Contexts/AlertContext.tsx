import {ReactNode, createContext, useContext, useState, useEffect} from "react"

interface IAlertContext{
    alert:boolean
    updateAlert:(status:boolean)=>void
}

const MyContext = createContext<IAlertContext|undefined>(undefined)

const MyAlertProvider: React.FC<{children:ReactNode}> = ({children})=>{
    const [alert,setAlert] = useState<boolean>(false);
    const DURATION:number = 5000;
    const updateAlert=(status:boolean):void=>{
        setAlert(status);
        console.log(alert);
    }
    useEffect(() => {

        const timer = setTimeout(()=>{
            setAlert(false)
        },DURATION)
        return ()=> clearTimeout(timer);
    }, [alert]);


    return (
        <MyContext.Provider value={{alert,updateAlert}}>
            {children}
        </MyContext.Provider>
    )
}

const useMyAlertContext=()=> {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyContext must be used within a provider");
    }
    return context;
};
export{MyAlertProvider, useMyAlertContext}