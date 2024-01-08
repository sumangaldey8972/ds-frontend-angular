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

interface EmployeeForm {
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
  public empId = '';
  public name = '';
  public emailId = '';
  public phone = '';
  public designation = '';
  public salary = '';

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
    private _router: Router,
    private _route: ActivatedRoute,
    public _dialogRef: MatDialogRef<CreateEmployeeComponent>
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

    if (this.validEmail && this.phone !== '') {
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
            console.log(response);
            void this._router.navigate(['/dashboard'], {
              relativeTo: this._route,
            });
            this._dialogRef.close();
          }
        },
      });
    } else {
      console.log('not ok');
    }
  }

  public dialogClose(): void {
    this._dialogRef.close();
  }

  public validateEmail(event: any): void {
    const value = this.InputValidationService.validateInput(
      this.emailId,
      '[^0-9a-zA-Z@.]',
      100
    );
    event.target.value = value;

    const regex =
      /^([a-zA-Z0-9.]+)([a-zA-Z0-9]+)@([a-zA-Z0-9]+)([.]+)([a-zA-Z]{2,})$/;
    if (regex.test(this.emailId.toLowerCase())) {
      this.validEmail = true;
    } else {
      this.validEmail = false;
    }
  }

  public validatePhone(event: any): void {
    // console.log(event.target.value);
  }

  public validateSalary(event: any): void {
    // console.log(event.target.value);
  }
}
