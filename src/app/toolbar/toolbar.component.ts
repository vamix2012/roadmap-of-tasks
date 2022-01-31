import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  calendarWeek: number = 1;
  startIndex = 0;
  calendarWeekStart: number = 1641164400000;
  isFrontend: boolean = true;
  isBackend: boolean = true;
  isSecurity: boolean = true;
  isDarkMode: boolean= false;
  @Output() toggleDarkMode = new EventEmitter<boolean>()
  constructor() {}

  ngOnInit(): void {

  }

  onChange(state: any){
    this.isDarkMode = state.checked;
    this.toggleDarkMode.emit(state.checked);
    console.log(this.isDarkMode);
  }

  setWeekDate(operator: string) {
    let oneWeek = 604800005;
    if (operator === '+' && this.calendarWeek < 52) {
      this.calendarWeek++;
      this.startIndex+=7;
      this.calendarWeekStart += oneWeek;
    }
    if (operator === '-' && this.calendarWeek > 1) {
      this.calendarWeek--;
      this.startIndex-=7;
      this.calendarWeekStart -= oneWeek;
    }
  }

  filterLabels(event: any){
    if(event.target.value == "all"){
      this.isFrontend=true;
      this.isBackend=true;
      this.isSecurity=true;
    }
    if(event.target.value == "frontend"){
      this.isFrontend=true;
      this.isBackend=false;
      this.isSecurity=false;
    }
    if(event.target.value == "backend"){
      this.isFrontend=false;
      this.isBackend=true;
      this.isSecurity=false;
    }
    if(event.target.value == "security"){
      this.isFrontend=false;
      this.isBackend=false;
      this.isSecurity=true;
    }


  }
}
