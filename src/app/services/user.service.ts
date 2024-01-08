import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface loginResponse {
  status: boolean;
  status_code: number;
  message: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly _http: HttpClient) {}

  public userLogin(userData: any): Observable<any> {
    return this._http.post<any>('http://localhost:8080/login', userData, {
      withCredentials: true,
    });
  }
}
