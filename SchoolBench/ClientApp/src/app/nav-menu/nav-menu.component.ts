import { Component, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith, delay } from 'rxjs/operators';

import { AuthHelper } from '../services/auth.helper';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements AfterViewInit {
  subscription: Subscription;

  isExpanded = false;
  isAuthenticated: boolean = false;

  constructor(private authHelper: AuthHelper) { }

  ngAfterViewInit() {
    this.isAuthenticated = this.authHelper.isAuthenticated();

    this.subscription = this.authHelper.isAuthenticationChanged().pipe(
      startWith(this.authHelper.isAuthenticated()),
      delay(0)).subscribe((value) => this.isAuthenticated = value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
