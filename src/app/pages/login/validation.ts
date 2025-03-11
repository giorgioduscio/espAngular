import { FormControl, Validators } from "@angular/forms";
import BuildNgForm from "../../tools/buildNgForm";

export default function validation() {
  const {templateForm, controller} =BuildNgForm({
    // aggiungere un eventuale messaggio che spieghi perchè il campo non è valido
    email:    new FormControl(':email', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required, Validators.minLength(6) ]),
    password: new FormControl(':password', [Validators.required, Validators.minLength(6), Validators.max(16) ]),
    role:     new FormControl([
      {value:0, title:'Admin'},
      {value:1, title:'Writer'},
      {value:2, title:'User'},
    ], [Validators.required, ]),
  })

  return {templateForm, controller}
}