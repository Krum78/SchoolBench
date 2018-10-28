import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';
import { OAuthService, JwksValidationHandler, AuthConfig } from "angular-oauth2-oidc";
import { Environment } from "./environment";

@Injectable()
export class AuthHelper  {

  private authenticationChanged = new Subject<boolean>();

  constructor(@Inject(PLATFORM_ID) private platformId: string,
    private oauthService: OAuthService, private env: Environment) {
    if (isPlatformBrowser(this.platformId)) {

      let authConfig = env.authConfig;

      this.oauthService.configure(authConfig);
      this.oauthService.tokenValidationHandler = new JwksValidationHandler();
      this.oauthService.loadDiscoveryDocumentAndTryLogin();
    }
  }

  public isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  public isAuthenticationChanged():any {
    return this.authenticationChanged.asObservable();
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
    this.authenticationChanged.next(this.isAuthenticated());
  }

  public doPostLogin() {
    this.authenticationChanged.next(this.isAuthenticated());
  }

  public login(): void {
    this.oauthService.initImplicitFlow("some-state");
  }
}
