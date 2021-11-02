import { Component, OnInit } from '@angular/core';
import {
  ProfileService,
  AddNoteData,
  UserNotesData,
  UserNotesResponse,
  UpdateNoteData,
  DeleteNoteData,
} from '../profile.service';
import { AuthService } from 'src/app/auth/auth.service';

export interface Note {
  title: string;
  desc: string;
}

@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.css'],
})
export class ProfileHomeComponent implements OnInit {
  modalOpened = false;
  userNotes = [];

  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) {
    this.getUserNotes();
  }

  ngOnInit(): void {}

  dismissModal() {
    this.modalOpened = !this.modalOpened;
  }

  addNote(modalFormValue: Note) {
    const addNoteData: AddNoteData = {
      ...modalFormValue,
      token: this.authService.userToken,
      citizenID: this.authService.citizenID,
    };
    this.profileService.addNote(addNoteData).subscribe(() => {
      this.getUserNotes();
    });

    this.dismissModal();
  }

  getUserNotes() {
    const UserNotesData: UserNotesData = {
      token: this.authService.userToken,
      userID: this.authService.citizenID,
    };
    this.profileService
      .getuserNotes(UserNotesData)
      .subscribe(({ Notes }: UserNotesResponse) => {
        this.userNotes = Notes;
      });
  }

  editNote(formValues: Note, index: number) {
    const updateNoteData: UpdateNoteData = {
      ...formValues,
      token: this.authService.userToken,
      NoteID: this.userNotes[index]._id,
    };
    this.profileService.updateNote(updateNoteData).subscribe(() => {
      this.getUserNotes();
    });
  }

  deleteNote(index: number) {
    const deleteNoteData: DeleteNoteData = {
      token: this.authService.userToken,
      NoteID: this.userNotes[index]._id,
    };
    this.profileService.deleteNote(deleteNoteData).subscribe(() => {
      this.getUserNotes();
    });
  }
}
