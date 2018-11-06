import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { MainApiClient } from '../../services/main.api.client';
import { CourseModel } from '../../models/course.model';

import { CourseDialog } from './mng.course.dialog.component';

@Component({
  selector: 'sb-course',
  templateUrl: './mng.course.component.html',
  styleUrls: ['./mng.course.component.css']
})
export class ManageCourseComponent implements OnInit {

  course: CourseModel;

  get shortName(): string {
    if (this.course === undefined || this.course === null)
      return 'unknown';

    if (!this.course.name)
      return 'unknown';

    if (this.course.name.length <= 10)
      return this.course.name;

    return this.course.name.substr(0, 10) + '...';
  }

  constructor(private apiClient: MainApiClient, private dialog: MatDialog, private route: ActivatedRoute, private title: Title) {
    
  }

  async ngOnInit() {

    this.title.setTitle("School Bench - Course: ");

    await this.route.paramMap.pipe(
      switchMap(async (params: ParamMap) => {
        let id = params.get('id');
        console.log("Input id: " + id);
        this.course = await this.apiClient.getCourse(id);
        this.title.setTitle("School Bench - Course: " + this.course.name.substr(0, 20));
      })).toPromise();
  }

  openAddCourseDialog(): void {
    const dialogRef = this.dialog.open(CourseDialog, {
      width: '600px',
      data: new CourseModel()
  });

    dialogRef.afterClosed().subscribe(async result => {
      if (result === undefined && result === null) {
        return;
      }
      //let newCourse = await this.apiClient.postCourse(result);
    });
  }
}
