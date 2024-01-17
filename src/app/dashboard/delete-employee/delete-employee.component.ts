import { HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.scss'],
})
export class DeleteEmployeeComponent implements OnInit {
  constructor(
    public _dialogRef: MatDialogRef<DeleteEmployeeComponent>,
    private _snackbarService: SnackbarService,
    private readonly _employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data.emp_id._id);
  }

  public dialogClosed(): void {
    this._dialogRef.close();
  }

  public deleteEmployee(): void {
    let token = localStorage.getItem('token')
      ? String(localStorage.getItem('token'))
      : '';
    this._employeeService
      .deleteEmployee(this.data.emp_id._id, token)
      .subscribe({
        next: (response) => {
          if (response.status) {
            this._snackbarService.openSnackbar(`✅ ${response.message}`);
            this._dialogRef.close();
          }
        },
        error: (error: HttpErrorResponse) => {
          this._snackbarService.openSnackbar(`⚠️ ${error.error.message}`);
        },
      });
  }
}
