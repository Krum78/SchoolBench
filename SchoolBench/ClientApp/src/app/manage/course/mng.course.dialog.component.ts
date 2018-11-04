import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { CourseModel } from '../../models/course.model';

@Component({
  selector: 'dialog-course',
  templateUrl: './mng.course.dialog.component.html',
  styleUrls: ['./mng.course.component.css']
})
export class CourseDialog {

  constructor(
    public dialogRef: MatDialogRef<CourseDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CourseModel) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
