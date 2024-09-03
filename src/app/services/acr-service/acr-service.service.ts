import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export enum AcrEndPoint {
  LOGIN_USER = '/user/acr/login',
  REGISTER = '/user/acr/register',
  SEND_DATA = '/card/create',
  FILE_UPLOAD = "/upload",
  UPDATE_REGISTER = '/user/acr/update',
  CREATE_JOB = '/acr/jobs',
  GET_JOB_LIST = '/acr/jobs',
  APPLY_JOBS = '/acr/apply-job',
  SUPPLY_JOB = '/user/acr/update',
  RESET_PASSWORD = '/user/acr/reset',
  CREATE_CANDIDATE = '/candidate/create',
  GET_CANDIDATE_LIST = '/candidate/list/',
  ADMIN_LOGIN = '/user/admin/login',
  GET_AGENCY_LIST = '/user/acr/list'
}

@Injectable({
  providedIn: 'root'
})
export class AcrServiceService {

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
      .post<any>(this.baseUrl + AcrEndPoint.LOGIN_USER, payload, { headers: this.getHeader() });
  }

  adminloginUser(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + AcrEndPoint.ADMIN_LOGIN, payload, { headers: this.getHeader() });
  }

  resetpassword(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + AcrEndPoint.RESET_PASSWORD, payload);
  }

  register(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + AcrEndPoint.REGISTER, payload);
  }

  supplyjob(payload: any): Observable<any> {
    return this.httpClient
      .patch<any>(this.baseUrl + AcrEndPoint.SUPPLY_JOB, payload);
  }

  getJobList(params: { page: string, limit: string }): Observable<any> {

    const url = `${this.baseUrl}${AcrEndPoint.GET_JOB_LIST}`;
    let queryParams = new HttpParams();
    queryParams = queryParams.set('page', params?.page);
    queryParams = queryParams.set('limit', params?.limit);
    return this.httpClient.get<any>(url, { params: queryParams });
  }


  getAgencyList(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + AcrEndPoint.GET_AGENCY_LIST);
  }


  getCandidateList(id: any): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + AcrEndPoint.GET_CANDIDATE_LIST + id);
  }

  createjob(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + AcrEndPoint.CREATE_JOB, payload);
  }

  createCandidate(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + AcrEndPoint.CREATE_CANDIDATE, payload);
  }

  updateregister(user_id: string, payload: any): Observable<any> {
    let url = ''
    if (user_id) {
      url = this.baseUrl + AcrEndPoint.UPDATE_REGISTER + '/' + user_id
    } else {
      url = this.baseUrl + AcrEndPoint.UPDATE_REGISTER
    }
    return this.httpClient
      .patch<any>(url, payload, { headers: this.getHeader() });
  }

  sendResume(payload: any) {
    return this.httpClient
      .post<any>(this.baseUrl + AcrEndPoint.SEND_DATA, payload);
  }

  fileUpload(payload: any) {
    return this.httpClient
      .post<any>(this.baseUrl + AcrEndPoint.FILE_UPLOAD, payload);
  }

  applyJob(payload: any) {
    return this.httpClient
      .post<any>(this.baseUrl + AcrEndPoint.APPLY_JOBS, payload);
  }

  updateApplication(payload: any) {
    return this.httpClient
      .put<any>(this.baseUrl + AcrEndPoint.APPLY_JOBS, payload);
  }
}
