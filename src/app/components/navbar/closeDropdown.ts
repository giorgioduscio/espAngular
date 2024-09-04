export function closeDropdown(htmlClass:string){
  // QUANDO SI CLICCA SULLA PAGINA, IL DROPDOWN SI CHIUDE, ALTRIMENTI HA UN COMPORTAMENTO NORMALE
  document.addEventListener('click', (e:Event)=>{
    const element =(e.target as HTMLInputElement).parentElement
    element?.className===htmlClass
    ? ""//console.log("classe dropdown", element.parentElement)
    : document.querySelector(`details.${htmlClass}`)?.removeAttribute("open")
  })
}