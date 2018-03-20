import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
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
