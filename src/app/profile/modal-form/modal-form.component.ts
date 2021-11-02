import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Note } from './../profile-home/profile-home.component';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css'],
})
export class ModalFormComponent implements OnInit {
  @Output() clicked = new EventEmitter();
  @Input() formValues: Note;

  modalForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {
    if (this.formValues) {
      this.modalForm.setValue({
        title: this.formValues.title,
        desc: this.formValues.desc,
      });
    }
  }

  submitForm() {
    if (this.modalForm.invalid) return;
    this.clicked.emit(this.modalForm.value);
  }
}
