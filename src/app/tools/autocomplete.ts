/*
  Autocomplete (modulo minimale e indipendente)
  Funzionalità implementate:
  - Filtra opzioni in base al valore degli input (case-insensitive)
  - Attributo `chars="N"`: mostra la lista solo se input.value.length >= N
  - Attributo `options="N"`: limita il numero di opzioni mostrate
  - Attributo `required`: se il valore non corrisponde a una <li>, viene svuotato su blur o Enter
  - Non ricarica la pagina su Invio
  - Posizionamento intelligente (con portal se necessario)
  - Accessibilità ARIA completa

  <template autocomplete="nome" chars="3" options="3" required>
    <li>Opzione 1</li>
    <li>Opzione 2</li>
    <li>Opzione 3</li>
  </template>
*/

interface PortalInfo {
  parent: HTMLElement;
  placeholder: Comment;
}

interface ContentMeasurement {
  content: number;
}

type DebouncedFunction<T extends (...args: any[]) => void> = T & {
  cancel?: () => void;
};

export class Autocomplete {
  // --- PRIVATE FIELDS ---
  /** Flag per evitare l'inizializzazione multipla */
  private _bound = false;
  /** Mappa Weak per gestire i portal */
  private readonly _portal = new WeakMap<HTMLUListElement, PortalInfo>();
  /** Cache per i template clonati */
  private readonly _templateCache = new Map<string, DocumentFragment>();
  /** Mappa per gli indici attivi */
  private readonly _activeIndices = new WeakMap<HTMLUListElement, number>();
  /** Timer per il debounce */
  private _focusoutTimeout: ReturnType<typeof setTimeout> | null = null;
  /** Costante per il ritardo nel focusout */
  public readonly FOCUSOUT_DELAY = 120;
  /** Handler debouncizzato per handleChange */
  private _debouncedHandleChange!: DebouncedFunction<(e: InputEvent) => void>;

  // --- CONSTRUCTOR ---
  //  Inizializza il componente Autocomplete
  constructor() {
    if (this._bound) return;
    this._bound = true;
    this.getStyle();

    // Applica il debounce a handleChange
    this._debouncedHandleChange = this._debounce(
      this._handleChangeInternal.bind(this),
      150
    );

    // Delegated events
    document.addEventListener('input', (e: Event) => {
      const target = e.target;
      if (
        target instanceof HTMLInputElement &&
        target.type === 'search' &&
        target.hasAttribute('name')
      ) {
        this._debouncedHandleChange(e as InputEvent);
      }
    });

    document.addEventListener('focusin', this.handleFocusin.bind(this));
    document.addEventListener('focusout', this.handleFocusout.bind(this));
    document.addEventListener('mousedown', this.handleMousedown.bind(this));
    document.addEventListener('keydown', this.handleKeydown.bind(this));

    // Riposiziona su scroll/resize con throttle
    const reflowActive = (): void => {
      const active = document.activeElement;
      if (active instanceof HTMLInputElement && active.type === 'search') {
        const listMatch = this._listFor(active);
        if (listMatch) this.updateListGeometry(active, listMatch);
      }
    };

    const throttledReflow = this._throttle(reflowActive, 100);
    window.addEventListener('scroll', throttledReflow, { passive: true });
    window.addEventListener('resize', throttledReflow);
  }

  // --- DEBOUNCE E THROTTLE HELPERS ---
  /**
   * Funzione di debounce riutilizzabile
   * @param fn - Funzione da debouncizzare
   * @param delay - Ritardo in millisecondi
   * @returns Funzione debouncizzata
   */
  private _debounce<T extends (...args: any[]) => void>(
    fn: T,
    delay: number
  ): DebouncedFunction<T> {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const debounced = ((...args: Parameters<T>) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    }) as DebouncedFunction<T>;

