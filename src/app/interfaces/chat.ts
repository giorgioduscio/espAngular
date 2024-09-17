export interface Chat {
    idChat :number,
    titleChat :string,
    messages :Message[],
    key? :string,
    imageUrl :string,
}
export interface chatEditMode{
    editActivation :boolean,
    idGroups :string[],
}

export interface Message{
    IDmessage :number,
    message :string,
    IDuser :number,
    username :string,
    time :string,
}
