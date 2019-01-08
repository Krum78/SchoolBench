import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ModuleTestModel } from '../../models/module.test.model';

@Component({
  selector: 'dialog-test',
  templateUrl: './mng.test.dialog.component.html',
  styleUrls: ['./mng.test.component.css']
})
export class TestDialog {

  constructor(
    public dialogRef: MatDialogRef<TestDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ModuleTestModel) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
