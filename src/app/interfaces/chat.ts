export interface Chat {
    idChat :number,
    titleChat :string,
    content :Message[],
    idFirebase? :string,
    imageUrl :string,
}

export interface Message{
    IDmessage :number,
    message :string,
    IDuser :number,
    username :string,
}
