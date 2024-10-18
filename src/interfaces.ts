export interface IUser{
    email: string;
    password:string;
}
export interface IToken{
    token: string;
}
export interface IProperty{
    Id:string;
    address:string;
    description:string;
    city:string;
    postCode:number;
    state:string;
    collectingId:string;
    //List<RequestGather> workRequests;
}