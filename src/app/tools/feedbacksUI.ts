type ToastColor = "primary" | "secondary" | "danger" | "success";

// Funzione di utilità per mantenere la sintassi originale
export function toast(message: string, color?: ToastColor): void {
  ToastManager.getInstance().show(message, color);
}

class ToastManager {
  private static instance: ToastManager;
  private toastPool: HTMLElement[] = [];
  private readonly MAX_POOL_SIZE = 5;
  private styleInjected = false;
  private colors = {
    primary: '#007bff',
    secondary: '#6c757d',
    danger: '#dc3545',
    success: '#28a745',
  };

  // Costruttore privato per singleton
  private constructor() {}

  // Metodo per ottenere l'istanza singleton
  public static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  // Recupera un elemento dal pool o ne crea uno nuovo
  private getToastElement(): HTMLElement {
    return this.toastPool.pop() || document.createElement('div');
  }

  // Rilascia un elemento nel pool
  private releaseToastElement(el: HTMLElement): void {
    if (this.toastPool.length < this.MAX_POOL_SIZE) {
      el.className = 'toast-notification';
      this.toastPool.push(el);
    }
  }

  // Inietta lo stile CSS se non già fatto
  private injectStyle(): void {
    if (!this.styleInjected) {
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
          background-color: ${this.colors.secondary};
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
      this.styleInjected = true;
    }
  }

  // Mostra un toast
  public show(message: string, color: ToastColor = "secondary"): void {
    this.injectStyle();

    const notificaEl = this.getToastElement();
    notificaEl.className = 'toast-notification';
    notificaEl.style.backgroundColor = this.colors[color];
    notificaEl.textContent = message;

    document.body.appendChild(notificaEl);

    requestAnimationFrame(() => {
      setTimeout(() => {
        notificaEl.classList.add('fade-out');
        setTimeout(() => {
          if (notificaEl.parentNode) {
            document.body.removeChild(notificaEl);
          }
          this.releaseToastElement(notificaEl);
        }, 300);
      }, 1000);
    });
  }
}


//  funzione che imita confirm()
export function agree(message:string, 
  messaggioPulsante='Invio', 
  colorePulsante: "primary" |"success" |"danger" ="primary") {
  return new Promise((resolve) => {

    //  STILE
    const colori = {
      primary: '#007bff',
      success: '#28a745',
      danger: '#dc3545'
    }
    if (!document.getElementById("agree-modal-style")) {
      const style = document.createElement("style");
      style.id = "agree-modal-style";
      style.textContent = `
        .agree-modal {
          display: flex;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          justify-content: center;
          padding-top: 50px; /* Imposta 50px di distanza dal bordo superiore */
          z-index: 10000;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0s 0.3s;
        }
        .agree-modal.visible {
          opacity: 1;
          visibility: visible;
          transition-delay: 0s;
        }
        .agree-modal-content {
          background-color: #2c2c2c;
          color: #f1f1f1;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          max-width: 400px;
          height: max-content;
          text-align: center;
        }
        .agree-modal-message {
          margin: 0 0 20px 0;
        }
        .agree-modal-buttons {
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        .agree-modal-ok {
          background-color: ${colori[colorePulsante]};
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
        }
        .agree-modal-cancel {
          background-color: #6c757d;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
        }
        .agree-modal-buttons button:active {
          filter: brightness(85%);
        }
      `;
      document.head.appendChild(style);
    }

    //  HTML
    // Aggiungi il modale al body
    document.body.insertAdjacentHTML("beforeend", `
      <div class="agree-modal" id="agree-modal">
        <div class="agree-modal-content">
          <p class="agree-modal-message">${message}</p>
          <div class="agree-modal-buttons">
            <button class="agree-modal-ok" id="agree-ok">${messaggioPulsante}</button>
            <button class="agree-modal-cancel" id="agree-cancel">Annulla</button>
          </div>
        </div>
      </div>
    `);

    //  LOGICA
    const modal = document.getElementById("agree-modal");
    const okButton = document.getElementById("agree-ok");
    const cancelButton = document.getElementById("agree-cancel");
    if(!modal || !okButton || !cancelButton) 
      return console.error('elementi non trovati', modal, okButton, cancelButton);

    // Mostra il modale con animazione fade-in
    setTimeout(() => {
      modal.classList.add("visible");
    }, 10);

    // Funzione per rimuovere il modale con animazione fade-out
    const cleanup = () => {
      modal.classList.remove("visible");
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 300); // Tempo uguale alla durata della transizione CSS
    };

    // Gestione dei clic
    okButton.onclick = () => {
      cleanup();
      resolve(true);
    };

    cancelButton.onclick = () => {
      cleanup();
      resolve(false);
    };
  });
}


