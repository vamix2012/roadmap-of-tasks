import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Note } from '../models/note.model';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss'],
})
export class EditTicketComponent implements OnInit {
  note: any;
  startDate: any;
  endDate: any;
  duration: any;
  allNotes: Note[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {
    this.note = data.note;
    this.startDate = new Date(this.note.startDate);
    this.endDate = new Date(this.note.endDate);
  }

  ngOnInit(): void {
    let allNotesLS: any = localStorage.getItem('allNotes');
    this.allNotes = JSON.parse(allNotesLS);
  }

  setDate(date: any) {
    let dateFormated = new Date(date);
    return dateFormated;
  }

  convertDate() {
    let start = new Date(this.startDate).getTime();
    let end = new Date(this.endDate).getTime();
    this.note.startDate = start;
    this.note.endDate = end;
  }

  updateNote() {
    this.convertDate();
    for (let i = 0; i < this.allNotes.length; i++) {
      if (this.allNotes[i].id == this.note.id) {
        this.allNotes[i] = this.note;
        localStorage.setItem('allNotes', JSON.stringify(this.allNotes));
      }
    }

    this.dialog.closeAll();
    window.location.reload();
  }
}
