import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  faEllipsisV,
  faEdit,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Note } from '../profile-home/profile-home.component';
import { ProfileService } from '../profile.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  faEllipsisV = faEllipsisV;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  editModalOpened = false;
  deleteModalOpened = false;

  @Input() title: string;
  @Input() desc: string;
  @Output() noteEditted = new EventEmitter();
  @Output() noteDeleted = new EventEmitter();
  formValues: Note;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.formValues = {
      title: this.title,
      desc: this.desc,
    };
  }

  dismissEditModal() {
    this.editModalOpened = !this.editModalOpened;
  }

  dismissDeleteNote() {
    this.deleteModalOpened = !this.deleteModalOpened;
  }

  editNote(formValues: Note) {
    this.noteEditted.emit(formValues);
  }

  deleteNote() {
    this.noteDeleted.emit();
  }
}
