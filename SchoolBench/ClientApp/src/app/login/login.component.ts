import { Component, OnInit } from '@angular/core';
import { AuthHelper } from '../services/auth.helper';

@Component({
  selector: 'app-login',
  template: '<ng-content></ng-content>',
})

export class LoginComponent implements OnInit {

  constructor(private authHelper: AuthHelper) {
  }

  ngOnInit() {
    if (!this.authHelper.isAuthenticated) {
      this.authHelper.login();
    }
  }
}
