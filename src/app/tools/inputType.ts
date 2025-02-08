export default function inputType(value:number |string |boolean, name=''){
  let result ='text' 
    // console.log(value);
    
    // TODO IN BASE AL VALORE DEL CAMPO
    // DATA: stringa di 10 caratteri, 8 numerici e due '-'
    if( typeof value==='string' && value.length ===10){
      let dashs =value.split('-')  .filter(str=>!isNaN(Number(str)))
      let slashs =value.split('/') .filter(str=>!isNaN(Number(str)))
      if(dashs.length===3 || slashs.length===3) result ='date'
  
    // numero
    }else if(typeof value==='number') result='number'
    // booleano
    else if(typeof value==='boolean') result='checkbox'
  
    
    // TODO IN BASE AL NOME DEL CAMPO
    name.toLowerCase()
    if(name.includes('password')) result ='password'
    else if(name.includes('email')) result ='email'
  
  return result
}