    debounced.cancel = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };

    return debounced;
  }

  /**
   * Funzione di throttle riutilizzabile
   * @param fn - Funzione da throttlizzare
   * @param limit - Limite in millisecondi
   * @returns Funzione throttlizzata
   */
  private _throttle<T extends (...args: any[]) => void>(fn: T, limit: number): T {
    let inThrottle = false;
    return ((...args: Parameters<T>) => {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    }) as T;
  }

  // --- METODI PRIVATI ---
  /**
   * Genera la lista delle opzioni dal template
   * @param input - L'elemento input
   * @returns L'elemento lista generato o null
   */
  private _generateListFromTemplate(input: HTMLInputElement): HTMLUListElement | null {
    const templateName = input.getAttribute('name');
    if (!templateName) return null;

    let listMatch: HTMLUListElement;
    const nextEl = input.nextElementSibling;

    if (nextEl instanceof HTMLUListElement && nextEl.matches('ul[autocomplete]')) {
      listMatch = nextEl;
    } else {
      listMatch = document.createElement('ul');
      listMatch.setAttribute('autocomplete', templateName);
      listMatch.setAttribute('role', 'listbox');
      listMatch.setAttribute('aria-hidden', 'true');
      input.after(listMatch);
    }

    listMatch.innerHTML = '';
    this._ensureAria(input, listMatch);
    this.updateListGeometry(input, listMatch);
    this._observeListChanges(listMatch);

    return listMatch;
  }

  /**
   * Osserva le modifiche al DOM della lista
   * @param listMatch - L'elemento lista
   */
  private _observeListChanges(listMatch: HTMLUListElement): MutationObserver {
    const observer = new MutationObserver(() => {
      delete listMatch.dataset['measured'];
    });
    observer.observe(listMatch, { childList: true, subtree: true });
    return observer;
  }

  /**
   * Verifica se il valore dell'input corrisponde a un'opzione valida
   * @param input - L'elemento input
   * @param listMatch - L'elemento lista
   * @returns True se il valore è valido, false altrimenti
   */
  private _isValidOption(input: HTMLInputElement, listMatch: HTMLUListElement): boolean {
    const value = (input.value || '').trim().toLowerCase();
    if (!value) return false;

    const items = listMatch.querySelectorAll('li');
    return Array.from(items).some(
      (li) => (li.textContent || '').trim().toLowerCase() === value
    );
  }

  /**
   * Valida se l'input corrisponde a un'opzione valida nella lista
   * @param input - L'elemento input da validare
   * @param listMatch - L'elemento lista associato all'input
   * @returns True se l'input è valido, false altrimenti
   */
  private _validateRequiredInput(input: HTMLInputElement, listMatch: HTMLUListElement): boolean {
    const isValid = this._isValidOption(input, listMatch);
    if (!isValid) {
      input.value = '';
      input.dispatchEvent(new InputEvent('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));

      const live = this._getLive(input.id);
      live.textContent = 'Valore non valido. Campo svuotato.';
    }
    return isValid;
  }

  /**
   * Trova il contenitore dell'input e della lista
   * @param input - L'elemento input
   * @param listMatch - L'elemento lista
   * @returns L'elemento contenitore o null
   */
  private _container(input: HTMLInputElement, listMatch: HTMLUListElement): HTMLElement | null {
    const container = input.parentElement;
    if (!container || !container.contains(listMatch)) return null;

    const cs = getComputedStyle(container);
    if (cs.position === 'static') container.style.position = 'relative';

    return container;
  }

  /**
   * Determina se è necessario utilizzare un portal per la lista
   * @param container - L'elemento contenitore
   * @returns True se è necessario utilizzare un portal, false altrimenti
   */
  private _shouldPortal(container: HTMLElement | null): boolean {
    if (!container) return false;
    if (container === document.body || container === document.documentElement) return false;

    const cs = getComputedStyle(container);
    const ov = `${cs.overflow} ${cs.overflowY} ${cs.overflowX}`;
    return /(auto|scroll|hidden)/.test(ov);
  }

  /**
   * Sposta la lista nel portal
   * @param listMatch - L'elemento lista
   */
  private _toPortal(listMatch: HTMLUListElement): void {
    if (this._portal.has(listMatch)) return;

    const parent = listMatch.parentElement;
    if (!parent) return;

    const placeholder = document.createComment('ac-placeholder');
    parent.insertBefore(placeholder, listMatch);
    document.body.appendChild(listMatch);

    this._portal.set(listMatch, { parent, placeholder });
    listMatch.dataset['portal'] = '1';
  }

  /**
   * Rimuove la lista dal portal
   * @param listMatch - L'elemento lista
   */
  private _fromPortal(listMatch: HTMLUListElement): void {
    const info = this._portal.get(listMatch);
    if (!info) return;

    try {
      info.parent.insertBefore(listMatch, info.placeholder);
      info.placeholder.remove();
    } catch (error) {
      console.warn('[Autocomplete] Errore durante la rimozione dal portal', error);
    }

    this._portal.delete(listMatch);
    delete listMatch.dataset['portal'];
  }

  /**
   * Trova l'elemento lista associato a un input
   * @param input - L'elemento input
   * @returns L'elemento lista associato o null
   */
  private _listFor(input: HTMLInputElement): HTMLUListElement | null {
    const parentElement = input.parentElement;
    if (parentElement) {
      const local = parentElement.querySelector<HTMLUListElement>(
        `ul[autocomplete="${CSS.escape(input.name)}"]`
      );
      if (local) return local;
    }

    const id = input.id;
    if (id) {
      const byId = document.querySelector<HTMLUListElement>(
        `ul[autocomplete="${CSS.escape(input.name)}"][data-for="${CSS.escape(id)}"]`
      );
      if (byId) return byId;
    }

    return document.querySelector<HTMLUListElement>(
      `ul[autocomplete="${CSS.escape(input.name)}"]`
    );
  }

  /**
   * Misura il contenuto di un elemento lista
   * @param listMatch - L'elemento lista
   * @returns Oggetto con le proprietà content
   */
  private _measureContentHeight(listMatch: HTMLUListElement): ContentMeasurement {
    if (listMatch.dataset['measured'] === 'true') {
      return { content: parseInt(listMatch.dataset['measuredHeight'] || '0', 10) };
    }

    const prevD = listMatch.style.display;
    const prevV = listMatch.style.visibility;

    listMatch.style.visibility = 'hidden';
    listMatch.style.display = 'block';

    try {
      const content = listMatch.scrollHeight || 0;
      listMatch.dataset['measured'] = 'true';
      listMatch.dataset['measuredHeight'] = String(content);
      return { content };
    } catch (error) {
      console.warn('[Autocomplete] Errore durante la misurazione del contenuto', error);
      return { content: 0 };
    } finally {
      listMatch.style.visibility = prevV || '';
      listMatch.style.display = prevD || '';
    }
  }

  /**
   * Ottiene o crea l'elemento live region per l'accessibilità
   * @param inputId - L'ID dell'input
   * @returns L'elemento live region
   */
  private _getLive(inputId: string): HTMLDivElement {
    const liveId = `autocomplete-live-${inputId}`;
    let el = document.getElementById(liveId) as HTMLDivElement | null;

    if (!el) {
      el = document.createElement('div');
      el.id = liveId;
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      el.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        border: 0;
        padding: 0;
        clip: rect(0 0 0 0);
        overflow: hidden;
        white-space: nowrap;
      `;
      document.body.appendChild(el);
    }

    return el;
  }

  /**
   * Assicura che gli elementi della lista abbiano ID e ruoli ARIA appropriati
   * @param listMatch - L'elemento lista
   */
  private _ensureOptionIds(listMatch: HTMLUListElement): void {
    if (!listMatch.id) {
      listMatch.id = `ac-${Math.random().toString(36).slice(2, 8)}`;
    }

    const items = Array.from(listMatch.querySelectorAll<HTMLLIElement>('li'));
    items.forEach((li, i) => {
      if (!li.id) li.id = `${listMatch.id}-opt-${i}`;
      if (li.getAttribute('role') !== 'option') li.setAttribute('role', 'option');
      if (!li.hasAttribute('aria-selected')) li.setAttribute('aria-selected', 'false');
    });

    if (listMatch.getAttribute('role') !== 'listbox') {
      listMatch.setAttribute('role', 'listbox');
    }
  }

  /**
   * Assicura che gli attributi ARIA siano impostati correttamente
   * @param input - L'elemento input
   * @param listMatch - L'elemento lista
   */
  private _ensureAria(input: HTMLInputElement, listMatch: HTMLUListElement): void {
    this._ensureOptionIds(listMatch);

    if (!input.id) {
      input.id = `ac-input-${Math.random().toString(36).slice(2, 8)}`;
    }
    listMatch.dataset['for'] = input.id;

    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-haspopup', 'listbox');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-controls', listMatch.id);

    const expanded = listMatch.style.display !== 'none';
    input.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    listMatch.setAttribute('aria-hidden', expanded ? 'false' : 'true');
  }

  /**
   * Posiziona la lista rispetto all'input
   * @param input - L'elemento input
   * @param listMatch - L'elemento lista
   */
  private _place(input: HTMLInputElement, listMatch: HTMLUListElement): void {
    try {
      const container = this._container(input, listMatch);
      if (!container) return;

      const needPortal = this._shouldPortal(container);
      if (needPortal) this._toPortal(listMatch);
      else this._fromPortal(listMatch);

      const cr = needPortal ? { top: 0, left: 0 } : container.getBoundingClientRect();
      const ir = input.getBoundingClientRect();
      const left = Math.round(needPortal ? ir.left : ir.left - cr.left);
      const { content } = this._measureContentHeight(listMatch);
      const viewportH = window.innerHeight;
      const spaceBelow = Math.max(0, viewportH - ir.bottom);
      const spaceAbove = Math.max(0, ir.top);
      const gap = 2;
      const below = spaceBelow >= content || spaceBelow >= spaceAbove;

      listMatch.style.position = needPortal ? 'fixed' : 'absolute';
      listMatch.style.left = `${left}px`;
      listMatch.style.width = `${Math.round(ir.width)}px`;
      listMatch.style.zIndex = '1000';
      listMatch.dataset['position'] = below ? 'below' : 'above';

      if (below) {
        const top = needPortal
          ? Math.round(ir.bottom + gap)
          : Math.round(ir.bottom - cr.top + gap);
        listMatch.style.top = `${top}px`;
      } else {
        const top = needPortal
          ? Math.round(ir.top - gap - content)
          : Math.round(ir.top - cr.top - gap - content);
        listMatch.style.top = `${top}px`;
      }

      this._ensureAria(input, listMatch);
    } catch (error) {
      console.warn('[Autocomplete] Errore durante il posizionamento della lista', error);
    }
  }

  /**
   * Gestione interna dell'evento di cambiamento dell'input
   * @param e - L'evento di input
   */
  private _handleChangeInternal(e: InputEvent): void {
    // --- 1. Inizializzazione e validazione ---
    const input = e.target;
    // Interrompi se l'evento non proviene da un input di ricerca valido
    if (!(input instanceof HTMLInputElement) || input.type !== 'search') return;

    // Genera o ottieni l'elemento <ul> che conterrà i suggerimenti
    const listMatch = this._generateListFromTemplate(input);
    if (!listMatch) return;

    // Pulisci e normalizza il termine di ricerca dall'input
    const searchTerm = (input.value || '').trim().toLowerCase();
    // Ottieni il nome del template, che lega l'input alla sua lista di opzioni
    const templateName = input.getAttribute('name');
    if (!templateName) return;

    // --- 2. Gestione del template e della cache ---
    // Trova l'elemento <template> corrispondente nel DOM
    const templateMatch = document.querySelector<HTMLTemplateElement>(
      `template[autocomplete="${CSS.escape(templateName)}"]`
    );
    if (!templateMatch) return;

    // Controlla se il template è marcato come statico
    const isStatic = templateMatch.hasAttribute('data-static');
    let templateContent: DocumentFragment;

    // Se è statico, usa la cache per migliorare le prestazioni
    if (isStatic) {
      // Se non è in cache, clonane il contenuto e salvalo
      if (!this._templateCache.has(templateName)) {
        this._templateCache.set(templateName, document.importNode(templateMatch.content, true));
      }
      // Recupera il contenuto dalla cache
      templateContent = this._templateCache.get(templateName)!;
    } else {
      // Se è dinamico, clona sempre il contenuto fresco dal DOM per riflettere le modifiche
      templateContent = document.importNode(templateMatch.content, true);
    }

    // --- 3. Filtro delle opzioni ---
    // Leggi gli attributi di configurazione dal template
    const minChars = templateMatch.hasAttribute('chars')
      ? parseInt(templateMatch.getAttribute('chars') || '1', 10)
      : 1;

    // Nascondi la lista se l'utente non ha digitato abbastanza caratteri
    if (searchTerm.length < minChars) {
      listMatch.style.display = 'none';
      input.removeAttribute('aria-activedescendant');
      return;
    }

    const maxOptions = templateMatch.hasAttribute('options')
      ? parseInt(templateMatch.getAttribute('options') || 'Infinity', 10)
      : Infinity;

    // Filtra le opzioni (<li>) dal contenuto del template
    const allItems = Array.from(templateContent.querySelectorAll<HTMLLIElement>('li'));
    const matchedItems = allItems.filter((li) =>
      (li.textContent || '').toLowerCase().includes(searchTerm)
    );

    // Controlla se esiste una corrispondenza esatta, per decidere se mostrare la lista
    const hasExactMatch = allItems.some(
      (li) => (li.textContent || '').trim().toLowerCase() === searchTerm
    );

    // Limita il numero di opzioni da mostrare
    const optionsToShow = matchedItems.slice(0, maxOptions);

    // --- 4. Aggiornamento del DOM ---
    // Svuota la lista corrente e ripopolala con i risultati filtrati
    listMatch.innerHTML = '';
    if (optionsToShow.length > 0) {
      optionsToShow.forEach((li) => {
        const clonedLi = li.cloneNode(true) as HTMLLIElement;
        listMatch.appendChild(clonedLi);
      });
    } else if (searchTerm.length >= minChars) {
      // Mostra un messaggio se non ci sono risultati
      const noResultLi = document.createElement('li');
      noResultLi.textContent = 'Nessun risultato trovato';
      noResultLi.style.fontStyle = 'italic';
      noResultLi.setAttribute('aria-disabled', 'true');
      listMatch.appendChild(noResultLi);
    }

    // --- 5. Visualizzazione e accessibilità ---
    // Mostra la lista se ci sono risultati. Nascondila solo se c'è una corrispondenza esatta ed è l'unica opzione.
    listMatch.style.display =
      (listMatch.childElementCount > 0 && !hasExactMatch) ||
      (hasExactMatch && optionsToShow.length > 1)
        ? 'block'
        : 'none';
    // Riposiziona la lista rispetto all'input
    this.updateListGeometry(input, listMatch);
    // Assicura che gli attributi ARIA siano corretti
    this._ensureAria(input, listMatch);

    // Aggiorna la live region per screen reader, comunicando il numero di risultati
    const live = this._getLive(input.id);
    live.textContent =
      optionsToShow.length > 0
        ? `${optionsToShow.length} opzione(i) disponibili`
        : 'Nessun risultato trovato';
  }

  // --- METODI PUBBLICI ---
  /**
   * Aggiorna la geometria della lista
   * @param input - L'elemento input
   * @param listMatch - L'elemento lista
   */
  public updateListGeometry(input: HTMLInputElement, listMatch: HTMLUListElement): void {
    this._place(input, listMatch);
  }

  /**
   * Gestisce l'evento di cambiamento dell'input (wrapper pubblico)
   * @param e - L'evento di input
   */
  public handleChange(e: InputEvent): void {
    this._debouncedHandleChange(e);
  }

  /**
   * Gestisce l'evento focusin
   * @param e - L'evento focusin
   */
  public handleFocusin(e: FocusEvent): void {
    const input = e.target;
    if (input instanceof HTMLInputElement && input.type === 'search') {
      try {
        const listMatch = this._generateListFromTemplate(input);
        if (listMatch) {
          const needsAriaUpdate =
            !input.hasAttribute('role') ||
            !listMatch.hasAttribute('role') ||
            !input.id ||
            !listMatch.id;
          if (needsAriaUpdate) {
            this._ensureAria(input, listMatch);
          }
        }
      } catch (error) {
        console.warn('[Autocomplete] Errore durante la gestione del focusin', error);
      }
    }
  }

  /**
   * Gestisce l'evento focusout
   * @param e - L'evento focusout
   */
  public handleFocusout(e: FocusEvent): void {
    const input = e.target;

    if (this._focusoutTimeout) {
      clearTimeout(this._focusoutTimeout);
    }

    const listMatch =
      input instanceof HTMLInputElement ? this._listFor(input) : null;

    this._focusoutTimeout = setTimeout(() => {
      const active = document.activeElement;
      const stillInside =
        active &&
        (active === input || (listMatch && listMatch.contains(active)));

      if (!stillInside && listMatch && input instanceof HTMLInputElement) {
        if (listMatch.hasAttribute('required')) {
          this._validateRequiredInput(input, listMatch);
        }

        if (listMatch.style.display !== 'none') {
          listMatch.style.display = 'none';
        }

        this._fromPortal(listMatch);
        input.setAttribute('aria-expanded', 'false');
        input.removeAttribute('aria-activedescendant');
        listMatch.setAttribute('aria-hidden', 'true');
      }

      this._focusoutTimeout = null;
    }, this.FOCUSOUT_DELAY);
  }

  /**
   * Gestisce l'evento mousedown
   * @param e - L'evento mousedown
   */
  public handleMousedown(e: MouseEvent): void {
    try {
      const target = e.target;
      if (target instanceof HTMLElement && target.closest('ul[autocomplete]')) {
        this.handleClick(e);
      }
    } catch (error) {
      console.warn('[Autocomplete] Errore durante la gestione del mousedown', error);
    }
  }

  /**
   * Gestisce l'evento click su un elemento lista
   * @param e - L'evento click
   */
  public handleClick(e: MouseEvent): void {
    e.preventDefault?.();
    e.stopPropagation?.();

    const target = e.target;
    if (!(target instanceof HTMLElement)) return;

    const li = target.closest('li');
    if (!li || li.getAttribute('aria-disabled') === 'true') {
      return;
    }

    const listMatch = li.closest<HTMLUListElement>('ul[autocomplete]');
    if (!listMatch) return;

    const inputId = listMatch.dataset['for'];
    const input = inputId ? (document.getElementById(inputId) as HTMLInputElement | null) : null;

    if (!input) return;

    input.value = li.textContent || '';
    input.focus();

    try {
      const len = input.value.length;
      input.setSelectionRange?.(len, len);
    } catch (error) {
      console.warn('[Autocomplete] Impossibile impostare la selezione nel campo di input', error);
    }

    input.dispatchEvent(new InputEvent('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    li.dispatchEvent(new Event('click', { bubbles: true }));
    input.dispatchEvent(new Event('click', { bubbles: true }));

    const listItems = listMatch.querySelectorAll('li');
    Array.from(listItems).forEach((n) =>
      n.setAttribute('aria-selected', n === li ? 'true' : 'false')
    );

    this._ensureAria(input, listMatch);
    if (li.id) input.setAttribute('aria-activedescendant', li.id);

    listMatch.style.display = 'none';
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    listMatch.setAttribute('aria-hidden', 'true');

    this._fromPortal(listMatch);

    try {
      const live = this._getLive(input.id);
      live.textContent = `Selezionato: ${li.textContent?.trim() || ''}`;
    } catch (error) {
      console.warn('[Autocomplete] Impossibile aggiornare il contenuto della regione live', error);
    }
  }

  /**
   * Gestisce l'evento keydown
   * @param e - L'evento keydown
   */
  public handleKeydown(e: KeyboardEvent): void {
    try {
      const input = e.target;
      if (!(input instanceof HTMLInputElement) || input.type !== 'search') return;

      const listMatch = this._listFor(input);
      if (!listMatch) return;

      const isOpen = listMatch.style.display !== 'none';
      const items = this.visibleItems(listMatch).filter(
        (li): li is HTMLLIElement => li.getAttribute('aria-disabled') !== 'true'
      );
      const n = items.length;
      let current = this._activeIndices.get(listMatch) ?? -1;

      // Arrow keys
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!isOpen && n > 0) {
          listMatch.style.display = 'block';
          this.updateListGeometry(input, listMatch);
        }

        const next = e.key === 'ArrowDown'
          ? (current + 1) % n
          : current <= 0
          ? n - 1
          : current - 1;

        this.setActive(listMatch, items, next);
      }
      // Enter
      else if (e.key === 'Enter') {
        if (current >= 0 && isOpen) {
          e.preventDefault();
          const li = items[current];
          if (li) {
            this.handleClick({
              preventDefault: () => {},
              stopPropagation: () => {},
              target: li,
            } as unknown as MouseEvent);
          }
        }
        // Validazione required se nessuna voce selezionata
        else if (listMatch.hasAttribute('required')) {
          e.preventDefault();
          this._validateRequiredInput(input, listMatch);
        }
      }
      // Escape
      else if (e.key === 'Escape') {
        e.preventDefault();
        listMatch.style.display = 'none';
        input.setAttribute('aria-expanded', 'false');
        input.removeAttribute('aria-activedescendant');
        listMatch.setAttribute('aria-hidden', 'true');
      }
    } catch (error) {
      console.warn('[Autocomplete] Errore durante la gestione del keydown', error);
    }
  }

  /**
   * Imposta l'elemento attivo nella lista
   * @param listMatch - L'elemento lista
   * @param items - Gli elementi della lista
   * @param index - L'indice dell'elemento attivo
   */
  public setActive(
    listMatch: HTMLUListElement,
    items: HTMLLIElement[],
    index: number
  ): void {
    this._activeIndices.set(listMatch, index);

    items.forEach((li, i) => {
      li.classList.toggle('active', i === index);
      li.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });

    listMatch.dataset['activeIndex'] = String(index);

    const inputId = listMatch.dataset['for'];
    const input = inputId
      ? (document.getElementById(inputId) as HTMLInputElement | null)
      : null;

    if (input && items[index]) {
      this._ensureAria(input, listMatch);
      input.setAttribute('aria-activedescendant', items[index].id || '');
    }
  }

  /**
   * Ritorna gli elementi visibili della lista
   * @param listMatch - L'elemento lista
   * @returns Array di elementi HTMLLIElement visibili
   */
  public visibleItems(listMatch: HTMLUListElement): HTMLLIElement[] {
    return Array.from(listMatch.querySelectorAll<HTMLLIElement>('li'));
  }

  /**
   * Inietta gli stili CSS necessari
   */
  public getStyle(): void {
    if (document.querySelector('style[data-autocomplete-style]')) return;

    const style = document.createElement('style');
    style.dataset['autocompleteStyle'] = 'true';
    style.textContent = `
    ul[autocomplete] {
      position: absolute;
      z-index: 1055;
      list-style: none;
      margin: 0;
      padding: .25rem 0;
      background-color: var(--bs-body-bg);
      border: 1px solid var(--bs-border-color);
      border-radius: var(--bs-border-radius);
      box-shadow: var(--bs-box-shadow, 0 .5rem 1rem rgba(0,0,0,.15));
      width: 100%;
      left: 0;
      display: none;
    }
    ul[autocomplete][data-portal="1"] { position: fixed; }
    ul[autocomplete][data-position="below"] { top: auto; }
    ul[autocomplete][data-position="above"] { bottom: auto; }
    ul[autocomplete][data-position="above"] {
      border-bottom-left-radius: var(--bs-border-radius);
      border-bottom-right-radius: var(--bs-border-radius);
    }
    ul[autocomplete][data-position="below"] {
      border-top-left-radius: var(--bs-border-radius);
      border-top-right-radius: var(--bs-border-radius);
    }
    ul[autocomplete] > li {
      padding: .375rem .75rem;
      cursor: pointer;
      color: var(--bs-body-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    ul[autocomplete] > li:hover,
    ul[autocomplete] > li.active {
      background-color: var(--bs-dropdown-link-hover-bg, rgba(0,0,0,.05));
      color: var(--bs-primary-text-emphasis, var(--bs-primary));
    }
    ul[autocomplete] > li[aria-disabled="true"] {
      cursor: not-allowed;
    }
    ul[autocomplete] > li[aria-disabled="true"]:hover {
      background-color: transparent;
      color: var(--bs-body-color);
    }
    ul[autocomplete] > li.active {
      border: 2px solid black;
      color: #888;
      font-weight: bold;
    }
    `;
    document.head.appendChild(style);
  }

  /**
   * Pulisce le risorse utilizzate dal componente
   */
  public destroy(): void {
    // Cancella il debounce handler
    this._debouncedHandleChange.cancel?.();

    // Pulisci timeout
    if (this._focusoutTimeout) {
      clearTimeout(this._focusoutTimeout);
      this._focusoutTimeout = null;
    }

    // Pulisci cache
    this._templateCache.clear();

    // Nota: Gli event listener delegati su document non vengono rimossi
    // perché richiederebbero riferimenti alle funzioni originali.
    // Per una pulizia completa, considera l'uso di AbortController.
  }
}



/**
AutocompleteInline - Classe per suggerimenti automatici in input HTML

Questa classe implementa una funzionalità di autocompletamento in tempo reale
per campi di input HTML, mostrando il suggerimento direttamente all'interno
del campo di input stessa (sovrapposto in grigio) senza richiedere wrapper
aggiuntivi o markup speciale.

CARATTERISTICHE PRINCIPALI:
- Non richiede alcun wrapper HTML aggiuntivo
- Il suggerimento appare direttamente nell'input come testo grigio
- Supporta l'attributo data-char per impostare il numero minimo di caratteri
- Completamento con il tasto TAB
- Posizionamento preciso basato sulle dimensioni reali dell'input
- Stile automaticamente adattato all'input corrispondente

ATTRIBUTI SUPPORTATI:
- data-autocomplete="opzione1,opzione2,opzione3"
  → Lista di opzioni separate da virgola per l'autocompletamento
- data-char="3" (opzionale)
  → Numero minimo di caratteri da digitare prima di mostrare suggerimenti
  → Se omesso, il default è 1 carattere

UTILIZZO:
1. Includi questa classe nel tuo file HTML o JS
2. Istanzia la classe una sola volta: new AutocompleteInline()
3. Aggiungi gli attributi data-autocomplete agli input desiderati

ESEMPI HTML:

<!-- Suggerimento dopo 1 carattere (default) -->
<input data-autocomplete="Roma,Milano,Napoli" placeholder="Città...">

<!-- Suggerimento dopo 3 caratteri -->
<input data-autocomplete="Apple,Android,iOS" data-char="3" placeholder="Sistema...">

COMPORTAMENTO:
- Mentre digiti, viene mostrata la parte rimanente del primo suggerimento
  che corrisponde al testo digitato (in grigio, sovrapposto)
- Premendo TAB, il suggerimento viene completato automaticamente
- Il suggerimento scompare quando l'input perde il focus
- Funziona con qualsiasi stile di input (padding, font, dimensioni, ecc.)

NOTE:
- La classe gestisce automaticamente l'iniezione degli stili CSS necessari
- Gli stili vengono iniettati una sola volta, anche se crei più istanze
- Non sono richieste dipendenze esterne (solo JavaScript vanilla)
 */
export class AutocompleteInline {
  static styleInjected = false;
  static activeSuggestions = new Map(); // input => suggestionSpan

  constructor() {
    if (!AutocompleteInline.styleInjected) {
      this.injectStyles();
      AutocompleteInline.styleInjected = true;
    }
    this.setupEventListeners();
  }

  injectStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .autocomplete-suggestion {
        position: absolute;
        color: #999;
        font: var(--autocomplete-font);
        font-size: var(--autocomplete-font-size);
        padding: var(--autocomplete-padding);
        line-height: var(--autocomplete-line-height);
        width: var(--autocomplete-width);
        height: var(--autocomplete-height);
        top: var(--autocomplete-top);
        left: var(--autocomplete-left);
        text-indent: var(--autocomplete-text-indent);
        pointer-events: none;
        user-select: none;
        white-space: pre;
        margin: 0;
        border: none;
        background: transparent;
        z-index: 1000;
        box-sizing: border-box;
      }
      .autocomplete-temp-measure {
        visibility: hidden;
        position: absolute;
        white-space: pre;
        font: var(--autocomplete-temp-font);
        font-size: var(--autocomplete-temp-font-size);
        padding-left: var(--autocomplete-temp-padding-left);
        padding-right: var(--autocomplete-temp-padding-right);
      }
    `;
    document.head.appendChild(style);
  }

  setupEventListeners() {
    document.addEventListener("input", this.handleInput);
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("focus", this.handleFocus, true);
    document.addEventListener("blur", this.handleBlur, true);
  }

  handleInput = (event:Event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || !input.dataset['autocomplete']) return;

    const options = input.dataset['autocomplete'].split(",");
    const minChars = parseInt(input.dataset['char'] || "1", 10) || 1;
    let suggestionSpan = AutocompleteInline.activeSuggestions.get(input);

    if (!suggestionSpan) {
      suggestionSpan = document.createElement("span");
      suggestionSpan.className = "autocomplete-suggestion";
      AutocompleteInline.activeSuggestions.set(input, suggestionSpan);
    }

    // Imposta lo stile per abbinare esattamente l'input
    const inputRect = input.getBoundingClientRect();
    const inputStyle = window.getComputedStyle(input);

    suggestionSpan.style.setProperty('--autocomplete-font', inputStyle.font);
    suggestionSpan.style.setProperty('--autocomplete-font-size', inputStyle.fontSize);
    suggestionSpan.style.setProperty('--autocomplete-padding', inputStyle.padding);
    suggestionSpan.style.setProperty('--autocomplete-line-height', inputStyle.lineHeight);
    suggestionSpan.style.setProperty('--autocomplete-width', `${inputRect.width}px`);
    suggestionSpan.style.setProperty('--autocomplete-height', `${inputRect.height}px`);

    const currentValue = input.value.trim();
    if (currentValue.length < minChars) {
      suggestionSpan.textContent = "";
      // Rimuovi anche le variabili di posizionamento quando non ci sono suggerimenti
      suggestionSpan.style.setProperty('--autocomplete-top', '0');
      suggestionSpan.style.setProperty('--autocomplete-left', '0');
      suggestionSpan.style.setProperty('--autocomplete-text-indent', '0');
      return;
    }

    const match = options.find(option =>
      option.toLowerCase().startsWith(currentValue.toLowerCase())
    );

    if (match) {
      const remaining = match.slice(currentValue.length);
      suggestionSpan.textContent = remaining;

      // Posiziona il suggerimento esattamente sopra l'input
      const inputRectFinal = input.getBoundingClientRect();
      suggestionSpan.style.setProperty('--autocomplete-top', `${inputRectFinal.top + window.scrollY}px`);
      suggestionSpan.style.setProperty('--autocomplete-left', `${inputRectFinal.left + window.scrollX}px`);

      // Posiziona il testo rimanente alla posizione del cursore
      const cursorPos = input.selectionStart || 0;
      const textBeforeCursor = input.value.substring(0, cursorPos);
      const tempSpan = document.createElement("span");
      tempSpan.className = "autocomplete-temp-measure";
      tempSpan.style.setProperty('--autocomplete-temp-font', inputStyle.font);
      tempSpan.style.setProperty('--autocomplete-temp-font-size', inputStyle.fontSize);
      tempSpan.style.setProperty('--autocomplete-temp-padding-left', inputStyle.paddingLeft);
      tempSpan.style.setProperty('--autocomplete-temp-padding-right', inputStyle.paddingRight);
      tempSpan.textContent = textBeforeCursor;
      document.body.appendChild(tempSpan);
      const offset = tempSpan.getBoundingClientRect().width;
      document.body.removeChild(tempSpan);
      suggestionSpan.style.setProperty('--autocomplete-text-indent', `${offset - parseFloat(inputStyle.paddingLeft)}px`);
    } else {
      suggestionSpan.textContent = "";
    }

    // Aggiungi al body se non presente
    if (!suggestionSpan.parentElement) {
      document.body.appendChild(suggestionSpan);
    }
  };

  handleKeyDown = (event:Event) => {
    if ((event as KeyboardEvent).key !== "Tab") return;

    const input = event.target;
    if (!(input instanceof HTMLInputElement) || !input.dataset['autocomplete']) return;

    const suggestionSpan = AutocompleteInline.activeSuggestions.get(input);
    if (suggestionSpan?.textContent) {
      event.preventDefault();
      input.value += suggestionSpan.textContent;
      suggestionSpan.textContent = "";
    }
  };

  handleFocus = (event:FocusEvent) => {
    const input = event.target;
    if (input instanceof HTMLInputElement && input.dataset['autocomplete']) {
      const suggestionSpan = AutocompleteInline.activeSuggestions.get(input);
      if (suggestionSpan) {
        suggestionSpan.style.display = "block";
      }
    }
  };

  handleBlur = (event:FocusEvent) => {
    const input = event.target;
    if (input instanceof HTMLInputElement && input.dataset['autocomplete']) {
      const suggestionSpan = AutocompleteInline.activeSuggestions.get(input);
      if (suggestionSpan) {
        suggestionSpan.style.display = "none";
      }
    }
  };
}
