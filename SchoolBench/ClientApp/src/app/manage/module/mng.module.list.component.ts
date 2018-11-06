import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MainApiClient } from '../../services/main.api.client';
import { CourseModuleModel } from '../../models/course.module.model';
import { CourseModel } from '../../models/course.model';

import { AuthHelper } from '../../services/auth.helper';

import { ModuleDialog } from './mng.module.dialog.component';

@Component({
  selector: 'sb-module-list',
  templateUrl: './mng.module.list.component.html',
  styleUrls: ['./mng.module.component.css']
})
export class ManageModulesComponent implements OnInit {

  private _courseModel : CourseModel;

  @Input('data-course-model')
  set courseModel(value: CourseModel) {
    if (this._courseModel !== value) {
      this._courseModel = value;
      this.apiClient.getModules(this._courseModel.id).then(r => this.modules = r);
    }
  }
  get courseModel(): CourseModel {
    return this._courseModel;
  }
  
  modules: CourseModuleModel[];

  dialogOrigModel: string;

  constructor(private apiClient: MainApiClient, private dialog: MatDialog, private authHelper: AuthHelper, private title: Title) {
    
  }

  async ngOnInit() {
    
  }

  openModuleDialog(model: CourseModuleModel): void {

    let moduleModel: CourseModuleModel = model;

    if (moduleModel === undefined || moduleModel === null) {
      moduleModel = new CourseModuleModel();
      moduleModel.courseId = this._courseModel.id;
    } else {
      this.dialogOrigModel = JSON.stringify(moduleModel);
    }

    const dialogRef = this.dialog.open(ModuleDialog, {
      width: '600px',
      data: moduleModel
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result === undefined || result === null) {
        if (this.dialogOrigModel !== undefined && this.dialogOrigModel !== null) {
          let origModel = JSON.parse(this.dialogOrigModel) as CourseModuleModel;
          let indexToReplace = this.modules.findIndex(c => c.id === origModel.id);
          this.modules[indexToReplace] = origModel;
        }

        return;
      }

      if (result.id > 0) {
        let updated = await this.apiClient.updateModule(result);
      } else {
        let newModule = await this.apiClient.postModule(result);
        this.modules.push(newModule);
      }
    });
  }

  deleteModule(id: number) {

    let localModules = this.modules;

    this.apiClient.deleteModule(this.courseModel.id, id).then(function(r) {
      if (r) {
        let indexToDelete = localModules.findIndex(c => c.id === id);
        localModules.splice(indexToDelete, 1);
      }
    });
  }

  get auth(): AuthHelper {
    return this.authHelper;
  }
}
