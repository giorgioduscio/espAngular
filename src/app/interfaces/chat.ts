export interface Chat {
  idChat :number
  titleChat :string
  imageUrl :string
  key? :string

  usersId :number[]
  messages :Message[]
}
export interface chatEditMode{
  editActivation :boolean
  idGroups :string[]
}

export interface Message{
  IDmessage :number
  message :string
  IDuser :number
  username :string
  time :string
}
