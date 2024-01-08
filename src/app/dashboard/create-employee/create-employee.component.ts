import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { InputValidationService } from 'src/app/services/input-validation.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

export interface EmployeeForm {
  employee_id: FormControl<string>;
  name: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  designation: FormControl<string>;
  salary: FormControl<string>;
}

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent implements OnInit {
  public validEmail: boolean = false;
  public validPhone: boolean = false;
  public loginBtnClick: boolean = false;
  public validSalary: boolean = false;

  public phoneNumberErrorMessage: string = 'Enter Phone number';

  public createEmployeeGroup!: FormGroup<EmployeeForm>;

  constructor(
    private _formBuilder: FormBuilder,
    private InputValidationService: InputValidationService,
    private readonly _employeeService: EmployeeService,
    public _dialogRef: MatDialogRef<CreateEmployeeComponent>,
    private _snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.createEmployeeGroup = this._formBuilder.group({
      employee_id: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      phone: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      designation: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      salary: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  public submit(): void {
    this.loginBtnClick = true;

    if (
      this.validEmail &&
      this.createEmployeeGroup.controls['phone'].value.length > 9
    ) {
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

      this._employeeService.createEmployeeList(data, token).subscribe({
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

  public validateEmail(): void {
    const value = this.InputValidationService.validateInput(
      this.createEmployeeGroup.controls['email'].value,
      '[^0-9a-zA-Z@.]',
      100
    );
    this.createEmployeeGroup.controls['email'].setValue(value);

    const regex =
      /^([a-zA-Z0-9.]+)([a-zA-Z0-9]+)@([a-zA-Z0-9]+)([.]+)([a-zA-Z]{2,})$/;
    if (
      regex.test(this.createEmployeeGroup.controls['email'].value.toLowerCase())
    ) {
      this.validEmail = true;
    } else {
      this.validEmail = false;
    }
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
