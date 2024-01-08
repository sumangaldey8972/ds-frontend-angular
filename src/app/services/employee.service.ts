import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface employeeList {
  data: any;
  status: boolean;
  status_code: number;
}

interface createEmployee {
  designation: string;
  email: string;
  employee_id: string;
  name: string;
  phone: string;
  salary: number;
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
    employeeData: FormData
  ): Observable<createEmployee> {
    return this._http.post<createEmployee>(
      'http://localhost:8080',
      employeeData,
      {
        withCredentials: true,
      }
    );
  }
}
