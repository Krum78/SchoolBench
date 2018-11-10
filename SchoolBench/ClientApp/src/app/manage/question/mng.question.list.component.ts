import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MainApiClient } from '../../services/main.api.client';
import { QuestionModel } from '../../models/question.model';
import { ModuleTestModel } from '../../models/module.test.model';

import { AuthHelper } from '../../services/auth.helper';

import { QuestionDialog } from './mng.question.dialog.component';

@Component({
  selector: 'sb-mng-question-list',
  templateUrl: './mng.question.list.component.html',
  styleUrls: ['./mng.question.component.css']
})
export class ManageQuestionsComponent implements OnInit {

  private _testModel: ModuleTestModel;

  @Input('data-test-model')
  set testModel(value: ModuleTestModel) {
    if (this._testModel !== value) {
      this._testModel = value;
      this.apiClient.getQuestions(this._testModel.id).then(r => this.questions = r);
    }
  }
  get testModel(): ModuleTestModel {
    return this._testModel;
  }
  
  questions: QuestionModel[];

  dialogOrigModel: string;

  constructor(private apiClient: MainApiClient, private dialog: MatDialog, private authHelper: AuthHelper) {
    
  }

  async ngOnInit() {
    
  }

  async createNewQuestion() {
    let newQuestion: QuestionModel = new QuestionModel();
    newQuestion.testId = this.testModel.id;
    newQuestion.itemOrder = this.questions.length + 1;
    let created: QuestionModel = await this.apiClient.postQuestion(newQuestion);
    this.questions.push(created);
  }

  openQuestionDialog(model: QuestionModel): void {

    let itemModel: QuestionModel = model;

    if (itemModel === undefined || itemModel === null) {
      itemModel = new QuestionModel();
      itemModel.testId = this.testModel.id;
    } else {
      this.dialogOrigModel = JSON.stringify(itemModel);
    }

    const dialogRef = this.dialog.open(QuestionDialog, {
      width: '600px',
      data: itemModel
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result === undefined || result === null) {
        if (this.dialogOrigModel !== undefined && this.dialogOrigModel !== null) {
          let origModel = JSON.parse(this.dialogOrigModel) as QuestionModel;
          let indexToReplace = this.questions.findIndex(c => c.id === origModel.id);
          this.questions[indexToReplace] = origModel;
        }

        return;
      }

      if (result.id > 0) {
        let updated = await this.apiClient.updateQuestion(result);
      } else {
        let newModule = await this.apiClient.postQuestion(result);
        this.questions.push(newModule);
      }
    });
  }

  deleteQuestion(id: number) {

    let localTests = this.questions;

    this.apiClient.deleteQuestion(this.testModel.id, id).then(function(r) {
      if (r) {
        let indexToDelete = localTests.findIndex(c => c.id === id);
        localTests.splice(indexToDelete, 1);
      }
    });
  }

  get auth(): AuthHelper {
    return this.authHelper;
  }
}
