import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { CourseModuleModel } from '../../models/course.module.model';

@Component({
  selector: 'dialog-course',
  templateUrl: './mng.module.dialog.component.html',
  styleUrls: ['./mng.module.component.css']
})
export class ModuleDialog {

  constructor(
    public dialogRef: MatDialogRef<ModuleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CourseModuleModel) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
