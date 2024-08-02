export interface User {
    id :number, 
    username :string,
    email :string,
    role :SelectRole,
    imageUrl :string,
    token? :string,
}

export enum SelectRole{
    ADMIN, 
    WRITER,
    USER,
}