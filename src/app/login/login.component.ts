import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../services/user.service';
import { InputValidationService } from '../services/input-validation.service';
import { HttpErrorResponse } from '@angular/common/http';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public emailId = '';
  public isPassword = '';
  public validEmail: boolean = false;
  public loginBtnClick: boolean = false;
  public error: string = '';
  public loginFormGroup!: FormGroup<LoginForm>;

  constructor(
    private _formBuilder: FormBuilder,
    private _loginServices: UserService,
    private InputValidationService: InputValidationService
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = this._formBuilder.group({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  public submit(): void {
    this.loginBtnClick = true;

    if (this.validEmail && this.isPassword !== '') {
      const formData = new FormData();
      formData.append('email', this.emailId);
      formData.append('password', this.isPassword);
      this._loginServices.userLogin(formData).subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
    } else {
      console.log('please enter the required fields');
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
}
