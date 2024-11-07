import { List } from "flowbite-react";

export interface IUser{
    email: string;
    password:string;
}
export interface IToken{
    token: string;
    role: string;
}
export interface IDecodedToken{
    sub:string,
    iat:number,
    exp:number
}
export interface IProperty{
    id:string;
    address:string;
    description:string;
    city:string;
    postCode:string;
    state:string;
    collectingId:string;
    //List<RequestGather> workRequests;
}
export interface IRequest{
    id:string;
    comment:string;
    startingDate:string;
    deadlineDate:string;
    workerEmail:string;
    archived:boolean;
    accepted:boolean;
    freeAgent:boolean;
}
export interface IResponse{
    res:string;
    properties:IProperty[];
}