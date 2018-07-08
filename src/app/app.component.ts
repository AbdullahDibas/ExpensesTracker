import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component'; 
import { AuthService } from './services/auth.service';
declare var gapi: any;

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

  constructor(private authSVC: AuthService){ }

  onSignOut = function() { 
    var authSVC = this.authSVC;

    var auth2 = gapi.auth2.getAuthInstance();    
    auth2.signOut().then(function () {
      authSVC.onLogOut();
    });
  } 
}