import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { User } from '../models/user';
import { CourseModel } from '../models/course.model';
import { CourseModuleModel } from '../models/course.module.model';
import { ModuleTestModel } from '../models/module.test.model';
import { QuestionModel } from '../models/question.model';
import { Environment } from './environment'
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class MainApiClient extends BaseService {

  private apiUrl: string;

  constructor(private env: Environment, private http: HttpClient) {
    super();
    this.apiUrl = this.env.mainApiUrl;
  }

  public async getUser(): Promise<User> {

    let user: User = await this.http.get<User>(this.apiUrl + 'user').pipe(catchError(super.handleError)).toPromise();

    return user;
  }

  //Courses - begin
  public async getCourses(): Promise<[CourseModel]> {
    let courses: [CourseModel] = await this.http.get<[CourseModel]>(this.apiUrl + 'manage/courses')
      .pipe(catchError(super.handleError)).toPromise();

    return courses;
  }

  public async getCourse(id: any): Promise<CourseModel> {
    let course: CourseModel = await this.http.get<CourseModel>(this.apiUrl + 'manage/courses/' + id)
      .pipe(catchError(super.handleError)).toPromise();

    return course;
  }

  public async postCourse(course: CourseModel): Promise<CourseModel> {
    let newCourse: CourseModel = await this.http.post<CourseModel>(this.apiUrl + 'manage/courses', course)
      .pipe(catchError(super.handleError)).toPromise();

    return newCourse;
  }

  public async updateCourse(course: CourseModel): Promise<CourseModel> {
    let updatedCourse: CourseModel = await this.http.put<CourseModel>(this.apiUrl + 'manage/courses', course)
      .pipe(catchError(super.handleError)).toPromise();

    return updatedCourse;
  }

  public async deleteCourse(id: number): Promise<boolean> {
    let response: boolean = await this.http.delete<boolean>(this.apiUrl + 'manage/courses/' + id)
      .pipe(catchError(super.handleError)).toPromise();

    return response;
  }
  //Courses - end

  //Modules - begin
  public async getModules(courseId: any): Promise<[CourseModuleModel]> {
    let modules: [CourseModuleModel] = await this.http.get<[CourseModuleModel]>(this.apiUrl + 'manage/courses/' + courseId + '/modules')
      .pipe(catchError(super.handleError)).toPromise();

    return modules;
  }

  public async getModule(courseId: any, id: any): Promise<CourseModuleModel> {
    let module: CourseModuleModel = await this.http.get<CourseModuleModel>(this.apiUrl + 'manage/courses/' + courseId + '/modules/' + id)
      .pipe(catchError(super.handleError)).toPromise();

    return module;
  }

  public async postModule(module: CourseModuleModel): Promise<CourseModuleModel> {
    let newModule: CourseModuleModel = await this.http.post<CourseModuleModel>(this.apiUrl + 'manage/courses/' + module.courseId + '/modules', module)
      .pipe(catchError(super.handleError)).toPromise();

    return newModule;
  }

  public async updateModule(module: CourseModuleModel): Promise<CourseModuleModel> {
    let updatedModule: CourseModuleModel = await this.http.put<CourseModuleModel>(this.apiUrl + 'manage/courses/' + module.courseId + '/modules', module)
      .pipe(catchError(super.handleError)).toPromise();

    return updatedModule;
  }

  public async deleteModule(courseId: number, id: number): Promise<boolean> {
    let response: boolean = await this.http.delete<boolean>(this.apiUrl + 'manage/courses/' + courseId + '/modules/' + id)
      .pipe(catchError(super.handleError)).toPromise();

    return response;
  }
  //Modules - end

  //Tests - begin
  public async getTests(moduleId: any): Promise<[ModuleTestModel]> {
    let tests: [ModuleTestModel] = await this.http.get<[ModuleTestModel]>(this.apiUrl + 'manage/modules/' + moduleId + '/tests')
      .pipe(catchError(super.handleError)).toPromise();

    return tests;
  }

  public async getTest(moduleId: any, id: any): Promise<ModuleTestModel> {
    let test: ModuleTestModel = await this.http.get<ModuleTestModel>(this.apiUrl + 'manage/modules/' + moduleId + '/tests/' + id)
      .pipe(catchError(super.handleError)).toPromise();

    return test;
  }

  public async postTest(test: ModuleTestModel): Promise<ModuleTestModel> {
    let newTest: ModuleTestModel = await this.http.post<ModuleTestModel>(this.apiUrl + 'manage/modules/' + test.moduleId + '/tests', test)
      .pipe(catchError(super.handleError)).toPromise();

    return newTest;
  }

  public async updateTest(test: ModuleTestModel): Promise<ModuleTestModel> {
    let updatedTest: ModuleTestModel = await this.http.put<ModuleTestModel>(this.apiUrl + 'manage/modules/' + test.moduleId + '/tests', test)
      .pipe(catchError(super.handleError)).toPromise();

    return updatedTest;
  }

  public async deleteTest(moduleId: number, id: number): Promise<boolean> {
    let response: boolean = await this.http.delete<boolean>(this.apiUrl + 'manage/modules/' + moduleId + '/tests/' + id)
      .pipe(catchError(super.handleError)).toPromise();

    return response;
  }
  //Tests - end

  //Questions - begin
  public async getQuestions(testId: any): Promise<[QuestionModel]> {
    let items: [QuestionModel] = await this.http.get<[QuestionModel]>(this.apiUrl + 'manage/tests/' + testId + '/questions')
      .pipe(catchError(super.handleError)).toPromise();

    return items;
  }

  public async getQuestion(testId: any, id: any): Promise<QuestionModel> {
    let item: QuestionModel = await this.http.get<QuestionModel>(this.apiUrl + 'manage/tests/' + testId + '/questions/' + id)
      .pipe(catchError(super.handleError)).toPromise();

    return item;
  }

  public async postQuestion(question: QuestionModel): Promise<QuestionModel> {
    let newQuestion: QuestionModel = await this.http.post<QuestionModel>(this.apiUrl + 'manage/tests/' + question.testId + '/questions', question)
      .pipe(catchError(super.handleError)).toPromise();

    return newQuestion;
  }

  public async updateQuestion(question: QuestionModel): Promise<QuestionModel> {
    let updatedQuestion: QuestionModel = await this.http.put<QuestionModel>(this.apiUrl + 'manage/tests/' + question.testId + '/questions', question)
      .pipe(catchError(super.handleError)).toPromise();

    return updatedQuestion;
  }

  public async deleteQuestion(testId: number, id: number): Promise<boolean> {
    let response: boolean = await this.http.delete<boolean>(this.apiUrl + 'manage/tests/' + testId + '/questions/' + id)
      .pipe(catchError(super.handleError)).toPromise();

    return response;
  }
  //Questions - end
}
