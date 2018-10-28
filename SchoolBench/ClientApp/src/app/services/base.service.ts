import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthHelper } from './auth.helper';

@Injectable()
export class BaseService {

  constructor(private authHelper: AuthHelper) { }

  public extractData(res: Response) {

    let body = res.json();
    return body || {};
  }

  public handleError(error: Response | any) {

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  public header() {

    let header = new HttpHeaders({ 'Content-Type': 'application/json' });

    //if (this.authHelper.isAuthenticated()) {
    //  header = header.append('Authorization', 'Bearer ' + this.authHelper.getToken()); 
    //}

    return { headers: header };
  }
}