/**
# MODULO POPOVER - GESTIONE DI POPOVER DINAMICI PER ELEMENTI HTML
Questo modulo fornisce un'implementazione leggera e modulare per la creazione
e gestione di popover dinamici, attivati tramite l'attributo `data-popover`.

CARATTERISTICHE PRINCIPALI:
- Supporto per i trigger `focus` (mostra/nasconde al focus/blur) e `click` (mostra/nasconde al click).
- Animazioni fluide con CSS transitions.
- Gestione automatica della pulizia del DOM.
- Riutilizzo dei popover per evitare duplicazioni.
- Iniezione automatica degli stili CSS.
- Supporto per attributi ARIA per l'accessibilità.
- Supporto per formati flessibili: `click>description` o `click>title>description`.

FORMATO DELL'ATTRIBUTO `data-popover`:
  - `focus>Titolo>Messaggio` (per il trigger focus)
  - `click>Messaggio` o `click>Titolo>Messaggio` (per il trigger click)

Esempio:
  <input data-popover="focus>Titolo>Messaggio dettagliato">
  <button data-popover="click>Solo messaggio">Clicca</button>
  <button data-popover="click>Titolo>Messaggio dettagliato">Clicca</button>

METODI DISPONIBILI:
- injectStyle(): Inietta gli stili CSS necessari.
- createPopover(): Crea un elemento popover.
- positionPopover(): Posiziona il popover vicino all'elemento target.
- hidePopover(): Nasconde il popover con animazione.
- initFocusPopovers(): Inizializza i listener per il trigger `focus`.
- initClickPopovers(): Inizializza i listener per il trigger `click`.
- initCleanup(): Pulisce i popover quando gli elementi vengono rimossi.
*/

export function popovers_init() {
  Popover.injectStyle();
  Popover.initFocusPopovers();
  Popover.initClickPopovers();
  Popover.initCleanup();
}

