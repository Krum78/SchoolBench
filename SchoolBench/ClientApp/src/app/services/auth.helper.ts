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

  private authenticated: boolean = false;
  private userObj: User = null;

  userName: string = "";

  isUserCreator: boolean = false;
  isUserTeacher: boolean = false;
  isUserStudent: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: string,
    private oauthService: OAuthService, private env: Environment, private apiCli: MainApiClient) {
    if (isPlatformBrowser(this.platformId)) {

      this.oauthService.configure(this.env.authConfig);
      this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    }
  }

  get isAuthenticated(): boolean {
    return this.authenticated;
  }

  set isAuthenticated(value: boolean) {
    if (this.authenticated !== value) {
      this.authenticated = value;
      this.authenticationChanged.next(this.isAuthenticated);
    }
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
        } else {
          this.checkAuthenticationStatus();
        }
      });
    }
  }

  public logout(): void {
    this.oauthService.logOut();
    this.checkAuthenticationStatus();

    this.authenticationChanged.next(this.isAuthenticated);
    this.userInfoUpdatedSubject.next(null);
  }

  public doPostLogin() {
    this.checkAuthenticationStatus();
  }

  async getCurrentUser():  Promise<User> {
    if (this.userObj === null && this.isAuthenticated) {
      this.userObj = await this.apiCli.getUser();

      this.isUserCreator = AuthHelper.isInRole(this.userObj, 'ContentCreator');
      this.isUserTeacher = AuthHelper.isInRole(this.userObj, 'Teacher');
      this.isUserStudent = AuthHelper.isInRole(this.userObj, 'Student');

      this.userName = this.userObj.name;

      this.userInfoUpdatedSubject.next(this.userObj);
    }

    return this.userObj;
  }

  public static isInRole(userInfo: User, role: string) {
    return userInfo !== undefined && userInfo !== null && userInfo.roles !== null && userInfo.roles.includes(role);
  }

  public loadDiscoveryAndTryLogin() {
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.checkAuthenticationStatus();
  }

  public login(): void {
    this.oauthService.initImplicitFlow("some-state");
  }

  private checkAuthenticationStatus(): void {
    this.authenticated = this.oauthService.hasValidAccessToken();
    if (this.authenticated && this.userObj === null) {
      this.getCurrentUser().then(() => console.log('user info loaded'));
    }

    if (!this.authenticated && this.userObj !== null) {
      this.userObj = null;
      this.isUserCreator = this.isUserTeacher = this.isUserStudent = false;
      this.userName = null;
    }
  }
}
