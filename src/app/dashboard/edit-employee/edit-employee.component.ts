import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { InputValidationService } from 'src/app/services/input-validation.service';
import { EmployeeForm } from '../create-employee/create-employee.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent implements OnInit {
  public validEmail: boolean = false;
  public validPhone: boolean = false;
  public loginBtnClick: boolean = false;
  public validSalary: boolean = false;

  public phoneNumberErrorMessage: string = 'Enter Phone number';

  public createEmployeeGroup!: FormGroup<EmployeeForm>;

  constructor(
    private _snackbarService: SnackbarService,
    private _formBuilder: FormBuilder,
    private InputValidationService: InputValidationService,
    private readonly _employeeService: EmployeeService,
    private _dialogRef: MatDialogRef<EditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA)
    public emp: any
  ) {}

  ngOnInit(): void {
    this.createEmployeeGroup = this._formBuilder.group({
      employee_id: new FormControl(this.emp.emp.employee_id, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      name: new FormControl(this.emp.emp.name, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl(this.emp.emp.email, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      phone: new FormControl(this.emp.emp.phone, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      designation: new FormControl(this.emp.emp.designation, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      salary: new FormControl(this.emp.emp.salary, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
    this.validEmail = true;
    this.createEmployeeGroup.controls['email'].disable();
  }

  public submit(): void {
    this.loginBtnClick = true;

    if (this.createEmployeeGroup.controls['phone'].value.length > 9) {
      let token = localStorage.getItem('token')
        ? String(localStorage.getItem('token'))
        : '';
      let data = {
        employee_id: this.createEmployeeGroup.value.employee_id,
        name: this.createEmployeeGroup.value.name,
        email: this.createEmployeeGroup.value.email,
        phone: this.createEmployeeGroup.value.phone?.toString(),
        designation: this.createEmployeeGroup.value.designation,
        salary: this.createEmployeeGroup.value.salary,
      };

      this._employeeService
        .editEmployeeList(data, token, this.emp.emp._id)
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
    } else {
      this._snackbarService.openSnackbar(`⚠️ Please fill the mandatory fields`);
    }
  }

  public dialogClose(): void {
    this._dialogRef.close();
  }

  public validateInput(
    controlName: 'employee_id' | 'name' | 'phone' | 'designation' | 'salary',
    regex: string,
    maxInputLength: number
  ): void {
    const value = this.InputValidationService.validateInput(
      this.createEmployeeGroup.controls[controlName].value,
      regex,
      maxInputLength
    );
    this.createEmployeeGroup.controls[controlName].setValue(value);
  }
}
