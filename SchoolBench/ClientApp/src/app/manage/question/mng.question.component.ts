import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AuthHelper } from '../../services/auth.helper';
import { QuestionModel } from '../../models/question.model';
import { AnswerOptionModel } from '../../models/answer.option.model';

import { AnswerDialog } from '../answer/mng.answer.dialog.component';

@Component({
  selector: 'sb-mng-question',
  templateUrl: './mng.question.component.html',
  styleUrls: ['./mng.question.component.css']
})
export class ManageQuestionComponent implements OnInit {

  @Input("question-model")
  question: QuestionModel;

  answDialogOrigModel: string;

  private currentDialogModel: AnswerOptionModel;

  get typeString() {
    return this.question.type == 1 ? "Single Choice" : "Multiple Choices";
  }

  get auth(): AuthHelper {
    return this.authHelper;
  }

  constructor(private dialog: MatDialog, private authHelper: AuthHelper) {
    
  }

  async ngOnInit() {
  }

  openAnswerDialog(model: AnswerOptionModel): void {

    let itemModel: AnswerOptionModel = model;

    if (itemModel === undefined || itemModel === null) {
      itemModel = new AnswerOptionModel();
      itemModel.questionId = this.question.id;
      itemModel.itemOrder = this.question.answerOptions.length + 1;
      itemModel.text = "";
    } else {
      this.answDialogOrigModel = JSON.stringify(itemModel);
    }

    this.currentDialogModel = itemModel;

    const dialogRef = this.dialog.open(AnswerDialog, {
      width: '600px',
      data: itemModel
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result === undefined || result === null) {
        if (this.answDialogOrigModel !== undefined && this.answDialogOrigModel !== null) {
          let origModel = JSON.parse(this.answDialogOrigModel) as AnswerOptionModel;
          let indexToReplace = this.question.answerOptions.indexOf(this.currentDialogModel);
          this.question.answerOptions[indexToReplace] = origModel;
        }

        return;
      }

      if (this.question.answerOptions.indexOf(this.currentDialogModel) < 0) {
        this.question.answerOptions.push(result);
      }
    });
  }

  deleteAnswer(answer: AnswerOptionModel) {
    let indexToDelete = this.question.answerOptions.indexOf(answer);
    this.question.answerOptions.splice(indexToDelete, 1);
    this.updateAnswersOrder();
  }

  updateAnswersOrder() {
    for (let i = 0; i < this.question.answerOptions.length; i++) {
      this.question.answerOptions[i].itemOrder = i + 1;
    }
  }

  moveAnswerUp(answer: AnswerOptionModel) {
    let indexToMove = this.question.answerOptions.indexOf(answer);
    if (indexToMove <= 0)
      return;

    this.question.answerOptions.splice(indexToMove, 1);
    this.question.answerOptions.splice(indexToMove - 1, 0, answer);

    this.updateAnswersOrder();
  }

  moveAnswerDown(answer: AnswerOptionModel) {
    let indexToMove = this.question.answerOptions.indexOf(answer);
    if (indexToMove < 0 || indexToMove === this.question.answerOptions.length - 1)
      return;

    this.question.answerOptions.splice(indexToMove, 1);
    this.question.answerOptions.splice(indexToMove + 1, 0, answer);

    this.updateAnswersOrder();
  }
}
