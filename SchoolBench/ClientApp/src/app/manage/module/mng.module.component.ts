import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { MainApiClient } from '../../services/main.api.client';
import { AuthHelper } from '../../services/auth.helper';
import { CourseModuleModel } from '../../models/course.module.model';

//import { CourseDialog } from './mng.course.dialog.component';

@Component({
  selector: 'sb-mng-module',
  templateUrl: './mng.module.component.html',
  styleUrls: ['./mng.module.component.css']
})
export class ManageModuleComponent implements OnInit {

  module: CourseModuleModel;

  get shortName(): string {
    if (this.module === undefined || this.module === null)
      return 'unknown';

    if (!this.module.name)
      return 'unknown';

    if (this.module.name.length <= 10)
      return this.module.name;

    return this.module.name.substr(0, 10) + '...';
  }

  get auth(): AuthHelper {
    return this.authHelper;
  }

  constructor(private apiClient: MainApiClient, private dialog: MatDialog, private route: ActivatedRoute, private authHelper: AuthHelper, private title: Title) {
    
  }

  async ngOnInit() {

    this.title.setTitle("School Bench - Course: ");

    await this.route.paramMap.pipe(
      switchMap(async (params: ParamMap) => {
        let courseId = params.get('courseId');
        let id = params.get('id');
        console.log("Input id: " + id);
        this.module = await this.apiClient.getModule(courseId, id);
        this.title.setTitle("School Bench - Module: " + this.shortName);
      })).toPromise();
  }

  async saveChanges() {
    await this.apiClient.updateModule(this.module);
  }

  openAddCourseDialog(): void {
    //const dialogRef = this.dialog.open(CourseDialog, {
    //  width: '600px',
    //  data: new CourseModuleModel()
    //});

    //dialogRef.afterClosed().subscribe(async result => {
    //  if (result === undefined && result === null) {
    //    return;
    //  }
    //  //let newCourse = await this.apiClient.postCourse(result);
    //});
  }
}
