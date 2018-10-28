import { Component, OnInit } from '@angular/core';
import { OAuthService, AuthConfig } from "angular-oauth2-oidc";
import { Router } from "@angular/router";
import { AuthHelper } from "../services/auth.helper"

@Component({
  template: ''
})
export class CallbackComponent implements OnInit {

  constructor(private oauthService: OAuthService, private router: Router, private authHelper: AuthHelper) {}

  ngOnInit() {
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
      if (!this.oauthService.hasValidIdToken() || !this.oauthService.hasValidAccessToken()) {
        this.oauthService.initImplicitFlow('some-state');
      } else {
        this.authHelper.doPostLogin();
        this.router.navigate(["/"]);
      }
    });
  }
}
