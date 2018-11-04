import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MainApiClient } from '../../services/main.api.client';
import { CourseModel } from '../../models/course.model';

import { CourseDialog } from './mng.course.dialog.component';

@Component({
  selector: 'sb-course-list',
  templateUrl: './mng.course.list.component.html',
  styleUrls: ['./mng.course.component.css']
})
export class ManageCourcesComponent implements OnInit {

  cources: CourseModel[];

  dialogOrigModel: string;

  constructor(private apiClient: MainApiClient, private dialog: MatDialog) {
    
  }

  async ngOnInit() {
    this.cources = await this.apiClient.getCources();
  }

  openCourseDialog(model: CourseModel): void {

    let courseModel: CourseModel = model;
    
    if (courseModel === undefined || courseModel === null)
      courseModel = new CourseModel();
    else {
      this.dialogOrigModel = JSON.stringify(courseModel);
    }

    const dialogRef = this.dialog.open(CourseDialog, {
      width: '600px',
      data: courseModel
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result === undefined || result === null) {
        if (this.dialogOrigModel !== undefined && this.dialogOrigModel !== null) {
          let origModel = JSON.parse(this.dialogOrigModel) as CourseModel;
          let indexToReplace = this.cources.findIndex(c => c.id === origModel.id);
          this.cources[indexToReplace] = origModel;
        }

        return;
      }

      if (result.id > 0) {
        let updated = await this.apiClient.updateCourse(result);
      } else {
        let newCourse = await this.apiClient.postCourse(result);
        this.cources.push(newCourse);
      }
    });
  }

  deleteCourse(id: number) {

    let localCourses = this.cources;

    this.apiClient.deleteCourse(id).then(function(r) {
      if (r) {
        let indexToDelete = localCourses.findIndex(c => c.id === id);
        localCourses.splice(indexToDelete, 1);
      }
    });
  }


}
