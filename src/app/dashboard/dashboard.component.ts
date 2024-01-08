import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeeService } from '../services/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { PageEvent } from '@angular/material/paginator';
import { SnackbarService } from '../services/snackbar.service';
import { Router } from '@angular/router';

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
  public totalDocs: number = 0;
  public pageEvent!: PageEvent;

  // public token: any = '';
  constructor(
    private _dialog: MatDialog,
    private readonly _getEmployeeList: EmployeeService,
    private _snackbarService: SnackbarService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.getEmployeeList(1, 10);
  }

  public createEmployee(): void {
    const dialogRef = this._dialog.open(CreateEmployeeComponent, {
      disableClose: true,
      autoFocus: false,
      width: '30%',
      maxWidth: '400px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  public onPaginationChange(event: PageEvent): PageEvent {
    this.getEmployeeList(event.pageIndex + 1, event.pageSize);
    return event;
  }

  public getEmployeeList(page: number, limit: number): void {
    let token = localStorage.getItem('token')
      ? String(localStorage.getItem('token'))
      : '';

    if (token !== '') {
      this._getEmployeeList.getEmployeeList(page, limit, token).subscribe({
        next: (response) => {
          if (response.status) {
            this.empList = response.data.docs;
            this.totalDocs = response.data.totalDocs;
          }
        },
        error: (error: HttpErrorResponse) => {
          this._snackbarService.openSnackbar(`⚠️ ${error.error.message}`);
        },
      });
    }
  }

  public editEmployee(i: any): void {
    const dialogRef = this._dialog.open(EditEmployeeComponent, {
      disableClose: false,
      autoFocus: false,
      width: '30%',
      maxWidth: '400px',
      data: { emp: this.empList[i] },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.ngOnInit();
    });
  }

  public logout(): void {
    localStorage.removeItem('token');
    this._route.navigate(['login']);
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
