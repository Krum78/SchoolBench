import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatRadioModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { OAuthModule } from 'angular-oauth2-oidc';

import { AuthHelper } from "./services/auth.helper";
import { AuthGuard } from "./services/auth.guard";
import { Environment } from "./services/environment";
import { TokenInterceptor } from "./services/token.interceptor";
import { MainApiClient } from "./services/main.api.client";

import { AppComponent } from './app.component';

import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './login/logout.component';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './login/oauth-callback';
import { BreadcrumbComponent, BreadcrumbService } from './breadcrumb/breadcrumb.component';

import { ManageCoursesComponent } from './manage/course/mng.course.list.component';
import { ManageCourseComponent } from './manage/course/mng.course.component';
import { CourseDialog } from './manage/course/mng.course.dialog.component';

import { ManageModuleComponent } from './manage/module/mng.module.component';
import { ManageModulesComponent } from './manage/module/mng.module.list.component';
import { ModuleDialog } from './manage/module/mng.module.dialog.component';

import { ManageTestComponent } from './manage/test/mng.test.component';
import { ManageTestsComponent } from './manage/test/mng.test.list.component';
import { TestDialog } from './manage/test/mng.test.dialog.component';

import { ManageQuestionComponent } from './manage/question/mng.question.component';
import { ManageQuestionsComponent } from './manage/question/mng.question.list.component';
import { QuestionDialog } from './manage/question/mng.question.dialog.component';

import { AnswerDialog } from './manage/answer/mng.answer.dialog.component';

import { CoursesComponent } from "./student/courses.component";
import { CourseComponent } from "./student/course.component";
import { ModulesComponent } from "./student/modules.component";
import { ModuleComponent } from "./student/module.component";
import { TestsComponent } from "./student/tests.component";
import { TestComponent } from "./student/test.component";
import { QuestionComponent } from "./student/question.component";

import { ViewResultsComponent } from "./teacher/view.results.component";


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

    BreadcrumbComponent,

    HomeComponent,

    ManageCoursesComponent,
    ManageCourseComponent,
    CourseDialog,

    ManageModulesComponent,
    ManageModuleComponent,
    ModuleDialog,

    ManageTestComponent,
    ManageTestsComponent,
    TestDialog,

    ManageQuestionComponent,
    ManageQuestionsComponent,
    QuestionDialog,

    AnswerDialog,

    CoursesComponent,
    CourseComponent,
    ModulesComponent,
    ModuleComponent,
    TestsComponent,
    TestComponent,
    QuestionComponent,

    ViewResultsComponent
  ],
  entryComponents: [
    CourseDialog,
    ModuleDialog,
    TestDialog,
    QuestionDialog,
    AnswerDialog
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    OAuthModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full', data: { breadcrumb: "Home" } },

      { path: 'logout', component: LogoutComponent, data: { breadcrumb: "Log Out" }},
      { path: 'login', component: LoginComponent, data: { breadcrumb: "Log In" }},
      { path: 'oidc-callback', component: CallbackComponent },

      { path: 'student/courses', component: CoursesComponent, canActivate: [AuthGuard], data: { breadcrumb: "Courses", apiController: "student" } },
      { path: 'student/courses/:id', component: CourseComponent, canActivate: [AuthGuard], data: { breadcrumb: "Course - ", apiController: "student" } },
      { path: 'student/courses/:courseId/modules/:id', component: ModuleComponent, canActivate: [AuthGuard], data: { breadcrumb: "Module - ", apiController: "student" } },
      { path: 'student/modules/:moduleId/tests/:id', component: TestComponent, canActivate: [AuthGuard], data: { breadcrumb: "Test - ", apiController: "student" } },

      { path: 'teacher/tests/results', component: ViewResultsComponent, canActivate: [AuthGuard], data: { breadcrumb: "Test Results", apiController: "manage" } },

      { path: 'manage/courses', component: ManageCoursesComponent, canActivate: [AuthGuard], data: { breadcrumb: "Manage - Courses", apiController: "manage" } },
      { path: 'manage/courses/:id', component: ManageCourseComponent, canActivate: [AuthGuard], data: { breadcrumb: "Course - ", apiController: "manage" } },

      { path: 'manage/courses/:courseId/modules/:id', component: ManageModuleComponent, canActivate: [AuthGuard], data: { breadcrumb: "Module - ", apiController: "manage" } },

      { path: 'manage/modules/:moduleId/tests/:id', component: ManageTestComponent, canActivate: [AuthGuard], data: { breadcrumb: "Test - ", apiController: "manage" } }
    ] , { onSameUrlNavigation: 'reload' })
  ],
  providers: [
    Environment,
    Title,
    AuthHelper,
    MainApiClient,
    BreadcrumbService,
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
