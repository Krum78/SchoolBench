import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { OAuthModule } from 'angular-oauth2-oidc';

import { AuthHelper } from "./services/auth.helper";
import { AuthGuard } from "./services/auth.guard";
import { Environment } from "./services/environment";
import { TokenInterceptor } from "./services/token.interceptor";

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LogoutComponent } from './login/logout.component';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from "./login/oauth-callback"

const appInitializerFn = (env: Environment) => {
  return () => {
    return env.loadConfiguration();
  }
};

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,

    LogoutComponent,
    LoginComponent,
    CallbackComponent,

    HomeComponent,
    CounterComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    OAuthModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },

      { path: 'logout', component: LogoutComponent },
      { path: 'login', component: LoginComponent },
      { path: 'oidc-callback', component: CallbackComponent},

      { path: 'counter', component: CounterComponent, canActivate: [AuthGuard] },
      { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthGuard] }
    ])
  ],
  providers: [
    Environment,
    AuthHelper,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [Environment]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
