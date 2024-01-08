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
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';

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
    private InputValidationService: InputValidationService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBarServices: SnackbarService
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
    this._loginRedirect();
  }

  private _loginRedirect(): void {
    const token = localStorage.getItem('token');
    if (token != null || token != undefined) {
      this._router.navigate(['dashboard']);
    }
  }

  public submit(): void {
    this.loginBtnClick = true;
    if (this.validEmail && this.isPassword !== '') {
      let data = {
        email: this.emailId,
        password: this.isPassword,
      };
      this._loginServices.userLogin(data).subscribe({
        next: (response: any) => {
          if (response.status) {
            localStorage.setItem('token', response.token);
            this._snackBarServices.openSnackbar(`✅ login Successfull!`);
            void this._router.navigate(['/dashboard'], {
              relativeTo: this._route,
            });
          }
        },
        error: (error: HttpErrorResponse) => {
          this._snackBarServices.openSnackbar(`⚠️ ${error.error.message}`);
        },
      });
    } else {
      this._snackBarServices.openSnackbar(
        `⚠️ Please fill the mandatory fields`
      );
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
