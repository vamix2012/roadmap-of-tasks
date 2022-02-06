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
  // value used to detect if the user clicked on delete
  delete: boolean = false;
  // Values used to determine if the Note is assigned to one of the three departments
  isFrontend: boolean = false;
  isBackend: boolean = false;
  isSecurity: boolean = false;

  isEditMode: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditTicketComponent>,
    public dataService: CalendarDataService
  ) {
    // Storing data recived from calendar compoment
    this.allNotes = data.allNotes;
    this.note = data.note;
    // Converting timestamp to date format supported by the date input to be shown on the input as initial value
    this.startDate = new Date(this.note.startDate);
    this.endDate = new Date(this.note.endDate);
  }
  /**
   * On initialization the Checkboxes are set
   */
  ngOnInit(): void {
    this.setLabels();
  }

  /**
   * This function is Checking or Unchecking the checkboxes in edit mode based on data from note.labels<br>
   *
   */
  setLabels(): void {
    for (let label of this.note.labels) {
      if (label == 1) this.isFrontend = true;
      if (label == 2) this.isBackend = true;
      if (label == 3) this.isSecurity = true;
    }
  }

  /**
   * function used to convert updated date back to timestamp before getting saved in the note object
   */
  convertDate(): void {
    let start = new Date(this.startDate).getTime();
    let end = new Date(this.endDate).getTime();
    this.note.startDate = start;
    this.note.endDate = end;
  }

  // Function used to store assigned values back in the note object
  assignLabels(): void {
    this.note.labels = [];
    if (this.isFrontend) this.note.labels.push(1);
    if (this.isBackend) this.note.labels.push(2);
    if (this.isSecurity) this.note.labels.push(3);
  }

  /**
   * Function used to store updated data back in to allNotes,<br> and after closing this data is passed back to Calendar component
   */
  updateNote(): void {
    this.convertDate();
    this.assignLabels();
    // Used the Commented code initially code to save to the API Endpoint
    // Since is just a dummy Endpoint is not actually saving anything

    // this.dataService
    //   .updateNotes(this.dataService.allNotesEndpoint, this.note, this.note.id)
    //   .subscribe((res) => {
    //     this.allNotes = res;
    //   });

    // Used localStorage as database since the endpoint is not updating
    // just to have the data there after refreshing the page
    for (let i = 0; i < this.allNotes.length; i++) {
      if (this.allNotes[i].id == this.note.id) {
        this.allNotes.splice(i, 1, this.note);
      }
      this.dialogRef.close(this.allNotes);
    }
  }

  /**
   * Function used to delete note and pass the updated object back to the Calendar Component
   */
  deleteNote(): void {
    for (let i = 0; i < this.allNotes.length; i++) {
      if (this.allNotes[i].id == this.note.id) {
        this.allNotes.splice(i, 1);
      }
    }
    this.dialogRef.close(this.allNotes);
  }

  /**
   * Function used to close the dialog
   */
  closeDialog(): void {
    this.dialogRef.close(this.allNotes);
  }
}
