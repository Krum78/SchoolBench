import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MainApiClient } from '../../services/main.api.client';
import { CourseModel } from '../../models/course.model';

import { AuthHelper } from '../../services/auth.helper';

import { CourseDialog } from './mng.course.dialog.component';

@Component({
  selector: 'sb-course-list',
  templateUrl: './mng.course.list.component.html',
  styleUrls: ['./mng.course.component.css']
})
export class ManageCoursesComponent implements OnInit {

  courses: CourseModel[];

  dialogOrigModel: string;

  constructor(private apiClient: MainApiClient, private dialog: MatDialog, private authHelper: AuthHelper, private title: Title) {
    
  }

  async ngOnInit() {
    this.title.setTitle("School Bench - Courses");
    this.courses = await this.apiClient.getCourses();
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
          let indexToReplace = this.courses.findIndex(c => c.id === origModel.id);
          this.courses[indexToReplace] = origModel;
        }

        return;
      }

      if (result.id > 0) {
        let updated = await this.apiClient.updateCourse(result);
      } else {
        let newCourse = await this.apiClient.postCourse(result);
        this.courses.push(newCourse);
      }
    });
  }

  deleteCourse(id: number) {

    let localCourses = this.courses;

    this.apiClient.deleteCourse(id).then(function(r) {
      if (r) {
        let indexToDelete = localCourses.findIndex(c => c.id === id);
        localCourses.splice(indexToDelete, 1);
      }
    });
  }

  get auth(): AuthHelper {
    return this.authHelper;
  }
}
