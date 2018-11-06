import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { User } from '../models/user';
import { CourseModel } from '../models/course.model';
import { CourseModuleModel } from '../models/course.module.model';
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
}
