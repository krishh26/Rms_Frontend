import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export enum CirEndPoint {
  LOGIN_USER = '/user/login',
  REGISTER = '/user/register',
  UPDATE_REGISTER = '/user/update/',
  SEND_DATA = '/card/create',
  FILE_UPLOAD = "/upload",
  FORGOT_PASSWORD = '/user/forgot',
  RESET_PASSWORD = '/user/reset',
  REFER_EARN = '/user/refer',
  ADD_CLIENT_ROLES='/client/',
  GET_CLIENT_ROLES='/client/',
  USER_CLIENT_UPDATE='/user/update/'
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

  forgotpassword(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + CirEndPoint.FORGOT_PASSWORD, payload);
  }

  resetpassword(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + CirEndPoint.RESET_PASSWORD, payload);
  }

  referAndEarn(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + CirEndPoint.REFER_EARN, payload);
  }

  addClientRoles(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + CirEndPoint.ADD_CLIENT_ROLES, payload);
  }

  updateUserClient(payload: any, id: string): Observable<any> {
    return this.httpClient
      .patch<any>(this.baseUrl + CirEndPoint.USER_CLIENT_UPDATE + id, payload);
  }

  getClientRoles(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + CirEndPoint.GET_CLIENT_ROLES);
  }
}
