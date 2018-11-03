import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { CourseModel } from '../../models/course.model';

@Component({
  selector: 'dialog-add-course',
  templateUrl: './mng.addcourse.component.html',
  styleUrls: ['./mng.course.component.css']
})
export class AddCourseDialog {

  constructor(
    public dialogRef: MatDialogRef<AddCourseDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CourseModel) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
