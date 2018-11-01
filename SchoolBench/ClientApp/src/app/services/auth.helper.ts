import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
import { OAuthService, JwksValidationHandler, AuthConfig } from "angular-oauth2-oidc";
import { Environment } from "./environment";
import { MainApiClient } from './main.api.client';
import { User } from '../models/user';

@Injectable()
export class AuthHelper  {

  private authenticationChanged = new Subject<boolean>();
  private userInfoUpdatedSubject = new Subject<User>();

  private userObj: User = null;

  constructor(@Inject(PLATFORM_ID) private platformId: string,
    private oauthService: OAuthService, private env: Environment, private apiCli: MainApiClient) {
    if (isPlatformBrowser(this.platformId)) {

      this.oauthService.configure(this.env.authConfig);
      this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    }
  }

  public isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  public isAuthenticationChanged():any {
    return this.authenticationChanged.asObservable();
  }

  public userInfoUpdated(): any {
    return this.userInfoUpdatedSubject.asObservable();
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {

      this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
        if (!this.oauthService.hasValidIdToken() ||
            !this.oauthService.hasValidAccessToken()) {
          this.oauthService.initImplicitFlow("some-state");
        }
      });
    }
  }

  public logout(): void {
    this.oauthService.logOut();
    this.userObj = null;
    this.authenticationChanged.next(this.isAuthenticated());
    this.userInfoUpdatedSubject.next(null);
  }

  public doPostLogin() {
    this.authenticationChanged.next(this.isAuthenticated());

    this.getCurrentUser().then(() => console.log('user loaded'));
  }

  async getCurrentUser():  Promise<User> {
    if (this.userObj === null && this.isAuthenticated()) {
      this.userObj = await this.apiCli.getUser();
      this.userInfoUpdatedSubject.next(this.userObj);
    }

    return this.userObj;
  }

  public static isInRole(userInfo: User, role: string) {
    return userInfo !== undefined && userInfo !== null && userInfo.roles !== null && userInfo.roles.includes(role);
  }

  public loadDiscoveryAndTryLogin() {
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  public login(): void {
    this.oauthService.initImplicitFlow("some-state");
  }
}
