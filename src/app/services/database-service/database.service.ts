import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export enum CirEndPoint {
  DATABASE_LOGIN = '/user/login/db',
  GET_MODEL = '/model/list'
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

  getModelData(payload: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('modelName', payload?.modelName);

    return this.httpClient
      .get<any>(this.baseUrl + CirEndPoint.GET_MODEL, { params: params, headers: this.getHeader() });
  }


}
