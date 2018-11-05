import { Component, OnInit } from '@angular/core';

import { AuthHelper } from '../services/auth.helper';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  isExpanded = false;
  
  constructor(private authHelper: AuthHelper) { }

  async ngOnInit() {
  }

  ngOnDestroy() {
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  get auth(): AuthHelper {
    return this.authHelper;
  }
}
