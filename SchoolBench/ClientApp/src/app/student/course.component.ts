import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb/breadcrumb.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { MainApiClient } from '../services/main.api.client';
import { CourseModel } from '../models/course.model';

@Component({
  selector: 'sb-course',
  templateUrl: './course.component.html',
  styleUrls: ['./student.css']
})
export class CourseComponent implements OnInit {

  course: CourseModel;

  get shortName(): string {
    if (this.course === undefined || this.course === null)
      return 'unknown';

    if (!this.course.name)
      return 'unknown';

    if (this.course.name.length <= 20)
      return this.course.name;

    return this.course.name.substr(0, 20) + '...';
  }

  constructor(private apiClient: MainApiClient, private route: ActivatedRoute, private title: BreadcrumbService) {
    
  }

  async ngOnInit() {

    this.title.setTitle("Course: ");

    await this.route.paramMap.pipe(
      switchMap(async (params: ParamMap) => {
        let id = params.get('id');
        this.course = await this.apiClient.getCourse(id);
        this.title.setTitle("Course: " + this.shortName);
      })).toPromise();
  }
}
