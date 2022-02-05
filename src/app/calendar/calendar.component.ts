import { CalendarDataService } from './../services/calendar-data.service';
import {
  AfterViewInit,
  Component,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { Note } from '../models/note.model';
import { MatDialog } from '@angular/material/dialog';
import { NoteLabel } from '../models/noteLabel.model';
import { EditTicketComponent } from '../edit-ticket/edit-ticket.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, AfterViewInit {
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
  cardWidth: number = 100;
  cardHeight: number = 100;
  // used for determining the offset of the stacked cards
  stackOffsetX = 2;
  stackOffsetY = 22;
  // values used for the filter on the left of the toolbar
  @Input() isFrontend: boolean = true;
  @Input() isBackend: boolean = true;
  @Input() isSecurity: boolean = true;
  // value used for Darkmode switch
  @Input() isDarkMode: boolean = false;
  mappedTasks: any = {
    frontend: [],
    backend: [],
    security: [],
  };
  //value used to keep track of the Calendar Week
  @Input() calendarWeek: number = 1;
  //value initialized to store labels data
  labels: NoteLabel[] = [];

  constructor(
    private dataService: CalendarDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.checkInnerWidth(window.innerWidth);
    //Get request to get the labels data
    this.dataService
      .getLabels(this.dataService.noteLabelsEndpoint)
      .subscribe((label) => {
        this.labels = label;
      });
    // Get request to get All notes
    if (localStorage.getItem('allNotes')) {
      let allNotesLS: any = localStorage.getItem('allNotes');
      this.allNotes = JSON.parse(allNotesLS);
      this.mapTickets();
    } else {
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
          localStorage.setItem('allNotes', JSON.stringify(this.allNotes));
        });
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.checkInnerWidth(window.innerWidth);
    }, 0);
  }

  saveChanges() {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkInnerWidth(window.innerWidth);
  }

  checkInnerWidth(width: number) {
    // Change card width based on screen width
    if (width > 1480) {
      this.cardWidth = 0.15 * width;
    }
    if (width > 1000 && width < 1480) {
      this.cardWidth = 0.14 * width;
    }
    if (width < 1000) {
      this.cardWidth = 140;
    }
    // Change card height based on screen height
    let height = window.innerHeight;
    if (height > 800) {
      this.cardHeight = 0.17 * height;
    } else {
      this.cardHeight = 130;
    }
  }

  // Mapping every note to it's coresponding day
  mapTickets() {
    let iterator: number = 0;
    let start = this.calendarWeekStart;
    for (let i = 0; i < this.allNotes.length * 4; i++) {
      this.mappedTasks.frontend[i] = [];
      this.mappedTasks.backend[i] = [];
      this.mappedTasks.security[i] = [];
      for (let note of this.allNotes) {
        if (
          start - note.startDate > -this.oneDay &&
          start - note.startDate < this.oneDay
        ) {
          if (note.labels.includes(1)) {
            this.mappedTasks.frontend[i].push(note);
          }
          if (note.labels.includes(2)) {
            this.mappedTasks.backend[i].push(note);
          }
          if (note.labels.includes(3)) {
            this.mappedTasks.security[i].push(note);
          }
        }
      }
      iterator++;
      start += this.oneDay;
    }
  }

  // Open dialog to edit Ticket
  editNote(note: any) {
    let dialogRef = this.dialog.open(EditTicketComponent, {
      data: {
        note: note,
        allNotes: this.allNotes,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      // response is empty wont save it to the Database
      if (res === undefined) {
        this.dialog.closeAll();
      } else {
        this.allNotes = res;
        localStorage.setItem('allNotes', JSON.stringify(this.allNotes));
        this.mapTickets();
        this.dialog.closeAll();
      }
    });
  }
}
