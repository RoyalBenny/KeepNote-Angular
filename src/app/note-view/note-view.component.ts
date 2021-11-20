import { Component } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent {

  notes: Array<Note>;
  constructor(private notesService: NotesService) {
  }

  ngOnInit() {
    this.notesService.getNotes().subscribe(
      (data: Array<Note>) => {
        this.notes = data;
      }
    );
  }
}
