import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export enum CirEndPoint {
  LOGIN_USER = '/user/login',
  REGISTER = '/user/register',
  UPDATE_REGISTER = '/user/update/',
  SEND_DATA = '/card/create',
  FILE_UPLOAD = "/upload"
}

@Injectable({
  providedIn: 'root'
})
export class CirSericeService {

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
      .post<any>(this.baseUrl + CirEndPoint.LOGIN_USER, payload, { headers: this.getHeader() });
  }

  register(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + CirEndPoint.REGISTER, payload);
  }

  updateregister(user_id: string, payload: any): Observable<any> {
    return this.httpClient
      .patch<any>(this.baseUrl + CirEndPoint.UPDATE_REGISTER + user_id, payload, { headers: this.getHeader() });
  }

  sendResume(payload: any) {
    return this.httpClient
      .post<any>(this.baseUrl + CirEndPoint.SEND_DATA, payload);
  }

  fileUpload(payload: any) {
    return this.httpClient
      .post<any>(this.baseUrl + CirEndPoint.FILE_UPLOAD, payload);
  }
}
