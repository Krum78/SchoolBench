import { Component, OnInit, Input } from '@angular/core';

import { MainApiClient } from '../services/main.api.client';
import { CourseModuleModel } from '../models/course.module.model';
import { CourseModel } from '../models/course.model';

import { AuthHelper } from '../services/auth.helper';

@Component({
  selector: 'sb-module-list',
  templateUrl: './modules.component.html',
  styleUrls: ['./student.css']
})
export class ModulesComponent implements OnInit {

  private _courseModel : CourseModel;

  @Input('data-course-model')
  set courseModel(value: CourseModel) {
    if (this._courseModel !== value) {
      this._courseModel = value;
      this.apiClient.getModules(this._courseModel.id).then(r => this.modules = r);
    }
  }
  get courseModel(): CourseModel {
    return this._courseModel;
  }
  
  modules: CourseModuleModel[];

  dialogOrigModel: string;

  constructor(private apiClient: MainApiClient, private authHelper: AuthHelper) {
    
  }

  async ngOnInit() {
    
  }
  
  get auth(): AuthHelper {
    return this.authHelper;
  }
}
