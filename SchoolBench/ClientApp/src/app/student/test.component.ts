import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb/breadcrumb.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { MainApiClient } from '../services/main.api.client';
import { AuthHelper } from '../services/auth.helper';
import { ModuleTestModel } from '../models/module.test.model';
import { QuestionModel } from '../models/question.model';

@Component({
  selector: 'sb-test',
  templateUrl: './test.component.html',
  styleUrls: ['./student.css']
})
export class TestComponent implements OnInit {

  test: ModuleTestModel;
  currentQuestion: QuestionModel;

  get shortName(): string {
    if (this.test === undefined || this.test === null)
      return 'unknown';

    if (!this.test.name)
      return 'unknown';

    if (this.test.name.length <= 20)
      return this.test.name;

    return this.test.name.substr(0, 20) + '...';
  }

  get auth(): AuthHelper {
    return this.authHelper;
  }

  constructor(private apiClient: MainApiClient, private route: ActivatedRoute, private authHelper: AuthHelper, private title: BreadcrumbService) {
    
  }

  async ngOnInit() {

    this.title.setTitle("Test: ");

    await this.route.paramMap.pipe(
      switchMap(async (params: ParamMap) => {
        let moduleId = params.get('moduleId');
        let id = params.get('id');
        this.test = await this.apiClient.getTestForStudent(moduleId, id);
        this.fixQuestionsOrder();
        this.currentQuestion = this.test.questions[0];
        this.title.setTitle("Test: " + this.shortName);
      })).toPromise();
  }

  private fixQuestionsOrder() {
    if (!this.dataAvailable)
      return;
    for (let i = 0; i < this.test.questions.length; i++) {
      this.test.questions[i].itemOrder = i + 1;
    }
  }

  showNextQuestion() {
    if (this.nextAvailable) {
      this.currentQuestion = this.test.questions[this.currentQuestion.itemOrder];
    }
  }

  showPreviousQuestion() {
    if (this.previousAvailable) {
      this.currentQuestion = this.test.questions[this.currentQuestion.itemOrder - 2];
    }
  }

  submitResults() {
    
  }

  get dataAvailable(): boolean {
    return this.test !== undefined &&
      this.test !== null &&
      this.test.questions !== undefined &&
      this.test.questions !== null;
  }

  get actionsAvailable() : boolean {
    return this.dataAvailable &&
      this.currentQuestion !== undefined &&
      this.currentQuestion !== null;
  }

  get nextAvailable(): boolean {
    return this.actionsAvailable && this.currentQuestion.itemOrder < this.test.questions.length;
  }

  get previousAvailable(): boolean {
    return this.actionsAvailable && this.currentQuestion.itemOrder > 1;
  }
}
