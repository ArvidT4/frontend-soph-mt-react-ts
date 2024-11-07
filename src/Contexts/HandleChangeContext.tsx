import { ChangeEvent, ReactNode, createContext, useContext } from "react";

interface HandleChangeContext{
    handleChange:(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        set: React.Dispatch<React.SetStateAction<any>>
    )=>void;
}
const MyContext = createContext<HandleChangeContext|undefined>(undefined)

const MyHandleChangeProvider: React.FC<{children:ReactNode}> = ({children})=>{
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        setFunc: React.Dispatch<React.SetStateAction<any>>
    ) => {
        if (e.target.type === "number") {
            setFunc(parseInt(e.target.value.trim()));

        } else {
            setFunc(e.target.value.replace(/\s+/g, ' ').trim());
        }
    };

    return (
        <MyContext.Provider value={{handleChange}}>
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