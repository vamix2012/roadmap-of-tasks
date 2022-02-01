import { CalendarDataService } from './../services/calendar-data.service';
import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../models/note.model';
import { MatDialog } from '@angular/material/dialog';
import { NoteLabel } from '../models/noteLabel.model';
import { EditTicketComponent } from '../edit-ticket/edit-ticket.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  // Start of first Week in ms
  @Input() calendarWeekStart: number = 1641164400000;
  //one Week in ms
  oneWeek: number = 604800000;
  //one day in ms
  oneDay: number = 86400000;
  //Calendar Week end in ms
  calendarWeekEnd: number = this.calendarWeekStart + this.oneWeek;
  //start index used for mapping each note or array of notes in the template
  @Input() startIndex = 0;

  // Here are the mapped values of each section
  filteredFrontend: any = [];
  filteredBackend: any = [];
  filteredSecurity: any = [];
  // used for determining the offset of the stacked cards
  stackOffset = 15;
  // values used for the filter on the left of the toolbar
  @Input() isFrontend: boolean = true;
  @Input() isBackend: boolean = true;
  @Input() isSecurity: boolean = true;
  // value used for Darkmode switch
  @Input() isDarkMode: boolean = false;
  //value used to keep track of the Calendar Week
  @Input() calendarWeek: number = 1;
  //value initialized to store labels data
  labels: NoteLabel[] = [];

  constructor(
    private dataService: CalendarDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    //Get request to get the labels data
    this.dataService
      .getLabels(this.dataService.noteLabelsEndpoint)
      .subscribe((label) => {
        this.labels = label;
      });
    // Get request to get All notes
    this.dataService
      .getAllNotes(this.dataService.allNotesEndpoint)
      .subscribe((note) => {
        //container initialized to sort every note for each section
        let frontend: Note[] = [];
        let backend: Note[] = [];
        let security: Note[] = [];

        for (let ticket of note.notes) {
          // converting date from seconds to miliseconds
          ticket.startDate *= 1000;
          ticket.endDate *= 1000;

          if (ticket.labels.includes(1)) {
            frontend.push(ticket);
          }
          if (ticket.labels.includes(2)) {
            backend.push(ticket);
          }
          if (ticket.labels.includes(3)) {
            security.push(ticket);
          }
        }
        // Mapping function call for every section
        this.mapTickets(frontend, this.filteredFrontend);
        this.mapTickets(backend, this.filteredBackend);
        this.mapTickets(security, this.filteredSecurity);
      });
  }

  // Mapping every note to it's coresponding  row and day
  mapTickets(notes: any, mapedNotes: any) {
    let iterator = 0;
    let start = this.calendarWeekStart;
    for (let i = 0; i < 20; i++) {
      mapedNotes[i] = [];
      for (let note of notes) {
        if (
          start - note.startDate > -this.oneDay &&
          start - note.startDate < this.oneDay
        ) {
          mapedNotes[i].push(note);
        }
      }
      iterator++;
      start += this.oneDay;
    }
  }

  // Open dialog to edit Ticket
  editNote(note: any) {
    this.dialog.open(EditTicketComponent, {
      data: {
        note: note,
      },
    });
  }
}
