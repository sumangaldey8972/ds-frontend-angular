import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  // Configure snackbar config
  private _config: MatSnackBarConfig = {
    horizontalPosition: 'end',
    verticalPosition: 'top',
    duration: 10000,
  };
  constructor(private _snackbar: MatSnackBar) {}

  public openSnackbar(text: string): void {
    this._snackbar.open(text, 'Okay', this._config);
  }
}
