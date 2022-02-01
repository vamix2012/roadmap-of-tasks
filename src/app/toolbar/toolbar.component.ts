import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  //value used to keep track of the Calendar Week
  calendarWeek: number = 1;
  //start index used for mapping each note or array of notes in the template
  startIndex = 0;
  // Start of first Week in ms
  calendarWeekStart: number = 1641164400000;
  // values used for the filter on the left of the toolbar
  isFrontend: boolean = true;
  isBackend: boolean = true;
  isSecurity: boolean = true;
  // value used for Darkmode switch
  isDarkMode: boolean = false;

  //method to listen on change events
  //change isDarkmode to true or false depending on switch state
  onChange(state: any) {
    this.isDarkMode = state.checked;
  }

  //this method used to navigate trough Calendar Weeks
  setWeekDate(operator: string) {
    let oneWeek = 604800005;
    if (operator === '+' && this.calendarWeek < 52) {
      this.calendarWeek++;
      this.startIndex += 7;
      this.calendarWeekStart += oneWeek;
    }
    if (operator === '-' && this.calendarWeek > 1) {
      this.calendarWeek--;
      this.startIndex -= 7;
      this.calendarWeekStart -= oneWeek;
    }
  }

  //Method listening to the value of the filter and based on that value is filtering the rows accordingly
  filterLabels(event: any) {
    if (event.target.value == 'all') {
      this.isFrontend = true;
      this.isBackend = true;
      this.isSecurity = true;
    }
    if (event.target.value == 'frontend') {
      this.isFrontend = true;
      this.isBackend = false;
      this.isSecurity = false;
    }
    if (event.target.value == 'backend') {
      this.isFrontend = false;
      this.isBackend = true;
      this.isSecurity = false;
    }
    if (event.target.value == 'security') {
      this.isFrontend = false;
      this.isBackend = false;
      this.isSecurity = true;
    }
  }
}
