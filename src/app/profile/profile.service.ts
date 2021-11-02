import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AddNoteData {
  title: string;
  desc: string;
  citizenID: string;
  token: string;
}

export interface UserNotesData {
  token: string;
  userID: string;
}

export interface UserNotesResponse {
  message: string;
  Notes: {
    title: string;
    desc: string;
    _id: string;
  }[];
}

export interface UpdateNoteData {
  token: string;
  title: string;
  desc: string;
  NoteID: string;
}

export interface DeleteNoteData {
  NoteID: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseUrl = 'https://routeegypt.herokuapp.com';

  constructor(private http: HttpClient) {}

  addNote(addNoteData: AddNoteData) {
    return this.http.post(`${this.baseUrl}/addNote`, addNoteData);
  }

  getuserNotes(userNotesData: UserNotesData) {
    return this.http.post<UserNotesResponse>(
      `${this.baseUrl}/getUserNotes`,
      userNotesData
    );
  }

  updateNote(updateNoteData: UpdateNoteData) {
    return this.http.put(`${this.baseUrl}/updateNote`, updateNoteData);
  }

  deleteNote(deleteNoteData: DeleteNoteData) {
    return this.http.delete(`${this.baseUrl}/deleteNote`, {
      body: { ...deleteNoteData },
    });
  }
}
