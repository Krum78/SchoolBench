import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AnswerOptionModel } from '../../models/answer.option.model';

@Component({
  selector: 'dialog-answer',
  templateUrl: './mng.answer.dialog.component.html',
  styleUrls: ['./mng.answer.component.css']
})
export class AnswerDialog {

  constructor(
    public dialogRef: MatDialogRef<AnswerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AnswerOptionModel) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
