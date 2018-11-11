import { Component, OnInit, Input } from '@angular/core';

import { QuestionModel } from '../../models/question.model';
import { AnswerOptionModel } from '../../models/answer.option.model';
import { ModuleTestModel } from '../../models/module.test.model';

import { AuthHelper } from '../../services/auth.helper';

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
    }
  }
  get testModel(): ModuleTestModel {
    return this._testModel;
  }

  get questions(): QuestionModel[] {
    return this._testModel.questions;
  }

  dialogOrigModel: string;

  constructor(private authHelper: AuthHelper) {
    
  }

  async ngOnInit() {
    
  }

  createNewQuestion() {
    let newQuestion: QuestionModel = new QuestionModel();
    newQuestion.testId = this.testModel.id;
    newQuestion.type = 1;
    newQuestion.question = "";
    newQuestion.answerOptions = new Array<AnswerOptionModel>();
    newQuestion.itemOrder = this.questions.length + 1;
    this.questions.push(newQuestion);
  }

  deleteQuestion(question: QuestionModel) {
    let indexToDelete = this._testModel.questions.indexOf(question);

    if (indexToDelete < 0)
      return;

    this._testModel.questions.splice(indexToDelete, 1);

    this.updateQuestionsOrder();
  }

  updateQuestionsOrder() {
    for (let i = 0; i < this._testModel.questions.length; i++) {
      this._testModel.questions[i].itemOrder = i + 1;
    }
  }

  moveQuestionUp(question: QuestionModel) {
    let indexToMove = this._testModel.questions.indexOf(question);
    if (indexToMove <= 0)
      return;

    this._testModel.questions.splice(indexToMove, 1);
    this._testModel.questions.splice(indexToMove - 1, 0, question);

    this.updateQuestionsOrder();
  }

  moveQuestionDown(question: QuestionModel) {
    let indexToMove = this._testModel.questions.indexOf(question);
    if (indexToMove < 0 || indexToMove === this._testModel.questions.length - 1)
      return;

    this._testModel.questions.splice(indexToMove, 1);
    this._testModel.questions.splice(indexToMove + 1, 0, question);

    this.updateQuestionsOrder();
  }

  get auth(): AuthHelper {
    return this.authHelper;
  }
}
