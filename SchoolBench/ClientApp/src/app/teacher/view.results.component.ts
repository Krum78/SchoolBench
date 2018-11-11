import { Component, OnInit } from '@angular/core';

import { MainApiClient } from '../services/main.api.client';
import { CourseModel } from '../models/course.model';
import { CourseModuleModel } from '../models/course.module.model';
import { ModuleTestModel } from '../models/module.test.model';

@Component({
  selector: 'sb-course',
  templateUrl: './view.results.component.html',
  styleUrls: ['./teacher.css']
})
export class ViewResultsComponent implements OnInit {

  courses: CourseModel[];
  private currentCourse: CourseModel;

  modules: CourseModuleModel[] = new Array<CourseModuleModel>();
  private currentModule: CourseModuleModel;

  tests: ModuleTestModel[] = new Array<ModuleTestModel>();
  private currentTest: ModuleTestModel;

  results: any[] = null;

  get selectedCourse(): CourseModel {
    return this.currentCourse;
  }

  set selectedCourse(value: CourseModel) {
    this.currentCourse = value;
    this.modules = new Array<CourseModuleModel>();
    this.tests = new Array<ModuleTestModel>();
    this.results = null;

    if (this.currentCourse !== undefined && this.currentCourse !== null) {
      this.apiClient.getModules(this.currentCourse.id).then(modules => this.modules = modules);
    }
  }

  get selectedModule(): CourseModuleModel {
    return this.currentModule;
  }

  set selectedModule(value: CourseModuleModel) {
    this.currentModule = value;
    this.tests = new Array<ModuleTestModel>();
    this.results = null;

    if (this.currentModule !== undefined && this.currentModule !== null) {
      this.apiClient.getTests(this.currentModule.id).then(tests => this.tests = tests);
    }
  }

  get selectedTest(): ModuleTestModel {
    return this.currentTest;
  }

  set selectedTest(value: ModuleTestModel) {
    this.currentTest = value;
    this.results = new Array<any>();

    if (this.currentTest !== undefined && this.currentTest !== null) {
      this.apiClient.getTestResults(this.currentTest.id).then(scores => this.results = scores);
    }
  }

  constructor(private apiClient: MainApiClient) {
    
  }

  async ngOnInit() {
    this.courses = await this.apiClient.getCourses();
  }
}
