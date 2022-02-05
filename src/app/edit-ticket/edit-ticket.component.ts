import { CalendarDataService } from './../services/calendar-data.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Note } from '../models/note.model';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss'],
})
export class EditTicketComponent implements OnInit {
  note: Note;
  startDate: any;
  endDate: any;
  duration: any;
  allNotes: Note[] = [];
  delete: boolean = false;
  isFrontend: boolean = false;
  isBackend: boolean = false;
  isSecurity: boolean = false;
  isEditMode: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditTicketComponent>,
    public dataService: CalendarDataService
  ) {
    this.allNotes = data.allNotes;
    this.note = data.note;
    this.startDate = new Date(this.note.startDate);
    this.endDate = new Date(this.note.endDate);
  }

  ngOnInit(): void {
    this.setLabels();
  }

  setLabels() {
    for (let label of this.note.labels) {
      if (label == 1) this.isFrontend = true;
      if (label == 2) this.isBackend = true;
      if (label == 3) this.isSecurity = true;
    }
  }
  convertDate() {
    let start = new Date(this.startDate).getTime();
    let end = new Date(this.endDate).getTime();
    this.note.startDate = start;
    this.note.endDate = end;
  }
  assignLabels() {
    this.note.labels = [];
    if (this.isFrontend) this.note.labels.push(1);
    if (this.isBackend) this.note.labels.push(2);
    if (this.isSecurity) this.note.labels.push(3);
  }

  updateNote() {
    this.convertDate();
    this.assignLabels();
    // Used the Commented initially code to save to the API Endpoint
    // this.dataService
    //   .updateNotes(this.dataService.allNotesEndpoint, this.note, this.note.id)
    //   .subscribe((res) => {
    //     this.allNotes = res;
    //   });

    // Using localStorage as database since the endpoint is not updating
    // just to have the data there after refreshing the page
    for (let i = 0; i < this.allNotes.length; i++) {
      if (this.allNotes[i].id == this.note.id) {
        this.allNotes.splice(i, 1, this.note);
      }
      this.dialogRef.close(this.allNotes);
    }
  }
  closeDialog() {
    this.dialogRef.close(this.allNotes);
  }

  deleteNote() {
    for (let i = 0; i < this.allNotes.length; i++) {
      if (this.allNotes[i].id == this.note.id) {
        this.allNotes.splice(i, 1);
      }
    }
    this.dialogRef.close(this.allNotes);
  }
}
