import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent {

  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;

  constructor(private notesService:NotesService) {}

  ngOnInit() {
    this.notesService.getNotes().subscribe(notes => {
      this.notStartedNotes = notes.filter(note => note.state === 'not-started');
      this.startedNotes = notes.filter(note => note.state === 'started');
      this.completedNotes = notes.filter(note => note.state === 'completed');
    });
  }
}
