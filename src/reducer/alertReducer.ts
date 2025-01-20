export const INITIAL_STATE={
    error:true,
    alertMsg:"Input error",
}
export const ERROR="error";
export const SUCCESS="success";
export const INPUT_ERROR="INPUT_ERROR";
export const alertReducer=(state:any,action:any)=>{
    switch (action.type){
        case ERROR:{
            return{
                error:true,
                alertMsg:"Server error"
            }
        }
        case SUCCESS:{
            return{
                error: false,
                alertMsg: "Employee registered"
            }
        }
        case INPUT_ERROR:{
            return INITIAL_STATE
        }
        default:{
            return state;
        }
    }
}