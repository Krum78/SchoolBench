import { Component, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthHelper } from './services/auth.helper';
import { startWith, delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  subscription: Subscription;
  isAuthenticated: boolean;

  title = 'School Bench';

  constructor(private authHelper: AuthHelper) {}

  ngAfterViewInit() {
    this.isAuthenticated = this.authHelper.isAuthenticated();

    this.subscription = this.authHelper.isAuthenticationChanged().pipe(
      startWith(this.authHelper.isAuthenticated()),
      delay(0)).subscribe((value) => this.isAuthenticated = value );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
