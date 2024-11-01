export default interface Food{
  title:string,
  amount:number,
  key?:string,
}
export interface FoodProvider{
  [key:string]:Food[],
}