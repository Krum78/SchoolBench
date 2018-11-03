import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MainApiClient } from '../../services/main.api.client';
import { CourseModel } from '../../models/course.model';

import { AddCourseDialog } from './mng.addcourse.component';

@Component({
  selector: 'sb-course-list',
  templateUrl: './mng.course.list.component.html',
  styleUrls: ['./mng.course.component.css']
})
export class ManageCourcesComponent implements OnInit {

  cources: CourseModel[];

  constructor(private apiClient: MainApiClient, private dialog: MatDialog) {
    
  }

  async ngOnInit() {
    this.cources = await this.apiClient.getCources();
  }

  openAddCourseDialog(): void {
    const dialogRef = this.dialog.open(AddCourseDialog, {
      width: '600px',
      data: new CourseModel()
  });

    dialogRef.afterClosed().subscribe(async result => {
      if (result === undefined || result === null) {
        return;
      }
      let newCourse = await this.apiClient.postCourse(result);
      this.cources.push(newCourse);
    });
  }
}
