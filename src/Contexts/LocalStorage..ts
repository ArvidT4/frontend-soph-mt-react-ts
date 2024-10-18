export const setLocal=(keyName:string,object:any)=>{
    localStorage.setItem(keyName,JSON.stringify(object));
}

export const getLocal=(keyName:string)=>{
    const item:string|null = localStorage.getItem(keyName)
    if(item){
        return JSON.parse(item);
    }
}
export const removeLocal=(keyName:string)=>{
    localStorage.removeItem(keyName);
}