import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith, delay } from 'rxjs/operators';

import { AuthHelper } from '../services/auth.helper';
import { User } from '../models/user';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isAuthSubscr: Subscription;
  userInfoSubscr: Subscription;

  isExpanded = false;
  isAuthenticated: boolean = false;

  userInfo: User = null;

  isUserCreator: boolean = false;
  isUserTeacher: boolean = false;
  isUserStudent: boolean = false;

  constructor(private authHelper: AuthHelper) { }

  async ngOnInit() {
    this.isAuthenticated = this.authHelper.isAuthenticated();

    this.isAuthSubscr = this.authHelper.isAuthenticationChanged().pipe(
      startWith(this.authHelper.isAuthenticated()),
      delay(0)).subscribe((value) => this.isAuthenticated = value);

    let userInfo = await this.authHelper.getCurrentUser();
    this.updateUserInfo(userInfo);

    this.userInfoSubscr = this.authHelper.userInfoUpdated().subscribe((user) => {
      this.updateUserInfo(user);
    });
  }

  private updateUserInfo(userInfo: User) {
    this.userInfo = userInfo;
    this.isUserCreator = AuthHelper.isInRole(userInfo, 'ContentCreator');
    this.isUserTeacher = AuthHelper.isInRole(userInfo, 'Teacher');
    this.isUserStudent = AuthHelper.isInRole(userInfo, 'Student');
  }

  ngOnDestroy() {
    this.isAuthSubscr.unsubscribe();
    this.userInfoSubscr.unsubscribe();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
