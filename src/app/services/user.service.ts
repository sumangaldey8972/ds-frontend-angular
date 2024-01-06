import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface loginForm {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly _http: HttpClient) {}

  public userLogin(userData: FormData): Observable<loginForm> {
    return this._http.post<loginForm>('http://localhost:8080/login', userData, {
      withCredentials: true,
    });
  }
}
