import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb/breadcrumb.component';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { MainApiClient } from '../services/main.api.client';
import { AuthHelper } from '../services/auth.helper';
import { CourseModuleModel } from '../models/course.module.model';

//import { CourseDialog } from './mng.course.dialog.component';

@Component({
  selector: 'sb-module',
  templateUrl: './module.component.html',
  styleUrls: ['./student.css']
})
export class ModuleComponent implements OnInit {

  module: CourseModuleModel;

  get shortName(): string {
    if (this.module === undefined || this.module === null)
      return 'unknown';

    if (!this.module.name)
      return 'unknown';

    if (this.module.name.length <= 20)
      return this.module.name;

    return this.module.name.substr(0, 20) + '...';
  }

  get auth(): AuthHelper {
    return this.authHelper;
  }

  constructor(private apiClient: MainApiClient, private route: ActivatedRoute, private authHelper: AuthHelper, private title: BreadcrumbService) {
    
  }

  async ngOnInit() {

    this.title.setTitle("Module: ");

    await this.route.paramMap.pipe(
      switchMap(async (params: ParamMap) => {
        let courseId = params.get('courseId');
        let id = params.get('id');
        this.module = await this.apiClient.getModule(courseId, id);
        this.title.setTitle("Module: " + this.shortName);
      })).toPromise();
  }
}
