import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb/breadcrumb.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { MainApiClient } from '../../services/main.api.client';
import { AuthHelper } from '../../services/auth.helper';
import { ModuleTestModel } from '../../models/module.test.model';

@Component({
  selector: 'sb-mng-test',
  templateUrl: './mng.test.component.html',
  styleUrls: ['./mng.test.component.css']
})
export class ManageTestComponent implements OnInit {

  test: ModuleTestModel;

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
        console.log("Input id: " + id);
        this.test = await this.apiClient.getTest(moduleId, id);
        this.title.setTitle("Test: " + this.shortName);
      })).toPromise();
  }

  async saveChanges() {
    await this.apiClient.updateTest(this.test);
  }
}
