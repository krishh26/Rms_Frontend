import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export enum CirEndPoint {
  DATABASE_LOGIN = '/user/login/db',
  REGISTER = '/user/register',
  UPDATE_REGISTER = '/user/update/',
  SEND_DATA = '/card/create',
  FILE_UPLOAD = "/upload"
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  baseUrl!: string;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.baseUrl = environment.baseUrl;
  }

  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return headers;
  }

  loginUser(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + CirEndPoint.DATABASE_LOGIN, payload, { headers: this.getHeader() });
  }

}
