export default function duckcase(phrase:string) {
  if(!DuckcaseManager.styleInjected) DuckcaseManager.injectStyle();
  return DuckcaseManager.apply(phrase);
}

const DuckcaseManager ={
  apply(phrase:string){
    // underscore
    if (phrase.includes('_')) return phrase[0].toUpperCase() +phrase.slice(1) .replaceAll('_',' ')
        
    // camelcase
    else if (!phrase.includes(' ')){
      const spaces = phrase.replace(/([A-Z])/g, ' $1').toLowerCase()
      const primaMaiuscola = spaces.charAt(0).toUpperCase() + spaces.slice(1)
      return primaMaiuscola

    } else if (typeof phrase =='string'){
      return phrase[0].toUpperCase() +phrase.slice(1)

    } else {
      console.error('Stringa non valida', phrase);
      return phrase
    }
  },
  styleInjected:false,
  injectStyle(){
    /* prima lettera maiuscola */
    const style = document.createElement('style');
    style.textContent = `
      .duckcase::first-letter {
        text-transform: uppercase !important;
      }
    `;
    document.head.appendChild(style);
    this.styleInjected = true;
  }
}