const Popover = {
  // Inietta gli stili CSS necessari
  injectStyle: (): void => {
    const style = document.createElement('style');
    style.textContent = `
      .popover {
        padding: 6px 12px;
        z-index: 100;
        max-width: 200px;
        display: none;
        opacity: 0;
        
        background: linear-gradient(0deg, #333, #555);
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        position: absolute;
        transform: translateY(-5px);
        transition: opacity 0.2s ease, transform 0.2s ease;
      }
      .popover.visible {
        opacity: 1;
        transform: translateY(0);
      }
      .popover-header {
        padding: 0;
        color: #fff !important;
        background: transparent !important;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .popover-body {
        padding: 0;
        color: #fff !important;
        font-size: 14px;
      }
    `;
    document.head.appendChild(style);
  },

  // Crea un elemento popover con titolo e messaggio
  createPopover: (title: string | null, message: string): HTMLElement => {
    const popover = document.createElement('div');
    popover.className = 'popover';
    popover.setAttribute('role', 'dialog');
    popover.setAttribute('aria-live', 'polite');

    let headerHTML = '';
    let headerId = '';
    if (title) {
      headerId = `popover-header-${Math.random().toString(36).substr(2, 5)}`;
      headerHTML = `<div id="${headerId}" class="popover-header">${title}</div>`;
    }

    const bodyId = `popover-body-${Math.random().toString(36).substr(2, 5)}`;
    popover.innerHTML = `
      ${headerHTML}
      <div id="${bodyId}" class="popover-body">${message}</div>
    `;

    if (title) {
      popover.setAttribute('aria-labelledby', headerId);
    }
    popover.setAttribute('aria-describedby', bodyId);

    return popover;
  },

  // Posiziona il popover vicino all'elemento target
  positionPopover: (popover: HTMLElement, target: HTMLElement): void => {
    const rect = target.getBoundingClientRect();
    popover.style.left = `${rect.left + window.scrollX}px`;
    popover.style.top = `${rect.bottom + window.scrollY + 5}px`;
    popover.style.display = 'block';
    target.setAttribute('aria-expanded', 'true');
    target.setAttribute('aria-controls', popover.id);
    setTimeout(() => popover.classList.add('visible'), 10);
  },

  // Nasconde il popover con un'animazione fluida
  hidePopover: (popover: HTMLElement): void => {
    const targetElement = document.querySelector(`[aria-controls="${popover.id}"]`) as HTMLElement;
    if (targetElement) {
      targetElement.setAttribute('aria-expanded', 'false');
    }
    popover.classList.remove('visible');
    setTimeout(() => {
      popover.style.display = 'none';
    }, 200);
  },

  // Inizializza i listener per gestire i popover attivati dal focus
  initFocusPopovers: (): void => {
    document.addEventListener('focusin', (e) => {
      const target = e.target as HTMLElement;
      const popoverData = target.getAttribute('data-popover');

      if (popoverData?.startsWith('focus>')) {
        const parts = popoverData.split('>');
        if (parts.length < 2) {
          console.error('Formato data-popover non valido. Usa: focus>Titolo>Messaggio o focus>Messaggio');
          return;
        }

        let title = null;
        let message = '';
        if (parts.length === 2) {
          message = parts[1];
        } else if (parts.length >= 3) {
          title = parts[1];
          message = parts[2];
        }

        let popoverId = target.dataset['popoverId'];
        let popover: HTMLElement | null = null;

        if (popoverId) {
          popover = document.getElementById(popoverId);
        } else {
          popover = Popover.createPopover(title, message);
          popoverId = `popover-${Math.random().toString(36).substr(2, 9)}`;
          popover.id = popoverId;
          target.dataset['popoverId'] = popoverId;
          document.body.appendChild(popover);
        }

        if (popover) {
          Popover.positionPopover(popover, target);
        }
      }
    });

    document.addEventListener('focusout', (e) => {
      const target = e.target as HTMLElement;
      const popoverId = target.dataset['popoverId'];
      if (popoverId) {
        const popover = document.getElementById(popoverId);
        if (popover) {
          Popover.hidePopover(popover);
        }
      }
    });
  },

  // Inizializza i listener per gestire i popover attivati dal click
  initClickPopovers: (): void => {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const popoverData = target.getAttribute('data-popover');

      if (popoverData?.startsWith('click>')) {
        const parts = popoverData.split('>');
        if (parts.length < 2) {
          console.error('Formato data-popover non valido. Usa: click>Messaggio o click>Titolo>Messaggio');
          return;
        }

        let title = null;
        let message = '';
        if (parts.length === 2) {
          message = parts[1];
        } else if (parts.length >= 3) {
          title = parts[1];
          message = parts[2];
        }

        let popoverId = target.dataset['popoverId'];
        let popover: HTMLElement | null = null;

        if (popoverId) {
          popover = document.getElementById(popoverId);
        } else {
          popover = Popover.createPopover(title, message);
          popoverId = `popover-${Math.random().toString(36).substr(2, 9)}`;
          popover.id = popoverId;
          target.dataset['popoverId'] = popoverId;
          document.body.appendChild(popover);
        }

        if (popover) {
          Popover.positionPopover(popover, target);
          setTimeout(() => Popover.hidePopover(popover), 2000);
        }
      }
    });
  },

  // Inizializza un MutationObserver per pulire i popover quando gli elementi vengono rimossi
  initCleanup: (): void => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.removedNodes.forEach((node) => {
          if (node instanceof HTMLElement && node.dataset['popoverId']) {
            const popover = document.getElementById(node.dataset['popoverId']);
            popover?.remove();
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  },
};

