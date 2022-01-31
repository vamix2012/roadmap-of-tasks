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
  allNotes: Note[] = [];
  @Input() calendarWeekStart: number = 1641164400000;
  oneWeek: number = 604800000;
  oneDay: number = 86400000;
  @Input() startIndex=0;
  calendarWeekEnd: number = this.calendarWeekStart + this.oneWeek;
  frontend: Note[] = [];
  backend: Note[] = [];
  security: Note[] = [];
  filteredFrontend: any = [];
  filteredBackend: any = [];
  filteredSecurity: any = [];
  stackOffset = 15;
  @Input()isFrontend: boolean = true;
  @Input()isBackend: boolean = true;
  @Input()isSecurity: boolean = true;
  @Input() isDarkMode: boolean= false;
  @Input() calendarWeek: number = 1;
  labels: NoteLabel[]= [];
  constructor(private dataService: CalendarDataService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataService.getLabels(this.dataService.noteLabelsEndpoint).subscribe((label) => {
      this.labels = label;
    })
    this.dataService
      .getAllNotes(
        this.dataService.allNotesEndpoint
      )
      .subscribe((note) => {
        for (let ticket of note.notes) {
          ticket.startDate *= 1000;
          ticket.endDate *= 1000;
          if (ticket.labels.includes(1)) {
            this.frontend.push(ticket);
          }
          if (ticket.labels.includes(2)) {
            this.backend.push(ticket);
          }
          if (ticket.labels.includes(3)) {
            this.security.push(ticket);
          }
        }
        this.allNotes = note.notes;
        this.mapFrontend();
        this.mapBackend();
        this.mapSecurity();
      });
  }

  mapFrontend() {
    let iterator =0;
    let start = this.calendarWeekStart;
    for (let i = 0; i < 20; i++) {
      this.filteredFrontend[i] = [];
      for (let note of this.frontend) {
        if (start -note.startDate > -this.oneDay && start -note.startDate < this.oneDay) {
          this.filteredFrontend[i].push(note);
        }
      }
      iterator++;
      start +=this.oneDay
    }
  }
  mapBackend() {
    let iterator =0;
    let start = this.calendarWeekStart;
    for (let i = 0; i < 20; i++) {
      this.filteredBackend[i] = [];
      for (let noteb of this.backend) {
        if (start -noteb.startDate > -this.oneDay && start -noteb.startDate < this.oneDay) {
          this.filteredBackend[i].push(noteb);
        }
      }
      iterator++;
      start +=this.oneDay
    }

  }

  mapSecurity() {
    let iterator =0;
    let start = this.calendarWeekStart;
    for (let i = 0; i < 20; i++) {
      this.filteredSecurity[i] = [];
      for (let noteb of this.security) {
        if (start -noteb.startDate > -this.oneDay && start -noteb.startDate < this.oneDay) {
          this.filteredSecurity[i].push(noteb);
        }
      }
      iterator++;
      start +=this.oneDay
    }
  }

  editNote(note:any){
    this.dialog.open(EditTicketComponent, {
      data: {
        note: note,
      },
    });
  }
}
