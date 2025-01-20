
export const INITIAL_STATE={
    top:"top",
    center:"center",
    bot:"bot"
}
export const CLICKED="CLICKED";
export const DUR_CLICKED="DUR_CLICKED";
export const UN_CLICKED="UN_CLICKED";

export const burgerReducer=(state:any,action:any)=>{
   switch(action.type){
       case CLICKED:{
           return{
               top:"durTop",
               center:"durCenter",
               bot:"durBot",
           }
       }
       case DUR_CLICKED:{
           return{
               top:"lineTop",
               center:"lineCenter",
               bot:"lineBot",
           }
       }
       case UN_CLICKED:{
           return {
               top:"top",
               center:"center",
               bot:"bot"
           }
       }
       default: return INITIAL_STATE
   }
}
export const burgerTwoAniReducer=(state:any,action:any)=>{
    return action.payload
}
