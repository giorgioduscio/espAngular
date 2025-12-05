export default function agree(message:string, 
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
