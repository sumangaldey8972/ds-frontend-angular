import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface employeeList {
  data: any;
  status: boolean;
  status_code: number;
}

interface createEmployee {
  status: boolean;
  status_code: number;
  message: string;
}

interface editEmployee {
  status: boolean;
  status_code: number;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private readonly _http: HttpClient) {}

  public getEmployeeList(token: string): Observable<employeeList> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // You may need to adjust the content type based on your API requirements
    });
    return this._http.get<employeeList>('http://localhost:8080', {
      withCredentials: true,
      headers: headers,
    });
  }

  public createEmployeeList(
    employeeData: any,
    token: string
  ): Observable<createEmployee> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this._http.post<createEmployee>(
      'http://localhost:8080',
      employeeData,
      {
        withCredentials: true,
        headers: headers,
      }
    );
  }

  public editEmployeeList(
    employeeData: any,
    token: string,
    id: any
  ): Observable<editEmployee> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this._http.patch<editEmployee>(
      `http://localhost:8080/edit?employee_id=${id}`,
      employeeData,
      {
        withCredentials: true,
        headers: headers,
      }
    );
  }
}
