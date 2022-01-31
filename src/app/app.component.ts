import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDarkmode: boolean=false;
  toggleDarkMode(isDark: boolean){
    this.isDarkmode = isDark;
    console.log("isDarkModeFromParent:", this.isDarkmode);
  }
}
