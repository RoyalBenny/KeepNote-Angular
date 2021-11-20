import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
  token:string;
  url:string;
  constructor(private httpClient:HttpClient, private authentication:AuthenticationService){
    this.notes = [];
    this.notesSubject = new BehaviorSubject(this.notes);
    this.token = this.authentication.getBearerToken();
    this.url = 'http://localhost:3000/api/v1/notes';
  }
  fetchNotesFromServer():Observable<Array<Note>> {
    return this.httpClient.get<Array<Note>>(this.url, {
      headers: { "Authorization":"Bearer "+this.token }
    });
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    this.fetchNotesFromServer().subscribe(notes => {
      this.notes = notes;
      this.notesSubject.next(this.notes);
    });
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    return  this.httpClient.post<Note>(this.url, note, {
      headers: { "Authorization":"Bearer "+this.token }
    });
  }

  editNote(note: Note): Observable<Note> {
    this.notes.push(note);
    return this.httpClient.put<Note>(this.url+'/'+note.id, note, {
      headers: { "Authorization":"Bearer "+this.token }
    });
  }

  getNoteById(noteId:number): Note {
    console.log(this.notes.find(note => note.id === noteId));
    return this.notes.find(note => note.id == noteId);
  }
}
