import { FormControl, Validators } from "@angular/forms";
import BuildNgForm from "../../tools/buildNgForm";

export const {templateForm, controller} =BuildNgForm({
  email:    new FormControl(':email', [Validators.required, Validators.email]),
  username: new FormControl('', [Validators.required, ]),
  password: new FormControl(':password', [Validators.required, ]),
  role:     new FormControl([
    {value:0, title:'Admin'},
    {value:1, title:'Writer'},
    {value:2, title:'User'},
  ], [Validators.required, ]),
})