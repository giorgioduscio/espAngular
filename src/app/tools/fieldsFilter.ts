export default function fieldsFilter<T extends object>(fields: T, filter:string){
  let result =false
  Object.values(fields)
    // i valori devono essere solo stringhe e numeri
    .filter(value=>typeof value==='string' || typeof value==='number')

    // trasforma i numeri in tringhe
    .map(value=>typeof value==='number' ?value.toString() :value)
    
    // mostra solo se il filtro è vuoto o un valore include il filtro
    .some(value=>{
      if( value==='' || value.toLowerCase().includes( filter )) result =true
    })
  return result
}