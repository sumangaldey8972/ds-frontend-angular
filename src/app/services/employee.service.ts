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

interface deleteEmployee {
  status: boolean;
  status_code: number;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private readonly _http: HttpClient) {}

  public getEmployeeList(
    page: number,
    limit: number,
    token: string,
    search: string
  ): Observable<employeeList> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this._http.get<employeeList>(
      `http://localhost:8080?page=${page}&limit=${limit}&search=${search}`,
      {
        withCredentials: true,
        headers: headers,
      }
    );
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

  public deleteEmployee(
    employee_id: any,
    token: string
  ): Observable<deleteEmployee> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this._http.delete<deleteEmployee>(
      `http://localhost:8080/delete?employee_id=${employee_id}`,
      {
        withCredentials: true,
        headers: headers,
      }
    );
  }
}
