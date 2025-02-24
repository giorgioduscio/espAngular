import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  template:`
  
<div class="modal fade" [id]="modalId" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-body text-bg-dark">
        <ng-content></ng-content>
      </div>

    </div>
  </div>
</div>

`
})
export class ModalComponent {
  @Input() modalId =''
}
