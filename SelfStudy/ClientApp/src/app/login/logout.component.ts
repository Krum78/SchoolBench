import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHelper } from "../services/auth.helper";

@Component({
  selector: 'app-logout',
  template:'<ng-content></ng-content>' 
})

export class LogoutComponent implements OnInit {

  constructor(private router: Router, private helper: AuthHelper) { }

  ngOnInit() {
    this.helper.logout();
    this.router.navigate(['/']);
  }
}
