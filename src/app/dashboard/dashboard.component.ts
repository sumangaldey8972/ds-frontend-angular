import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { EmployeeService } from '../services/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { PageEvent } from '@angular/material/paginator';
import { SnackbarService } from '../services/snackbar.service';
import { Router } from '@angular/router';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

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

  public inputValue: string = '';
  private searchDebouncer$: Subject<string> = new Subject();
  public debounceInputValue = this.inputValue;

  constructor(
    private _dialog: MatDialog,
    private readonly _getEmployeeList: EmployeeService,
    private _snackbarService: SnackbarService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.setupSearchFunction();
    this.getEmployeeList(1, 10, this.debounceInputValue);
  }

  public onSearch(term: string): void {
    this.searchDebouncer$.next(term);
  }

  public setupSearchFunction(): void {
    this.searchDebouncer$
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((term: string) => {
        this.debounceInputValue = term;
        this.getEmployeeList(1, 10, this.debounceInputValue);
      });
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
    this.getEmployeeList(
      event.pageIndex + 1,
      event.pageSize,
      this.debounceInputValue
    );
    return event;
  }

  public getEmployeeList(
    page: number,
    limit: number,
    debounceInputValue: string
  ): void {
    let token = localStorage.getItem('token')
      ? String(localStorage.getItem('token'))
      : '';
    if (token !== '') {
      this._getEmployeeList
        .getEmployeeList(page, limit, token, debounceInputValue)
        .subscribe({
          next: (response) => {
            if (response.status) {
              this.empList = response.data.docs;
              this.totalDocs = response.data.totalDocs;
            }
          },
          error: (error: HttpErrorResponse) => {
            console.log(error.error);
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

  public deleteEmployee(i: any): void {
    const dialogRef = this._dialog.open(DeleteEmployeeComponent, {
      disableClose: false,
      autoFocus: false,
      width: '30%',
      maxWidth: '400px',
      data: { emp_id: this.empList[i] },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  public logout(): void {
    localStorage.removeItem('token');
    this._route.navigate(['login']);
  }
}
