import {Component, ElementRef, AfterViewInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  ngAfterViewInit(): void {
  }
  
  constructor(ngZone : NgZone, router : Router, private authService : AuthService) {
      window['onSignIn'] = (user) => ngZone.run(() => this.onSignIn(user));
      window['onSignInFailure'] = (user) => ngZone.run(() => this.onSignInFailure());
  }

  onSignIn = function(googleUser) {
   /* var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.*/
    this.authService.onLoginSuccess();
  }

  onSignInFailure = function(){
    console.log("Login failed.");
  }
}
