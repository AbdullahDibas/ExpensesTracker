import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-footer',
  templateUrl: './form-footer.component.html',
  styleUrls: ['./form-footer.component.css'],
  outputs: ["onSubmit","onCancel"]
})
export class FormFooterComponent {

  onSubmit = new EventEmitter();
  onCancel = new EventEmitter();

  constructor() { }

  onCancelButtonClicked = function(){
    this.onCancel.emit();
  } 
}
