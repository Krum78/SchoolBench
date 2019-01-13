import { Component, OnInit, Input } from '@angular/core';

import { MainApiClient } from '../services/main.api.client';
import { CourseModuleModel } from '../models/course.module.model';
import { ModuleTestModel } from '../models/module.test.model';

import { AuthHelper } from '../services/auth.helper';

@Component({
  selector: 'sb-test-list',
  templateUrl: './tests.component.html',
  styleUrls: ['./student.css']
})
export class TestsComponent implements OnInit {

  private _moduleModel: CourseModuleModel;

  @Input('data-module-model')
  set moduleModel(value: CourseModuleModel) {
    if (this._moduleModel !== value) {
      this._moduleModel = value;
      this.apiClient.getTests(this._moduleModel.id).then(r => this.tests = r);
    }
  }
  get moduleModel(): CourseModuleModel {
    return this._moduleModel;
  }
  
  tests: ModuleTestModel[];

  constructor(private apiClient: MainApiClient, private authHelper: AuthHelper) {
    
  }

  async ngOnInit() {
    
  }

  get auth(): AuthHelper {
    return this.authHelper;
  }
}
