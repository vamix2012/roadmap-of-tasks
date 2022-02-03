import { CalendarDataService } from './../services/calendar-data.service';
import { Component, HostListener, Input, OnInit } from '@angular/core';
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
  allNotes: Note[] = [];
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
  cardWidth!: number;
  ratio: number = 2.45; // Here are the mapped values of each section
  filteredFrontend: any = [];
  filteredBackend: any = [];
  filteredSecurity: any = [];
  // used for determining the offset of the stacked cards
  stackOffsetX = 5;
  stackOffsetY = 22;
  // values used for the filter on the left of the toolbar
  @Input() isFrontend: boolean = true;
  @Input() isBackend: boolean = true;
  @Input() isSecurity: boolean = true;
  // value used for Darkmode switch
  @Input() isDarkMode: boolean = false;
  mappedTasks: any[] = [
    {
      frontend: [],
      backend: [],
      security: [],
    },
  ];
  //value used to keep track of the Calendar Week
  @Input() calendarWeek: number = 1;
  //value initialized to store labels data
  labels: NoteLabel[] = [];

  constructor(
    private dataService: CalendarDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.checkInnerWidth();
    this.cardWidth = window.innerWidth / this.ratio;
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
        this.allNotes = note.notes;
        for (let ticket of this.allNotes) {
          // converting date start and end timestamp from seconds to miliseconds
          ticket.startDate *= 1000;
          ticket.endDate *= 1000;
        }
        this.mapTickets();
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkInnerWidth();
  }

  checkInnerWidth() {
    if (window.innerWidth > 1682) {
      this.ratio = 2.45;
      this.cardWidth = window.innerWidth / this.ratio;
    } else {
      this.ratio = 2.01;
      this.cardWidth = window.innerWidth / this.ratio;
    }
  }

  // sortTasks(tasks: Note[]) {
  //   //container initialized to sort every note for each section
  //   for (let ticket of tasks) {
  //
  //
  //     // sort every task to it's corresponding label
  //     if (ticket.labels.includes(1)) {
  //       frontend.push(ticket);
  //     }
  //     if (ticket.labels.includes(2)) {
  //       backend.push(ticket);
  //     }
  //     if (ticket.labels.includes(3)) {
  //       security.push(ticket);
  //     }
  //   }
  //   // Mapping function call for every section
  //   this.mapTickets(frontend, this.filteredFrontend);
  //   this.mapTickets(backend, this.filteredBackend);
  //   this.mapTickets(security, this.filteredSecurity);
  // }

  // Mapping every note to it's coresponding day
  mapTickets() {
    let iterator = 0;
    let start = this.calendarWeekStart;
    for (let i = 0; i < this.allNotes.length; i++) {
      this.mappedTasks[0].frontend[i] = [];
      this.mappedTasks[0].backend[i] = [];
      this.mappedTasks[0].security[i] = [];
      for (let note of this.allNotes) {
        if (
          start - note.startDate > -this.oneDay &&
          start - note.startDate < this.oneDay
        ) {
          if (note.labels.includes(1)) {
            this.mappedTasks[0].frontend[i].push(note);
          }
          if (note.labels.includes(2)) {
            this.mappedTasks[0].backend[i].push(note);
          }
          if (note.labels.includes(3)) {
            this.mappedTasks[0].security[i].push(note);
          }
        }
      }
      iterator++;
      start += this.oneDay;
    }
    console.log(this.mappedTasks[0]);
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
