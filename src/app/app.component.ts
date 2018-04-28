import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  sidebarNav: Element;
  applyShrinkClass: Boolean = false;

  shrinkSidenav = function () {
    this.applyShrinkClass = !this.applyShrinkClass;
  }
}
