import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent {

    id:number;
    note:Note;

    constructor(private matDialog:MatDialog, private routerService:RouterService,
    private notesService:NotesService, private router:ActivatedRoute) { }


    ngAfterViewInit() {

      setTimeout(()=>{
        this.router.params.subscribe(params => console.log(params['noteId']));
      this.router.params.subscribe(params=>{
        this.id=params['noteId'];
        console.log('id'+this.id);
        this.note=this.notesService.getNoteById(this.id);
        console.log(this.note);
        this.Dialog();
      });
    });
    }

    Dialog(){
      const dialogRef = this.matDialog.open(EditNoteViewComponent,{
        data:{ note: this.note },
        width:'60vw'
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.routerService.routeBack();
    });
  }

}
