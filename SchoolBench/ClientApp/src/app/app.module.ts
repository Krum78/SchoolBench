import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { OAuthModule } from 'angular-oauth2-oidc';

import { AuthHelper } from "./services/auth.helper";
import { AuthGuard } from "./services/auth.guard";
import { Environment } from "./services/environment";
import { TokenInterceptor } from "./services/token.interceptor";
import { MainApiClient } from "./services/main.api.client";

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LogoutComponent } from './login/logout.component';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './login/oauth-callback';
import { ManageCourcesComponent } from './manage/course/mng.course.list.component';
import { ManageCourseComponent } from './manage/course/mng.course.component';
import { CourseDialog } from './manage/course/mng.course.dialog.component';

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
    ManageCourcesComponent,
    ManageCourseComponent,
    CourseDialog,
    FetchDataComponent
  ],
  entryComponents: [
    CourseDialog
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    OAuthModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },

      { path: 'logout', component: LogoutComponent },
      { path: 'login', component: LoginComponent },
      { path: 'oidc-callback', component: CallbackComponent },

      { path: 'manage/cources', component: ManageCourcesComponent, canActivate: [AuthGuard] },
      { path: 'manage/cources/:id', component: ManageCourseComponent, canActivate: [AuthGuard] },

      { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthGuard] }
    ])
  ],
  providers: [
    Environment,
    Title,
    AuthHelper,
    MainApiClient,
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
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: true }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
