import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { ModalComponent } from './modal/modal.component';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { SharedModule } from '../shared/shared.module';
import { NoteComponent } from './note/note.component';

@NgModule({
  declarations: [ProfileHomeComponent, ModalComponent, ModalFormComponent, NoteComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FontAwesomeModule,
  ],
})
export class ProfileModule {}
