export interface User{
    id:number,
    email:string,
    username:string,
    password:string,
    
    imageUrl:string,
    role:number,
    key?:string,
}

export enum SelectRole{
    ADMIN, 
    WRITER,
    USER,
}