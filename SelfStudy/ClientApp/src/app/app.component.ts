import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthHelper } from './services/auth.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  subscription: Subscription;
  isAuthenticated: boolean;

  title = 'Self Study Portal';

  constructor(private authHelper: AuthHelper) {
    authHelper.loadDiscoveryAndTryLogin();
  }
}
