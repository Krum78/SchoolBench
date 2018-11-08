import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MainApiClient } from '../../services/main.api.client';
import { CourseModuleModel } from '../../models/course.module.model';
import { ModuleTestModel } from '../../models/module.test.model';

import { AuthHelper } from '../../services/auth.helper';

import { TestDialog } from './mng.test.dialog.component';

@Component({
  selector: 'sb-mng-test-list',
  templateUrl: './mng.test.list.component.html',
  styleUrls: ['./mng.test.component.css']
})
export class ManageTestsComponent implements OnInit {

  private _moduleModel: CourseModuleModel;

  @Input('data-module-model')
  set moduleModel(value: CourseModuleModel) {
    if (this._moduleModel !== value) {
      this._moduleModel = value;
      this.apiClient.getTests(this._moduleModel.id).then(r => this.tests = r);
    }
  }
  get moduleModel(): CourseModuleModel {
    return this._moduleModel;
  }
  
  tests: ModuleTestModel[];

  dialogOrigModel: string;

  constructor(private apiClient: MainApiClient, private dialog: MatDialog, private authHelper: AuthHelper, private title: Title) {
    
  }

  async ngOnInit() {
    
  }

  openTestDialog(model: ModuleTestModel): void {

    let testModel: ModuleTestModel = model;

    if (testModel === undefined || testModel === null) {
      testModel = new ModuleTestModel();
      testModel.moduleId = this._moduleModel.id;
    } else {
      this.dialogOrigModel = JSON.stringify(testModel);
    }

    const dialogRef = this.dialog.open(TestDialog, {
      width: '600px',
      data: testModel
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result === undefined || result === null) {
        if (this.dialogOrigModel !== undefined && this.dialogOrigModel !== null) {
          let origModel = JSON.parse(this.dialogOrigModel) as ModuleTestModel;
          let indexToReplace = this.tests.findIndex(c => c.id === origModel.id);
          this.tests[indexToReplace] = origModel;
        }

        return;
      }

      if (result.id > 0) {
        let updated = await this.apiClient.updateTest(result);
      } else {
        let newModule = await this.apiClient.postTest(result);
        this.tests.push(newModule);
      }
    });
  }

  deleteTest(id: number) {

    let localTests = this.tests;

    this.apiClient.deleteTest(this.moduleModel.id, id).then(function(r) {
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
