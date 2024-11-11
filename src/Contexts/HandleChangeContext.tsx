import { ChangeEvent, ReactNode, createContext, useContext } from "react";

interface HandleChangeContext{
    handleChange:(
        //e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        e:any,
        set: React.Dispatch<React.SetStateAction<any>>
    )=>void;
    handleChangeDate:(
        //e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        e:any,
        set: React.Dispatch<React.SetStateAction<any>>
    )=>void;
}
const MyContext = createContext<HandleChangeContext|undefined>(undefined)

const MyHandleChangeProvider: React.FC<{children:ReactNode}> = ({children})=>{
    const handleChange = (
        e: any,//ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        setFunc: React.Dispatch<React.SetStateAction<any>>
    ) => {
        if(e!=null||e.target.type!=null){
            if (e.target.type === "number") {
                setFunc(parseInt(e.target.value.trim()));

            } else {
                setFunc(e.target.value.replace(/\s+/g, ' ').trim());
            }
        }

    };
    const handleChangeDate = (
        e: any,//ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        setFunc: React.Dispatch<React.SetStateAction<any>>
    ) => {
        if(e!=null){
            setFunc(e);
        }

    };

    return (
        <MyContext.Provider value={{handleChange,handleChangeDate}}>
            {children}
        </MyContext.Provider>
    )
}

const useMyHandleChangeContext=()=> {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyContext must be used within a provider");
    }
    return context;
};
export{MyHandleChangeProvider, useMyHandleChangeContext}