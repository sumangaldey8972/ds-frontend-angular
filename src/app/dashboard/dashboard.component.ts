import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeeService } from '../services/employee.service';
import { HttpErrorResponse } from '@angular/common/http';

interface employeeList {
  designation: string;
  email: string;
  employee_id: string;
  name: string;
  phone: string;
  salary: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  empList: employeeList[] = [];

  // public token: any = '';
  constructor(
    private _dialog: MatDialog,
    private readonly _getEmployeeList: EmployeeService
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  public createEmployee(): void {
    this._dialog.open(CreateEmployeeComponent, {
      disableClose: true,
      autoFocus: false,
      maxWidth: '100%',
    });
  }

  public getEmployeeList(): void {
    let token = localStorage.getItem('token')
      ? String(localStorage.getItem('token'))
      : '';

    if (token !== '') {
      this._getEmployeeList.getEmployeeList(token).subscribe({
        next: (response) => {
          console.log(response.data.docs);
          if (response.status) {
            this.empList = response.data.docs;
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
    }
  }
}

//  [
//     {
//       employee_id: 'EMP ID 124',
//       name: 'Sumangal',
//       email: 'sd@gmail.com',
//       phone: 850952889,
//       designation: 'Developer',
//       Salary: 25000,
//     },
//     {
//       employee_id: 'EMP ID 124',
//       name: 'Sumangal',
//       email: 'sd@gmail.com',
//       phone: 850952889,
//       designation: 'Developer',
//       Salary: 25000,
//     },
//     {
//       employee_id: 'EMP ID 124',
//       name: 'Sumangal',
//       email: 'sd@gmail.com',
//       phone: 850952889,
//       designation: 'Developer',
//       Salary: 25000,
//     },
//     {
//       employee_id: 'EMP ID 124',
//       name: 'Sumangal',
//       email: 'sd@gmail.com',
//       phone: 850952889,
//       designation: 'Developer',
//       Salary: 25000,
//     },
//     {
//       employee_id: 'EMP ID 124',
//       name: 'Sumangal',
//       email: 'sd@gmail.com',
//       phone: 850952889,
//       designation: 'Developer',
//       Salary: 25000,
//     },
//     {
//       employee_id: 'EMP ID 124',
//       name: 'Sumangal',
//       email: 'sd@gmail.com',
//       phone: 850952889,
//       designation: 'Developer',
//       Salary: 25000,
//     },
//   ];
