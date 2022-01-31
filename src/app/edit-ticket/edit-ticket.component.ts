import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Note } from '../models/note.model';
import { CalendarDataService } from '../services/calendar-data.service';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss']
})
export class EditTicketComponent implements OnInit {
  note: Note;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: CalendarDataService,
    public dialog: MatDialog
  ) {
    this.note = data.note;
  }

  ngOnInit(): void {
  }
  updateNote(){
    this.dialog.closeAll();
  }
}
