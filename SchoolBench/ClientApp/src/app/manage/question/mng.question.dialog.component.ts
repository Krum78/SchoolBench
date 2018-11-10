import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { QuestionModel } from '../../models/question.model';

@Component({
  selector: 'dialog-question',
  templateUrl: './mng.question.dialog.component.html',
  styleUrls: ['./mng.question.component.css']
})
export class QuestionDialog {

  constructor(
    public dialogRef: MatDialogRef<QuestionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: QuestionModel) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
