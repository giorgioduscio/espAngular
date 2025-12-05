// Pool di elementi riutilizzabili
const toastPool :any[] =[]; // Array che funge da pool per gli elementi toast
const MAX_POOL_SIZE = 5; // Dimensione massima del pool per limitare gli elementi riutilizzati

/**
 * Recupera un elemento toast dal pool o ne crea uno nuovo se il pool è vuoto.
 * @returns {HTMLElement} Un elemento HTML div da utilizzare come toast.
 */
function getToastElement(): HTMLElement {
  // Se il pool non è vuoto, restituisce l'ultimo elemento aggiunto (LIFO)
  // Altrimenti, crea un nuovo elemento div
  return toastPool.pop() || document.createElement('div');
}

/**
 * Rilascia un elemento toast nel pool per il riutilizzo futuro, se la dimensione massima del pool non è stata raggiunta.
 * @param {HTMLElement} el L'elemento toast da rilasciare.
 */
function releaseToastElement(el:HTMLElement) {
  // Controlla se la dimensione attuale del pool è inferiore al massimo consentito
  if (toastPool.length < MAX_POOL_SIZE) {
    el.className = 'toast-notification'; // Resetta la classe dell'elemento prima di rilasciarlo
    toastPool.push(el); // Aggiunge l'elemento al pool
  }
}

let styleInjected = false;
export default function toast(message:string, 
                        color: "primary"|"secondary"|"danger"|"success" ="secondary") {
  //  STILE
  const colors = {
    primary: '#007bff',
    secondary: '#6c757d',
    danger: '#dc3545',
    success: '#28a745'
  };
  if (!styleInjected) {
    const style = document.createElement('style');
    style.textContent = `
      .toast-notification {
        padding: 15px 20px;
        margin: 0 auto;
        position: fixed;
        top: 20px;
        left: 50%; 
        transform: translateX(-50%); 
        max-width: 500px; 
        z-index: 9999;

        transition: opacity 0.3s ease;
        opacity: 1;
        white-space: nowrap;

        background-color: ${colors.secondary};
        color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        font-size: 14px;
      }
      .toast-notification.fade-out {
        opacity: 0;
      }
    `;
    document.head.appendChild(style);
    styleInjected = true;
  }

  //  LOGICA
  // Riutilizza o crea elemento
  const notificaEl = getToastElement();
  notificaEl.className = 'toast-notification';
  notificaEl.style.backgroundColor =colors[color];
  notificaEl.textContent = message;
  
  // Aggiunge al body
  document.body.appendChild(notificaEl);
  
  // Usa requestAnimationFrame per migliori performance
  requestAnimationFrame(() => {
    // Nascondi dopo 1 secondo con fade out
    setTimeout(() => {
      notificaEl.classList.add('fade-out');
      
      // Rimuovi dal DOM dopo l'animazione
      setTimeout(() => {
        if (notificaEl.parentNode) {
          document.body.removeChild(notificaEl);
        }
        releaseToastElement(notificaEl);
      }, 300);
    }, 1000);
  });
}