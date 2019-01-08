import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthConfig } from "angular-oauth2-oidc";

@Injectable()
export class Environment {
  private cfg;

  constructor(private injector: Injector) { }

  loadConfiguration() {
    let http = this.injector.get(HttpClient);
    return http.get("/assets/app-config.json")
      .toPromise()
      .then(data => {
        this.cfg = data;
      });
  }

  get config() {
    return this.cfg;
  }

  get authConfig(): AuthConfig {

    let aCfg = this.cfg.authConfig as AuthConfig;
    return aCfg;
  }

  get mainApiUrl(): string {
    return this.cfg.mainApiUrl as string;
  }
}
