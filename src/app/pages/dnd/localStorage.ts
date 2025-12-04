import { Personaggio } from "./dndManual";

export const local = {
  async get(){
    const characterData = localStorage.getItem('character');
    return JSON.parse(characterData || '');
  },
  async set(newCharacter: Personaggio){
    localStorage.setItem('character', JSON.stringify(newCharacter));
  },
  async copy(character: Personaggio){
    const data = JSON.stringify(character, null, 2);
    navigator.clipboard.writeText(data);
  },
  async paste(){
    const text = await navigator.clipboard.readText()
    // deve contenere '{', '}', ']' e '['
    const requiredChars = ['{', '}', '[', ']', ':'];
    const hasRequiredChars = requiredChars.every(char => text.includes(char));
    if (!hasRequiredChars) {
      alert("Il contenuto degli appunti non sembra essere un JSON valido.");
      return;
    }
    const result = JSON.parse(text);
    return result;
  }
}
