import { Component, OnInit, Input } from '@angular/core';

import { AuthHelper } from '../services/auth.helper';
import { QuestionModel } from '../models/question.model';
import { AnswerOptionModel } from '../models/answer.option.model';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'sb-question',
  templateUrl: './question.component.html',
  styleUrls: ['./student.css']
})
export class QuestionComponent implements OnInit {

  @Input("question-model")
  question: QuestionModel;

  get typeString() {
    return this.question.type == 1 ? "Single Choice" : "Multiple Choices";
  }

  get selectedRadioValue(): AnswerOptionModel {
    for (let i = 0; i < this.question.answerOptions.length; i++) {
      if (this.question.answerOptions[i].isMarked) {
        return this.question.answerOptions[i];
      }
    }

    return null;
  }

  set selectedRadioValue(value: AnswerOptionModel) {
    for (let i = 0; i < this.question.answerOptions.length; i++) {
      let answer: AnswerOptionModel = this.question.answerOptions[i];
      answer.isMarked = (value !== null && answer.id === value.id);
    }
  }

  get auth(): AuthHelper {
    return this.authHelper;
  }

  constructor(private authHelper: AuthHelper) {
    
  }

  async ngOnInit() {
  }
}
