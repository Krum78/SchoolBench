import { Component, OnInit } from '@angular/core';

import { MainApiClient } from '../services/main.api.client';
import { CourseModel } from '../models/course.model';

import { BreadcrumbService } from '../breadcrumb/breadcrumb.component';

import { AuthHelper } from '../services/auth.helper';

@Component({
  selector: 'sb-view-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./student.css']
})
export class CoursesComponent implements OnInit {

  courses: CourseModel[];

  dialogOrigModel: string;

  constructor(private apiClient: MainApiClient, private authHelper: AuthHelper, private bc: BreadcrumbService) {
  }

  async ngOnInit() {
    this.bc.setTitle("Courses");
    this.courses = await this.apiClient.getCourses();
  }

  get auth(): AuthHelper {
    return this.authHelper;
  }
}
