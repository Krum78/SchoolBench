import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';

import { BaseService } from './base.service';

import { User } from '../models/user';

import { AuthHelper } from './auth.helper';

@Injectable()
export class UserService extends BaseService {

  private pathAPI = "https://localhost/getusers";

  constructor(private http: HttpClient, authHelper: AuthHelper) { super(authHelper); }

  /** GET heroes from the server */

  getUsers(): Observable<User[]> {
    return ((this.http.get(this.pathAPI + 'user', super.header()).pipe(
      catchError(super.handleError))) as any) as Observable<User[]>;
  }
}
