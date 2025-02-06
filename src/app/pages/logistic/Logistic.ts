export default interface LogisticElement{
  title:string,
  amount:number,
  key?:string,
}
export interface FoodProvider{
  [key:string]:LogisticElement[],
}