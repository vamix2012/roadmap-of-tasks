import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Note } from '../models/note.model';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss']
})
export class EditTicketComponent {

  note: Note;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {
    this.note = data.note;
  }

  updateNote(){
    this.dialog.closeAll();
  }
}
