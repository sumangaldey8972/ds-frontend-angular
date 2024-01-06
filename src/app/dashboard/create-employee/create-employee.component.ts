import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
    private InputValidationService: InputValidationService
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
      console.log(this.createEmployeeGroup.value);
    } else {
      console.log('not ok');
    }
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
    console.log(event.target.value);
  }

  public validateSalary(event: any): void {
    console.log(event.target.value);
  }
}
